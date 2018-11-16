import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);

        // ovako setujes request
        // const copiedReq = req.clone({headers: req.headers.set('','')});

        // ovako postavis token na klonirani request i tako ga saljes      
        return this.store.select('auth')
            .take(1)
            .switchMap((authState: fromAuth.State) => {
                const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
                return next.handle(copiedReq);
        });
      
      
      
      
      
      //  return next.handle(copiedReq);

        // ovako vracas originalni request
        // return next.handle(req);
    }
}