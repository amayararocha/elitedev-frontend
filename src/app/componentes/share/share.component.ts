// share.component.ts
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ShareService } from '../../service/share.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  standalone: true,
  imports:[CommonModule]
})
export class ShareComponent implements OnInit {
  shareId: string | null = null;
  favorites: any[] = [];
  shareLink: string = '';

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    // Supondo que você já tenha um ID compartilhado
    this.shareId = 'some-share-id'; // Isso deve vir de alguma lógica do seu app
    this.loadSharedFavorites();
  }

  loadSharedFavorites(): void {
    if (this.shareId) {
      this.shareService.shareFavoritesById(this.shareId).subscribe(data => {
        this.favorites = data;
        this.shareLink = `${window.location.origin}/share/${this.shareId}`;
      });
    }
  }
}
