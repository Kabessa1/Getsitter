import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { interval, map, startWith, Subject, Subscription, switchMap, take, takeUntil, takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
//   const list = [{
// ...user1
//   },
// {
//   ...user2
// }];
  // Method 1 - Menual Subscription and Unsubscribe
  // sub: Subscription;
  // constructor(private http: HttpClient) { 
  //  this.sub = interval(3000).pipe(startWith(0), switchMap(() => this.http.get('/api/users'))).subscribe(val => console.log(val))
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  // Method 2 - Destroy by operators
  kill: Subject<void> = new Subject();
  constructor(private http: HttpClient) { 
   interval(3000).pipe(startWith(0), takeUntil(this.kill), switchMap(() => this.http.get('/api/users'))).subscribe(val => console.log(val))
  }

  ngOnDestroy(): void {
    this.kill.next();
  }


  // Methos 3 - subscribe and unsubscribe by 'async' pipe
  numbers = interval(1000).pipe(map((value) => {
    if (!value) {
      return 'No numbers'
    }
    return `Number is ${value}`;
  }));
}
