import { pool } from '../db/mysql';

interface ContactInput {
  firstname: string;
  lastname?: string;
  email: string;
  message: string;
}

export async function saveContact(contact: ContactInput): Promise<void> {
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
