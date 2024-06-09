import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { itemsReducer } from './app/store/items.reducer';
import { changeStateReducer } from './app/store/change-state.reducer';
import { ItemsEffects } from './app/store/items.effects';
import { ChangeStateEffects } from './app/store/change-state.effects';
import { environment } from './environments/environment';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MainComponent } from './app/main/main.component';

bootstrapApplication(MainComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({ items: itemsReducer, changeState: changeStateReducer }),
    provideEffects([ItemsEffects, ChangeStateEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
}).catch((err) => console.error(err));
