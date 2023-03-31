import { Component, Input} from '@angular/core';
import { ProductModel } from './account-layout.component.product_model';
import {mock_friends_list} from './account-layout.component.mock_friends_list';
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
    for (var product of mock_friends_list) {
      this.products.push(product);
    }

    for (var item of mock_list){
      console.log(item);
      this.cards.push(item);
    }
    //need to be able to determine which user logs in
    //need to be able to update account elements to reflect the currently logged in user
    //need to be able to warn user that they will be logged out if they try to manually go to certain pages

  }
}
