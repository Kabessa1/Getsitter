import { Component, Input  } from '@angular/core';
import { UserProfile } from '../types';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() profile: UserProfile | undefined;
}


  // userCards: UserCardData[] = [{
  //   first: 'Noa',
  //   last: 'Kabessa',
  //   age: 25,
  //   image: 'https://thumbs.dreamstime.com/z/pretty-sexy-young-woman-girl-long-blonde-hair-white-blouse-stars-cute-smiling-face-sunny-summer-day-blonde-137965198.jpg',
  //   about: 'אני נועה ואני לןמדת אנגולר'
  // },
  // {
  //   first: 'Nati',
  //   last: 'Kvyatek',
  //   age: 26,
  //   image: 'data:image/jpeg;base64,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',
  //   about: 'אני נתי ואני מלמד את נועה אנגולר'
