import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNhomlvDto } from './dto/create-nhomlv.dto';
import { UpdateNhomlvDto } from './dto/update-nhomlv.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NhomlvService {

  prisma = new PrismaClient

  // ----- LẤY DANH SÁCH NHÓM NGÀNH HÀNG -----
  async LayDanhSachNhomLV() {
    let content = await this.prisma.nhomNganhHang.findMany({
      include: {
        Lv1: true,
        Lv2: true,
      }
    })

    return { messenge: 'Thành Công', content, date: new Date() }
  }

  // ----- TẠO NHÓM NGÀNH HÀNG -----
  async TaoNhomLV(body: any) {

    let checkNhomLV = await this.prisma.nhomNganhHang.findFirst({
      where: {
        ma_lv3: body.ma_lv3,
      }
    });

    if (checkNhomLV) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: "Nhóm Level 3 đã tồn tại",
      }, HttpStatus.BAD_REQUEST);
    }

    let data = await this.prisma.nhomNganhHang.create({
      data: {
        ma_lv1: body.ma_lv1,
        ma_lv2: body.ma_lv2,
        ma_lv3: body.ma_lv3,
        ten_lv3: body.ten_lv3,
        ngay_tao: body.ngay_tao,
      }
    })

    return { messenge: 'Thành Công', data, date: new Date() }
  }

  // ----- XÓA NHÓM NGÀNH HÀNG -----
  async XoaNhomLV(id: number) {
    let checkNhomLV = await this.prisma.nhomNganhHang.findFirst({
      where: {
        id_nhom: id
      }
    })
    if (!checkNhomLV) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: "Nhóm ngành hàng không tồn tại",
      }, HttpStatus.BAD_REQUEST)
    }

    let removeNhomLV = await this.prisma.nhomNganhHang.update({
      where: {
        id_nhom: id
      },
      data: {
        trang_thai: true,
      }
    })
    return { messenge: 'Xóa thành công', removeNhomLV, date: new Date() }
  }

}





