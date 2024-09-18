import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Lv2Service } from './lv2.service';
import { CreateLv2Dto } from './dto/create-lv2.dto';
import { UpdateLv2Dto } from './dto/update-lv2.dto';

@Controller('api/lv2')
export class Lv2Controller {
  constructor(private readonly lv2Service: Lv2Service) {}

  @Post('TaoLv2')
  TaoLv2(@Body() body: any) {
    return this.lv2Service.TaoLv2(body);
  }

  @Get('LayDanhSachLv2')
  LayDanhSachLv2(@Query('ma_lv1') ma_lv1:string) {
    return this.lv2Service.LayDanhSachLv2(ma_lv1);
  }

}
