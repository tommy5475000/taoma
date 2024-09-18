import { Module } from '@nestjs/common';
import { Lv1Service } from './lv1.service';
import { Lv1Controller } from './lv1.controller';

@Module({
  controllers: [Lv1Controller],
  providers: [Lv1Service],
})
export class Lv1Module {}
