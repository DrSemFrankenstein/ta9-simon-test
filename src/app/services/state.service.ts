import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  changeState(newState: any): Observable<any> {
    return of(newState);
  }
}
