import { CanActivate, 
        Router, 
        ActivatedRouteSnapshot, 
        RouterStateSnapshot 
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authService.isAuth().pipe(map(res => {
            if(res === false) {
                this.router.navigate(['/login']);
            }
            return res;
        }));
    }
}