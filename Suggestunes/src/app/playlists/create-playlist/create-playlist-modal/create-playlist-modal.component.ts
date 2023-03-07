import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-create-playlist-modal',
  templateUrl: './create-playlist-modal.component.html',
  styleUrls: ['./create-playlist-modal.component.css']
})
export class CreatePlaylistModalComponent {
  imageUrl = new FormControl('assets/music note img.png');

  updateImageUrl(event: Event){
    const fileInput = document.getElementById("fileInput");
    // @ts-ignore
    console.log(fileInput.files instanceof FileList); // true even if empty

      // @ts-ignore
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        // @ts-ignore
        reader.onload = e => this.imageUrl.setValue(reader.result.toString());
        // @ts-ignore
      reader.readAsDataURL(event.target.files[0]);
      }


  }
  clear(event:Event){
    this.imageUrl.setValue("assets/music note img.png");
    // @ts-ignore
    document.getElementById("playlist-name").value="";
    // @ts-ignore
    document.getElementById("playlist-description").value="";
  }
}
