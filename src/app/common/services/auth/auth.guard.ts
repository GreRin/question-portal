import { CanActivate, 
        Router, 
        ActivatedRouteSnapshot, 
        RouterStateSnapshot 
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { User } from '../../utils/user';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | boolean {
        return this.authService.isAuth().pipe(map(res => {
            if(res.isUser === false) {
                this.router.navigate(['/login']);
            }
            return res.isUser;
        }));
    }
}