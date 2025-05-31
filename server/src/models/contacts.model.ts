import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../db/mysql';
import { NewContact, Contact } from '../types/contacts';

export async function createContact(data: NewContact): Promise<Contact> {
  const { firstname, lastname, email, message } = data;

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO contacts (firstname, lastname, email, message, created_at, updated_at)
     VALUES (?, ?, ?, ?, NOW(), NOW())`,
    [firstname, lastname, email, message]
  );

  const id = result.insertId;

  const [rows] = await pool.execute<import('mysql2').RowDataPacket[]>(
    `SELECT * FROM contacts WHERE id = ?`,
    [id]
  );

  return (rows as RowDataPacket[])[0] as Contact;
}
