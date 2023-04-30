import { Component, Input} from '@angular/core';
import { ProductModel } from './account-layout.component.product_model';
import { mock_list } from './card/mock_list';
import { CardModel } from './card/card.model';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent {
  products: ProductModel[] = [];
  cards: CardModel [] = [];

  constructor() {
    for (var item of mock_list){
      console.log(item);
      this.cards.push(item);
    }
  }

}
