import type {Song} from './song';
export interface Collection {
  id: number;
  name: string;
  description: string;
  cover_image: string;
  folder_name: string;
  released: string | null; // ISO 8601 string
  created_at: string;
  updated_at: string;
}

export interface CollectionWithSongs extends Collection {
  songs: Song[];
}
