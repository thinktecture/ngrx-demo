import { ROUTES } from '@angular/router';
import routes from './routes';

export const provideTodo = () => [{ provide: ROUTES, useValue: routes, multi: true }];
