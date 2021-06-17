import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';

@NgModule({
  declarations: [FavoriteListComponent],
  imports: [CommonModule],
  exports: [FavoriteListComponent],
})
export class FavoritesModule {}
