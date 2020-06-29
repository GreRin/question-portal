import { CanActivate, 
        Router, 
        ActivatedRouteSnapshot, 
        RouterStateSnapshot 
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(
    private afAuth: AngularFireAuth,
    private router: Router
) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.afAuth.user) {
            return true;
    } else {
        this.router.navigate(['/login'], {
            queryParams: {
                accessDenied: true
            }
        });
        return false;
    }
    }
}