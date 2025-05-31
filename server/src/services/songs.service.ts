import type { Song } from '../types/songs';
import { getSongById } from '../models/songs.model';
import { getCollectionById } from '../models/collections.model';

const AUDIO_BASE_URL = 'https://app.lefog.xyz/audio';

export class SongsService {
  async getById(id: number): Promise<Song | null> {
    const song = await getSongById(id);
    if (!song) return null;

    const collection = await getCollectionById(song.collection_id);
    if (!collection) return null;

    return {
      ...song,
      file_name: `${AUDIO_BASE_URL}/${collection.folder_name}/${song.file_name}`
    };
  }
}
