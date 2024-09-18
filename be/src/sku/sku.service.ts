import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class SkuService {

  prisma = new PrismaClient

  // ----- LẤY DANH MỤC HÀNG HÓA ----- //
  async LayDanhSachSku() {
    let content = await this.prisma.maSku.findMany()

    return { messenge: 'Thành Công', content, date: new Date() }
  }


  // ----- TẠO MÃ SKU ----- //
  async TaoSku(body: any) {
    
    let checkTenHang = await this.prisma.maSku.findFirst({
      where: {
        ten_sp: body.ten_sp,
        ma_ncc: body.ma_ncc,
        gia_ban: body.gia_ban
      }
    });

    if (checkTenHang) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: 'Tên sản phẩm và giá bán của NCC này đã tạo',
      }, HttpStatus.BAD_REQUEST);
    }

    let maSku = `${body.loai_hang}${body.ma_ncc}`;

    let data = await this.prisma.maSku.create({
      data: {
        loai_hang: body.loai_hang,
        ma_ncc: body.ma_ncc,
        stt_mat_hang: body.stt_mat_hang,
        stt_thuoc_tinh: body.stt_thuoc_tinh,
        ma_sku: maSku,
        ten_sp: body.ten_sp,
        tt_mau: body.mau||null,
        tt_size: body.size,
        dvt: body.dvt,
        id_nhom: body.id_nhom,
        stt_barcode: body.stt_barcode,
        checksum: body.checksum,
        gia_ban: body.gia_ban,
        ngay_tao: body.ngay_tao,
        trang_thai: body.trang_thai,
      }
    })
    return { messenge: 'Thành Công', data, date: new Date() }
  }
}
