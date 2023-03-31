import { Component, Input , OnInit} from '@angular/core';
import { AccountInfoComponent } from '../../Layouts/account-layout/account-info/account-info.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  @Input() username: string;
  @Input() bio: string;
  myAccCom = new AccountInfoComponent();

  constructor() {
    this.username = this.myAccCom.username;
    this.bio = this.myAccCom.bio;
  }

  bioChanged(newBio: string): boolean {
    if (this.bio == newBio) {
      alert("Bio has not been changed");
      return false;
    }
    return true;
  }

  
  ngOnInit(): void {
    var submitBio = document.getElementsByClassName("submit-bio")[0];
    var newBio = (document.getElementsByClassName("bioField")[0] as HTMLInputElement);
    var changeBio = false;
    submitBio.addEventListener('click', (e:Event) => {
      changeBio = this.bioChanged(newBio.value);
      if (changeBio) {
        this.bio = newBio.value;
        //change bio in the database
        alert("Changes saved!");
        (document.getElementsByClassName("btn-secondary")[0] as HTMLButtonElement).click();
      }
    });
  }
}
