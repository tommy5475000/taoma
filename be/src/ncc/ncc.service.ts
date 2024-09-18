import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNccDto } from './dto/create-ncc.dto';
import { UpdateNccDto } from './dto/update-ncc.dto';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class NccService {

  prisma = new PrismaClient

  // ----- LẤY DANH SÁCH NHÀ CUNG CẤP ----- //
  async LayDanhSachNCC() {
    let content = await this.prisma.maNcc.findMany()

    return { messenge: 'Thành Công', content, date: new Date() }
  }

  // ----- TẠO NHÀ CUNG CẤP ----- //
  async TaoNCC(body: any) {

    let checkMaNCC = await this.prisma.maNcc.findFirst({
      where: { ma_ncc: body.ma_ncc },
    });

    if (checkMaNCC) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: "Mã nhà cung cấp đã tồn tại",
      }, HttpStatus.BAD_REQUEST);
    }

    let checkTenNCC = await this.prisma.maNcc.findFirst({
      where: { ten_ncc: body.ten_ncc },
    });
    if (checkTenNCC) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: "Tên nhà cung cấp đã tồn tại",

      }, HttpStatus.BAD_REQUEST);
    }

    let checkMST = await this.prisma.maNcc.findFirst({
      where: { mst: body.mst },
    });

    if (checkMST) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: "Mã số thuế đã tồn tại",
      }, HttpStatus.BAD_REQUEST);
    }

    let data = await this.prisma.maNcc.create({
      data: {
        ma_ncc: body.ma_ncc,
        ten_thuong_goi: body.ten_thuong_goi,
        ten_ncc: body.ten_ncc,
        mst: body.mst,
        so_dt: body.so_dt,
        dia_chi: body.dia_chi,
        ngay_tao: body.ngay_tao,
        trang_thai: body.trang_thai,
      }
    })
    return { messenge: 'Thành Công', data, date: new Date() }
  }

  // ----- XÓA NHÀ CUNG CẤP ----- //
  async XoaNCC(id: any) {
    let checkMaNCC = await this.prisma.maNcc.findFirst({
      where: {
        ma_ncc: id,
      }
    })
    if (!checkMaNCC) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: "Nhà cung cấp không tồn tại",
      }, HttpStatus.BAD_REQUEST);
    }

    let removeMaNCC = await this.prisma.maNcc.update({
      where: {
        ma_ncc: id,
      },
      data: {
        trang_thai: true,
      }
    })

    return { messenge: "Xóa thành công", removeMaNCC, date: new Date() }
  }

  // ----- EDIT NHÀ CUNG CẤP ----- //
  async EditNCC(body: any) {
    let checkMaNCC = await this.prisma.maNcc.findFirst({
      where: {
        ma_ncc: body.ma_ncc,
        NOT: {
          ma_ncc: body.ma_ncc,
        }
      }
    })

    if (checkMaNCC) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        messenge: "Mã nhà cung cấp đã tồn tại",
      }, HttpStatus.BAD_REQUEST);
    }

   let editNcc = await this.prisma.maNcc.update({
      where: {
        ma_ncc: body.ma_ncc,
      },
      data: {
   
        ma_ncc: body.ma_ncc,
        ten_thuong_goi: body.ten_thuong_goi,
        ten_ncc: body.ten_ncc,
        mst: body.mst,
        so_dt: body.so_dt,
        dia_chi: body.dia_chi,
        ngay_sua: body.ngay_sua,

      }
    })
    return { messenge: 'Thành Công', editNcc, date: new Date() }
  }
}
