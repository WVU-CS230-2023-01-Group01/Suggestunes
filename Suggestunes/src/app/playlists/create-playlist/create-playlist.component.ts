import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {PlaylistModel} from "../playlist/playlist.model";
@Injectable()
@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent {
  @Output() messageEvent = new EventEmitter<PlaylistModel>();
  sendMessage($event: PlaylistModel){
    this.messageEvent.emit($event);
  }

  //Need to get the current user and push new playlist to user's playlists
}
