import { RowDataPacket } from "mysql2";
import { pool } from "../db/mysql";
import type { Song } from "../types/song.type";

export async function getSongsByCollectionId(
  collectionId: number
): Promise<Song[]> {

  const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT * FROM songs
      WHERE collection_id = ?
      ORDER BY track_number ASC
  `, [collectionId]);
  return rows as Song[];
}

export async function getSongById(id: number): Promise<Song | null> {
  const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT * FROM songs
      WHERE id = ?
  `, [id]);
  return rows.length ? (rows[0] as Song) : null;
}
