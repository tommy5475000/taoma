import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkuService } from './sku.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';

@Controller('api/sku')
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  // ----- LẤY DANH MỤC HÀNG HÓA ----- //
  @Get('LayDanhSachSku')
  LayDanhSachSku() {
    return this.skuService.LayDanhSachSku();
  }

  // ----- TẠO MÃ SKU ----- //
  @Post('TaoSku')
  TaoSku(@Body() body:any){
    return this.skuService.TaoSku(body);
  }
}
