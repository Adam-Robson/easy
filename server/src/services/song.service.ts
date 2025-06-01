import { getSongById } from '../models/song.model';
import { getCollectionById } from '../models/collection.model';
import type { Song } from '../types/song.type';


export class SongService {
  async getById(id: number): Promise<Song | null> {
    const song = await getSongById(id);
    if (!song) return null;

    const collection = await getCollectionById(song.collection_id);
    if (!collection) return null;

    return {
      ...song,
      file_name: `${process.env.BASE_URL}/media/${collection.folder_name}/${song.file_name}`
    };
  }
}
