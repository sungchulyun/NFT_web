/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalAuthGurad extends AuthGuard('local'){}