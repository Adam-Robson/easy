import { getAllCollections, getCollectionById } from '../models/collection.model';
import { getSongsByCollectionId } from '../models/song.model';
import { config } from '../config/config';
import type { Collection, CollectionWithSongs } from '../types/collection.type';


export class CollectionService {
  async getAll(): Promise<Collection[]> {
    const collections = await getAllCollections();
    return collections.map(c => ({
      ...c,
      cover_image: `${process.env.BASE_URL}/${c.cover_image}`
    }));
  }

  async getByIdWithSongs(id: number): Promise<CollectionWithSongs | null> {
    const collection = await getCollectionById(id);
    if (!collection) return null;

    const songs = await getSongsByCollectionId(collection.id);

    return {
      ...collection,
      cover_image: `${config.baseUrl}/${collection.cover_image}`,
      songs: songs.map(song => ({
        ...song,
        file_name: `${config.baseUrl}/${collection.folder_name}/${song.file_name}`
      }))
    };
  }
}
