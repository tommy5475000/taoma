import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLv2Dto } from './dto/create-lv2.dto';
import { UpdateLv2Dto } from './dto/update-lv2.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class Lv2Service {
  prisma = new PrismaClient

  // ----- LẤY DANH SÁCH LEVEL 2 -----
  async LayDanhSachLv2(ma_lv1: string) {
    let content = await this.prisma.lv2.findMany({
      where: {
        ma_lv1: ma_lv1,
      }
    })

    return { messenge: 'Thành Công', content, date: new Date() }
  }

  // ----- TẠO LEVEL 2 -----
  async TaoLv2(body: any) {
    let checkLv2 = await this.prisma.lv2.findFirst({
      where: {
        ma_lv2: body.ma_lv2,
      }
    });

    if (checkLv2) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: "Mã Level 2 đã tồn tại",
      }, HttpStatus.BAD_REQUEST);
    }

    let data = await this.prisma.lv2.create({
      data: {
        ma_lv1: body.ma_lv1,
        ma_lv2: body.ma_lv2,
        ten_lv2: body.ten_lv2,
        ngay_tao: body.ngay_tao,
      }
    })
    return { messenge: 'Thành Công', data, date: new Date() }
  }


}
