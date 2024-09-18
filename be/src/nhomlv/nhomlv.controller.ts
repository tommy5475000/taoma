import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NhomlvService } from './nhomlv.service';
import { CreateNhomlvDto } from './dto/create-nhomlv.dto';
import { UpdateNhomlvDto } from './dto/update-nhomlv.dto';

@Controller('api/nhomlv')
export class NhomlvController {
  constructor(private readonly nhomlvService: NhomlvService) { }

  // ----- LẤY DANH SÁCH NHÓM NGÀNH HÀNG -----
  @Get('LayDanhSachNhomLV')
  LayDanhSachNhomLV() {
    return this.nhomlvService.LayDanhSachNhomLV();
  }

  // ----- TẠO NHÓM NGÀNH HÀNH -----
  @Post('TaoNhomLV')
  TaoNhomLV(@Body() body: any) {
    return this.nhomlvService.TaoNhomLV(body);
  }

  // ----- XÓA NHÓM NGÀNH HÀNH -----
  @Delete('XoaNhomLV')
  XoaNhomLV(@Query('id') id:string) {
    return this.nhomlvService.XoaNhomLV(+id);
  }
}
