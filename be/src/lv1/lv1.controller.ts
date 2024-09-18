import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Lv1Service } from './lv1.service';

@Controller('api/lv1')
export class Lv1Controller {
  constructor(private readonly lv1Service: Lv1Service) {}

  // ----- TẠO LEVEL 1 -----
  @Post('TaoLv1')
  taoLv1(@Body() body:any) {
    return this.lv1Service.TaoLv1(body);
  }

  // ----- LÁY DANH SÁCH LEVEL 1 -----
  @Get('LayDanhSachLv1')
  LayDanhSachLv1() {
    return this.lv1Service.LayDanhSachLv1();
  }

}
