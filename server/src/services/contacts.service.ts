import { pool } from '../db/mysql';
import type { Contact, NewContact } from '../types/contacts';
import { createContact } from '../models/contacts.model';
import { EmailService } from '../services/email.service';

export async function saveContact(contact: NewContact): Promise<void> {
  const sql = `
    INSERT INTO contacts (firstname, lastname, email, message)
    VALUES (?, ?, ?, ?)
  `;
  const values = [
    contact.firstname,
    contact.lastname || null,
    contact.email,
    contact.message,
  ];

  const conn = await pool.getConnection();
  try {
    await conn.execute(sql, values);
  } finally {
    conn.release();
  }
}


const ADMIN_EMAIL = process.env.CONTACT_ADMIN_EMAIL || 'admin@lefog.xyz';

export class ContactsService {
  private emailService = new EmailService();

  async create(data: NewContact): Promise<Contact> {
    const contact = await createContact(data);

    // Email to user
    await this.emailService.sendMail(
      contact.email,
      'Thanks for contacting Lefog',
      `<p>Hi ${contact.firstname},<br/>Thanks for reaching out. We'll get back to you soon!</p>`
    );

    // Email to admin
    await this.emailService.sendMail(
      ADMIN_EMAIL,
      'New contact form submission',
      `<p>New contact from ${contact.firstname} ${contact.lastname} (${contact.email})</p><p>Message: ${contact.message}</p>`
    );

    return contact;
  }
}
