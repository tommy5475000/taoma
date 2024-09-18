import { Module } from '@nestjs/common';
import { Lv2Service } from './lv2.service';
import { Lv2Controller } from './lv2.controller';

@Module({
  controllers: [Lv2Controller],
  providers: [Lv2Service],
})
export class Lv2Module {}
