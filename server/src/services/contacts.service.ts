import { Contact, NewContact } from '../types/contacts';
import { createContact } from '../models/contacts.model';
import { EmailService } from './email.service';

const ADMIN_EMAIL = process.env.CONTACT_ADMIN_EMAIL || 'admin@lefog.xyz';

export class ContactsService {
  private emailService = new EmailService();

  async create(data: NewContact): Promise<Contact> {
    const contact = await createContact(data);

    await this.sendUserConfirmation(contact);
    await this.sendAdminNotification(contact);

    return contact;
  }

  private async sendUserConfirmation(contact: Contact): Promise<void> {
    const html = `
      <div style="font-family:sans-serif;padding:20px;">
        <h2 style="color:#333;">Hi ${contact.firstname},</h2>
        <p>Thanks for reaching out to <strong>lefog.xyz</strong>. We’ve received your message:</p>
        <blockquote style="border-left:4px solid #ccc;padding-left:10px;color:#555;">
          ${contact.message}
        </blockquote>
        <p>We’ll be in touch soon.</p>
        <br/>
        <p style="color:#888;">– The Lefog Team</p>
      </div>
    `;

    await this.emailService.sendMail(
      contact.email,
      `Thanks for contacting Lefog. We'll respond soon. Message: ${contact.message}`,
      html
    );
  }

  private async sendAdminNotification(contact: Contact): Promise<void> {
    const html = `
      <div style="font-family:sans-serif;padding:20px;">
        <h2>New Contact Submission</h2>
        <ul style="list-style:none;padding:0;">
          <li><strong>Name:</strong> ${contact.firstname} ${contact.lastname}</li>
          <li><strong>Email:</strong> ${contact.email}</li>
          <li><strong>Submitted at:</strong> ${new Date(contact.created_at).toLocaleString()}</li>
        </ul>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:4px solid #ccc;padding-left:10px;color:#555;">
          ${contact.message}
        </blockquote>
      </div>
    `;

    await this.emailService.sendMail(
      ADMIN_EMAIL,
      `New contact from ${contact.firstname} ${contact.lastname}: ${contact.message}`,
      html
    );
  }
}
