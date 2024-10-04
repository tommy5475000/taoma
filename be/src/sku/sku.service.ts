import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class SkuService {

  prisma = new PrismaClient

  // ----- LẤY DANH MỤC HÀNG HÓA ----- //
  async LayDanhSachSku() {
    let content = await this.prisma.maSku.findMany({
      orderBy: {
        stt_mat_hang: "desc",
      },
      include: {
        MaNcc: {
          select: {
            ten_thuong_goi: true
          }
        }
      }
    })
    // Gộp tên thường gọi từ nhà cung cấp vào mỗi đối tượng SKU
    content = content.map(sku => ({
      ...sku,
      ten_thuong_goi: sku.MaNcc?.ten_thuong_goi || 'N/A' // Gán tên thường gọi
    }));

    return { messenge: 'Thành Công', content, date: new Date() }
  }


  // ----- TẠO MÃ SKU ----- //
  async TaoSku(body: any) {
    // Kiểm tra nếu không có biến thể (productVariants rỗng)
    if (!body.productVariants || body.productVariants.length === 0) {
      // Kiểm tra xem tên sản phẩm, mã nhà cung cấp, và giá bán đã tồn tại hay chưa
      let checkTenHang = await this.prisma.maSku.findFirst({
        where: {
          ten_sp: body.ten_sp,
          ma_ncc: body.ma_ncc,
          gia_ban: body.gia_ban,
        },
      });

      if (checkTenHang) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          messenge: 'Tên sản phẩm và giá bán của NCC này đã tạo',
        }, HttpStatus.BAD_REQUEST);
      }

      // Lấy stt_mat_hang lớn nhất từ bảng maSku
      let sttMatHang = await this.prisma.maSku.findFirst({
        orderBy: {
          stt_mat_hang: 'desc' // Sắp xếp giảm dần để lấy cái lớn nhất
        },
        select: {
          stt_mat_hang: true
        }
      });

      // Kiểm tra nếu có giá trị lớn nhất, nếu không thì bắt đầu từ 1
      let nextNumberSku = sttMatHang && sttMatHang.stt_mat_hang
        ? parseInt(sttMatHang.stt_mat_hang.slice(-5)) + 1
        : 1;

      // Định dạng số thứ tự thành 5 chữ số (ví dụ: 00001, 00002, ...)
      let sttSku = nextNumberSku.toString().padStart(5, '0');

      // Tạo mã SKU cho trường hợp không có biến thể
      let maSku = `${body.loai_hang}${body.ma_ncc}${sttSku}${"00"}`;

      let nhomHang = await this.prisma.nhomNganhHang.findFirst({
        where: {
          id_nhom: body.id_nhom,
        },
        select: {
          ma_lv1: true,  // Chọn lv1
          ma_lv3: true,  // Chọn lv3
        }
      });
      let maLv1 = nhomHang?.ma_lv1 || null

      let maLv3 = nhomHang?.ma_lv3 || null

      let sttBarcode = await this.prisma.maSku.findFirst({
        orderBy: {
          stt_barcode: 'desc'
        },
        select: {
          stt_barcode: true
        }
      })
      let nextNumberBarcode = sttBarcode && sttBarcode.stt_barcode
        ? parseInt(sttBarcode.stt_barcode.slice(-6)) + 1
        : 1;
      let sttBarCode = nextNumberBarcode.toString().padStart(6, '0');

      let maBarCode = `${maLv1}${maLv3}${sttBarCode}`

      // Tính toán checksum
      const oddDigits = maBarCode
        .split('')
        .filter((_, index) => index % 2 === 0) // Chọn các chữ số ở vị trí lẻ
        .map(Number);

      const evenDigits = maBarCode
        .split('')
        .filter((_, index) => index % 2 !== 0) // Chọn các chữ số ở vị trí chẵn
        .map(Number);

      // Tính tổng các chữ số lẻ và chẵn
      const evenSum = evenDigits.reduce((sum, digit) => sum + digit * 3, 0);
      const oddSum = oddDigits.reduce((sum, digit) => sum + digit, 0);
      const totalSum = oddSum + evenSum;

      // Tính phần dư và checksum
      const remainder = totalSum % 10;
      const checkSumNumber = remainder === 0 ? 0 : 10 - remainder;

      let barCode = `${maLv1}${maLv3}${sttBarCode}${checkSumNumber}`

      // Giá bán đã có Vat
      const giaBan = body.gia_ban.replace(/\./g, "");
      const giaVat = (giaBan / (1 + (body.loai_thue / 100))).toFixed(2);
      const formatGiaVat = new Intl.NumberFormat().format(parseFloat(giaVat))

      // Tạo một SKU duy nhất cho sản phẩm
      let data = await this.prisma.maSku.create({
        data: {
          loai_hang: body.loai_hang,
          ma_ncc: body.ma_ncc,
          stt_mat_hang: sttSku,
          stt_thuoc_tinh: body.stt_thuoc_tinh,
          ma_sku: maSku,
          barcode: barCode,
          ten_sp: body.ten_sp,
          ten_sp_tt: body.ten_sp,
          tt_mau: body.mau || null,
          tt_size: body.size,
          dvt: body.dvt,
          id_nhom: body.id_nhom,
          stt_barcode: sttBarCode,
          gia_ban: body.gia_ban,
          thue_suat: body.loai_thue,
          gia_ban_truoc_vat: formatGiaVat,
          check_sum: body.checksum,
          ngay_tao: body.ngay_tao,
          trang_thai: body.trang_thai,
        }
      });
      return { messenge: 'Thành Công', data, date: new Date() };
    } else {
      // Có biến thể
      let results = [];

      // Lấy stt_mat_hang lớn nhất trước khi bắt đầu xử lý các biến thể
      let sttMatHang = await this.prisma.maSku.findFirst({
        orderBy: {
          stt_mat_hang: 'desc',
        },
        select: {
          stt_mat_hang: true,
        },
      });


      // Kiểm tra nếu có giá trị lớn nhất, nếu không thì bắt đầu từ 1
      let nextNumberSku = sttMatHang && sttMatHang.stt_mat_hang
        ? parseInt(sttMatHang.stt_mat_hang.slice(-5)) + 1
        : 1;
      let nextNumberTT = 1

      // Định dạng stt_mat_hang thành 5 chữ số
      let sttSku = nextNumberSku.toString().padStart(5, '0');

      // Lặp qua từng biến thể và tạo mã SKU cho mỗi biến thể
      for (const variant of body.productVariants) {
        // Kiểm tra biến thể đã tồn tại hay chưa
        let checkVariant = await this.prisma.maSku.findFirst({
          where: {
            ten_sp: variant.ten_sp,
            ma_ncc: body.ma_ncc,
            gia_ban: variant.gia_ban,
            tt_size: variant.size,
            tt_mau: variant.mau,
          },
        });

        if (checkVariant) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: `Sản phẩm ${variant.ten_sp} với size ${variant.size} và màu ${variant.mau} đã tồn tại`,
          }, HttpStatus.BAD_REQUEST);
        }

        // Tăng stt_thuoc_tinh cho từng biến thể
        let sttSkuTT = nextNumberTT.toString().padStart(2, '0');
        nextNumberTT++;

        // Tạo mã SKU cho biến thể
        let maSku = `${body.loai_hang}${body.ma_ncc}${sttSku}${sttSkuTT} `;

        let nhomHang = await this.prisma.nhomNganhHang.findFirst({
          where: {
            id_nhom: body.id_nhom,
          },
          select: {
            ma_lv1: true,  // Chọn lv1
            ma_lv3: true,  // Chọn lv3
          }
        });
        let maLv1 = nhomHang?.ma_lv1 || null

        let maLv3 = nhomHang?.ma_lv3 || null

        let sttBarcode = await this.prisma.maSku.findFirst({
          orderBy: {
            stt_barcode: 'desc'
          },
          select: {
            stt_barcode: true
          }
        })
        let nextNumberBarcode = sttBarcode && sttBarcode.stt_barcode
          ? parseInt(sttBarcode.stt_barcode.slice(-6)) + 1
          : 1;
        let sttBarCode = nextNumberBarcode.toString().padStart(6, '0');

        let maBarCode = `${maLv1}${maLv3}${sttBarCode}`

        // Tính toán checksum
        const oddDigits = maBarCode
          .split('')
          .filter((_, index) => index % 2 === 0) // Chọn các chữ số ở vị trí lẻ
          .map(Number);

        const evenDigits = maBarCode
          .split('')
          .filter((_, index) => index % 2 !== 0) // Chọn các chữ số ở vị trí chẵn
          .map(Number);

        // Tính tổng các chữ số lẻ và chẵn
        const evenSum = evenDigits.reduce((sum, digit) => sum + digit * 3, 0);
        const oddSum = oddDigits.reduce((sum, digit) => sum + digit, 0);
        const totalSum = oddSum + evenSum;

        // Tính phần dư và checksum
        const remainder = totalSum % 10;
        const checkSumNumber = remainder === 0 ? 0 : 10 - remainder;

        let barCode = `${maLv1}${maLv3}${sttBarCode}${checkSumNumber}`


        // Giá bán đã có Vat
        const giaBan = variant.gia_ban.replace(/\./g, "");
        const giaVat = (giaBan / (1 + (body.loai_thue / 100))).toFixed(2);
        const formatGiaVat = new Intl.NumberFormat().format(parseFloat(giaVat))
        const formatGiaBan = new Intl.NumberFormat().format(parseFloat(giaBan))

        let fullName = variant.ten_sp;

        if (variant.size) {
          fullName += ` - ${variant.size}`;
        }

        if (variant.mau) {
          fullName += ` - ${variant.mau}`;
        }
        // Tạo biến thể trong cơ sở dữ liệu
        let dataVariant = await this.prisma.maSku.create({
          data: {
            loai_hang: body.loai_hang,
            ma_ncc: body.ma_ncc,
            stt_mat_hang: sttSku,
            stt_thuoc_tinh: sttSkuTT,
            ma_sku: maSku,
            ten_sp: variant.ten_sp,
            ten_sp_tt: fullName,
            tt_mau: variant.mau || null,
            tt_size: variant.size,
            dvt: body.dvt,
            id_nhom: body.id_nhom,
            stt_barcode: sttBarCode,
            barcode: barCode,
            check_sum: body.checksum,
            gia_ban: formatGiaBan,
            thue_suat: body.loai_thue,
            gia_ban_truoc_vat: formatGiaVat,
            ngay_tao: body.ngay_tao,
            trang_thai: body.trang_thai,
          },
        });

        results.push(dataVariant);
      }
      return { message: 'Thành Công', data: results, date: new Date() };
    }
  }

}
