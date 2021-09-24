import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FavoriteCountComponent } from './favorite-count/favorite-count.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';

@NgModule({
  declarations: [FavoriteListComponent, FavoriteCountComponent],
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule],
  exports: [FavoriteListComponent, FavoriteCountComponent],
})
export class FavoritesModule {}
