/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext): any {
        return super.canActivate(context);
        
    }
}