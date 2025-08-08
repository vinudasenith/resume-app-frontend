import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})

export class JwtService {
    decode<T>(token: string): T {
        return jwtDecode<T>(token);
    }
}
