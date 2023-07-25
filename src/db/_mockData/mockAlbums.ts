import { Album } from '../types/Album';

export const mockAlbums: Album[] = [
  {
    id: 'b73c84a2-0542-4064-a8f8-7e7f66f27d01',
    name: 'Album #1',
    year: 2020,
    artistId: '486f0707-15db-4352-ae34-04342f91f353',
  },
  {
    id: '2d39c63f-4337-4aa5-91c6-0676a91195c8',
    name: 'Album #2',
    year: 2019,
    artistId: '22170e82-ceba-4f2f-acf9-ecba071985c7',
  },
  {
    id: '2d39c63f-4337-4aa5-91c6-0676a91195c8',
    name: 'Unknown Album',
    year: 2023,
    artistId: null,
  },
];
