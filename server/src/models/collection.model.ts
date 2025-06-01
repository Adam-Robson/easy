import { RowDataPacket } from "mysql2";
import { pool } from "../db/mysql";
import type { Collection, CollectionWithSongs } from "../types/collection.type";
import type { Song } from "../types/song.type";

export async function getAllCollections(): Promise<Collection[]> {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT * FROM collections ORDER BY released DESC`
  );
  return rows as Collection[];
}

export async function getCollectionById(id: number): Promise<Collection | null> {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT * FROM collections WHERE id = ?`,
    [id]
  );
  return rows.length ? (rows[0] as Collection) : null;
}

export async function getCollectionWithSongs(id: number): Promise<CollectionWithSongs | null> {
  const collection = await getCollectionById(id);
  if (!collection) return null;

  const [songs] = await pool.execute<RowDataPacket[]>(
    `SELECT * FROM songs WHERE collection_id = ? ORDER BY track_number ASC`,
    [id]
  );

  return {
    ...collection,
    songs: songs as Song[],
  };
}
