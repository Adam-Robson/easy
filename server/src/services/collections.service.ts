// src/services/collections.service.ts
import { Collection, CollectionWithSongs } from '../types/collections';
import { getAllCollections, getCollectionById } from '../models/collections.model';
import { getSongsByCollectionId } from '../models/songs.model';


export class CollectionsService {
  async getAll(): Promise<Collection[]> {
    const collections = await getAllCollections();
    return collections.map(c => ({
      ...c,
      cover_image: `${process.env.COVER_BASE_URL}/${c.cover_image}`
    }));
  }

  async getByIdWithSongs(id: number): Promise<CollectionWithSongs | null> {
    const collection = await getCollectionById(id);
    if (!collection) return null;

    const songs = await getSongsByCollectionId(collection.id);

    return {
      ...collection,
      cover_image: `${process.env.COVER_BASE_URL}/${collection.cover_image}`,
      songs: songs.map(song => ({
        ...song,
        file_name: `${process.env.AUDIO_BASE_URL}/${collection.folder_name}/${song.file_name}`
      }))
    };
  }
}
