import { createContact } from '../models/contact.model';
import { EmailService } from './email.service';
import { config } from '../config/config';
import type { Contact, NewContact } from '../types/contact.type';


export class ContactService {
  private emailService = new EmailService();

  async create(data: NewContact): Promise<Contact> {
    const contact = await createContact(data);

    await this.sendUserConfirmation(contact);
    await this.sendAdminNotification(contact);

    return contact;
  }

  private async sendUserConfirmation(contact: Contact): Promise<void> {
    const html = `
      <div style="font-family:sans-serif;padding:1.4rem;">
        <h2 style="color:#333;">Hi ${contact.firstname},</h2>
        <p>Thanks for reaching out to le fog! Message received:</p>
        <blockquote style="border-left:4px solid #ccc;padding-left:10px;color:#555;">
          ${contact.message}
        </blockquote>
        <p>talk soon!</p>
        <br/>
        <p style="color:#888;">– lefog</p>
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
      config.contactAdminEmail,
      `New contact from ${contact.firstname} ${contact.lastname}: ${contact.message}`,
      html
    );
  }
}
