import { Component } from '@angular/core';
import { mock_list } from './card/mock_list';
import { CardModel } from './card/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Suggestunes';
  cards: CardModel [] = [];
  constructor(){
    for (var item of mock_list){
      console.log(item);
      this.cards.push(item);
    }
  }
}
