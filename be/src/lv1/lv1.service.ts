import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class Lv1Service {

  prisma = new PrismaClient

  // ----- TẠO LEVEL 1 -----
  async TaoLv1(body: any) {
    let checklv1 = await this.prisma.lv1.findFirst({
      where: {
        ma_lv1: body.ma_lv1
      },
    })

    if (checklv1) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: 'Mã Level 1 đã tồn tại',
      }, HttpStatus.BAD_REQUEST
      );
    }

    let data = await this.prisma.lv1.create({
      data: {
        ma_lv1: body.ma_lv1,
        ten_lv1: body.ten_lv1,
        ngay_tao:body.ngay_tao,
      }
    })

    return {messenge: 'Thành Công', data, date: new Date()}
  }

  // ----- LẤY DANH SÁCH LEVEL 1 -----
  async LayDanhSachLv1() {
    let content = await this.prisma.lv1.findMany()
    return { messenge :'Thành Công', content, date: new Date()};
  }

}
