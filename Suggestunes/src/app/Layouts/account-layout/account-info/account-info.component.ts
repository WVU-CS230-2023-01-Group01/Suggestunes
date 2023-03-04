import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent {
  @Input() username: string;
  @Input() favGenres: string[];
  @Input() bio: string;
  public genres: string[];

  constructor() {
    this.genres = [];
    this.genres.push("Rock");
    this.genres.push(" Hip-Hop");
    this.genres.push(" Alternative Rock");
    this.username = "GenericUser0001";
    this.favGenres = this.genres;
    this.bio = "No bio";
  }
}
