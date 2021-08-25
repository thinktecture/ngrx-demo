export interface Audio {
  id: string;

  title: string;
  writer: string;

  album?: {
    title: string;
    trackNo: number;
  };

  isFavorite: boolean;
}
