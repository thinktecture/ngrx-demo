import { Action } from '@ngrx/store';

export interface FavoriteItem {
  id: string;

  caption: string;
  subCaption?: string;

  toggleAction: Action;
}
