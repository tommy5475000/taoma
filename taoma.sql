/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Lv1` (
  `ma_lv1` varchar(10) NOT NULL,
  `ten_lv1` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `ngay_sua` datetime DEFAULT NULL,
  `trang_thai` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ma_lv1`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Lv1_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `TaiKhoan` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Lv2` (
  `ma_lv2` varchar(10) NOT NULL,
  `ten_lv2` varchar(255) DEFAULT NULL,
  `ma_lv1` varchar(10) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `ngay_sua` datetime DEFAULT NULL,
  `trang_thai` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ma_lv2`),
  KEY `user_id` (`user_id`),
  KEY `ma_lv1` (`ma_lv1`),
  CONSTRAINT `Lv2_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `TaiKhoan` (`user_id`),
  CONSTRAINT `Lv2_ibfk_2` FOREIGN KEY (`ma_lv1`) REFERENCES `Lv1` (`ma_lv1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `MaNcc` (
  `ma_ncc` varchar(20) NOT NULL,
  `ten_thuong_goi` varchar(255) DEFAULT NULL,
  `ten_ncc` varchar(255) DEFAULT NULL,
  `mst` varchar(10) DEFAULT NULL,
  `so_dt` varchar(10) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `ngay_sua` datetime DEFAULT NULL,
  `trang_thai` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ma_ncc`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `MaNcc_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `TaiKhoan` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `MaSku` (
  `id_sku` int NOT NULL AUTO_INCREMENT,
  `loai_hang` varchar(20) DEFAULT NULL,
  `ma_ncc` varchar(20) DEFAULT NULL,
  `stt_mat_hang` varchar(5) DEFAULT NULL,
  `stt_thuoc_tinh` varchar(2) DEFAULT NULL,
  `ma_sku` varchar(12) DEFAULT NULL,
  `ten_sp` varchar(255) DEFAULT NULL,
  `ten_sp_tt` varchar(255) DEFAULT NULL,
  `tt_mau` varchar(255) DEFAULT NULL,
  `tt_size` varchar(255) DEFAULT NULL,
  `dvt` varchar(255) DEFAULT NULL,
  `id_nhom` int DEFAULT NULL,
  `stt_barcode` varchar(6) DEFAULT NULL,
  `barcode` varchar(13) DEFAULT NULL,
  `check_sum` varchar(2) DEFAULT NULL,
  `gia_ban` varchar(255) DEFAULT NULL,
  `thue_suat` int DEFAULT NULL,
  `gia_ban_truoc_vat` varchar(255) DEFAULT NULL,
  `gia_von` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `ngay_sua` datetime DEFAULT NULL,
  `trang_thai` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_sku`),
  KEY `ma_ncc` (`ma_ncc`),
  KEY `user_id` (`user_id`),
  KEY `id_nhom` (`id_nhom`),
  CONSTRAINT `MaSku_ibfk_1` FOREIGN KEY (`ma_ncc`) REFERENCES `MaNcc` (`ma_ncc`),
  CONSTRAINT `MaSku_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `TaiKhoan` (`user_id`),
  CONSTRAINT `MaSku_ibfk_3` FOREIGN KEY (`id_nhom`) REFERENCES `NhomNganhHang` (`id_nhom`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NhomNganhHang` (
  `id_nhom` int NOT NULL AUTO_INCREMENT,
  `ma_lv1` varchar(10) DEFAULT NULL,
  `ma_lv2` varchar(10) DEFAULT NULL,
  `ma_lv3` varchar(10) DEFAULT NULL,
  `ten_lv3` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `ngay_sua` datetime DEFAULT NULL,
  `trang_thai` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_nhom`),
  KEY `ma_lv1` (`ma_lv1`),
  KEY `ma_lv2` (`ma_lv2`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `NhomNganhHang_ibfk_1` FOREIGN KEY (`ma_lv1`) REFERENCES `Lv1` (`ma_lv1`),
  CONSTRAINT `NhomNganhHang_ibfk_2` FOREIGN KEY (`ma_lv2`) REFERENCES `Lv2` (`ma_lv2`),
  CONSTRAINT `NhomNganhHang_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `TaiKhoan` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `TaiKhoan` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) DEFAULT NULL,
  `ten_dang_nhap` varchar(20) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `vai_tro` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ngay_sinh` varchar(255) DEFAULT NULL,
  `so_dt` varchar(10) DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `ngay_sua` datetime DEFAULT NULL,
  `trang_thai` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Lv1` (`ma_lv1`, `ten_lv1`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('0', '--- Chọn Level 1 ---', NULL, NULL, NULL, 0);
INSERT INTO `Lv1` (`ma_lv1`, `ten_lv1`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('200', 'Thời Trang', NULL, '2024-07-18 01:30:01', NULL, 0);
INSERT INTO `Lv1` (`ma_lv1`, `ten_lv1`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('201', 'Valy Túi Xách', NULL, '2024-07-18 01:30:41', NULL, 0);
INSERT INTO `Lv1` (`ma_lv1`, `ten_lv1`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('202', 'Lưu Niệm', NULL, '2024-07-18 01:30:56', NULL, 0);

INSERT INTO `Lv2` (`ma_lv2`, `ten_lv2`, `ma_lv1`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('100', 'Thời Trang Nam', '200', NULL, '2024-07-18 01:31:17', NULL, 0);
INSERT INTO `Lv2` (`ma_lv2`, `ten_lv2`, `ma_lv1`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('101', 'Thời Trang Nữ', '200', NULL, '2024-07-18 01:31:30', NULL, 0);
INSERT INTO `Lv2` (`ma_lv2`, `ten_lv2`, `ma_lv1`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('102', 'Thời Trang Bé Trai', '200', NULL, '2024-07-18 01:31:47', NULL, 0);
INSERT INTO `Lv2` (`ma_lv2`, `ten_lv2`, `ma_lv1`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('105', 'Valy', '201', NULL, '2024-07-18 01:44:44', NULL, 0),
('106', 'Túi Xách', '201', NULL, '2024-07-18 01:44:53', NULL, 0);

INSERT INTO `MaNcc` (`ma_ncc`, `ten_thuong_goi`, `ten_ncc`, `mst`, `so_dt`, `dia_chi`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
(' ', '--- CHỌN MÃ NHÀ CUNG CÂP ---', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `MaNcc` (`ma_ncc`, `ten_thuong_goi`, `ten_ncc`, `mst`, `so_dt`, `dia_chi`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('AH01', 'Anh Hào', 'Công Ty Tnhh Anh Hào', '0104359717', '0903158168', '2-4 Lưu Văn Lang', NULL, '2024-08-26 04:35:42', NULL, 0);
INSERT INTO `MaNcc` (`ma_ncc`, `ten_thuong_goi`, `ten_ncc`, `mst`, `so_dt`, `dia_chi`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('AH02', 'An Hải', 'Công Ty Tnhh An Hải', '0318292315', '0903030303', '2-4 Lưu Văn Lang', NULL, '2024-08-26 04:42:12', NULL, 0);
INSERT INTO `MaNcc` (`ma_ncc`, `ten_thuong_goi`, `ten_ncc`, `mst`, `so_dt`, `dia_chi`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
('AH03', 'Anh Hùng', 'Công Ty Anh Hùng', '0301164065', '0903158169', 'Chợ Bến Thành', NULL, '2024-08-26 06:22:51', '2024-08-26 06:26:03', 0);

INSERT INTO `MaSku` (`id_sku`, `loai_hang`, `ma_ncc`, `stt_mat_hang`, `stt_thuoc_tinh`, `ma_sku`, `ten_sp`, `ten_sp_tt`, `tt_mau`, `tt_size`, `dvt`, `id_nhom`, `stt_barcode`, `barcode`, `check_sum`, `gia_ban`, `thue_suat`, `gia_ban_truoc_vat`, `gia_von`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
(1, 'T', 'AH03', '00001', NULL, 'TAH030000100', 'Áo Dài', NULL, NULL, '', 'Cái', 3, '000001', '2000020000019', NULL, '400000', 8, '370370.37', NULL, NULL, '2024-09-27 07:28:06', NULL, 0);
INSERT INTO `MaSku` (`id_sku`, `loai_hang`, `ma_ncc`, `stt_mat_hang`, `stt_thuoc_tinh`, `ma_sku`, `ten_sp`, `ten_sp_tt`, `tt_mau`, `tt_size`, `dvt`, `id_nhom`, `stt_barcode`, `barcode`, `check_sum`, `gia_ban`, `thue_suat`, `gia_ban_truoc_vat`, `gia_von`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
(2, 'T', 'AH03', '00002', '01', 'TAH030000201', 'áo dài', NULL, NULL, 'x', 'Bộ', 3, '000002', '2000020000026', NULL, '1', NULL, NULL, NULL, NULL, '2024-09-30 03:44:34', NULL, 0);
INSERT INTO `MaSku` (`id_sku`, `loai_hang`, `ma_ncc`, `stt_mat_hang`, `stt_thuoc_tinh`, `ma_sku`, `ten_sp`, `ten_sp_tt`, `tt_mau`, `tt_size`, `dvt`, `id_nhom`, `stt_barcode`, `barcode`, `check_sum`, `gia_ban`, `thue_suat`, `gia_ban_truoc_vat`, `gia_von`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
(3, 'T', 'AH03', '00002', '02', 'TAH030000202', 'áo dài', NULL, NULL, 'm', 'Bộ', 3, '000003', '2000020000033', NULL, '2', NULL, NULL, NULL, NULL, '2024-09-30 03:44:34', NULL, 0);
INSERT INTO `MaSku` (`id_sku`, `loai_hang`, `ma_ncc`, `stt_mat_hang`, `stt_thuoc_tinh`, `ma_sku`, `ten_sp`, `ten_sp_tt`, `tt_mau`, `tt_size`, `dvt`, `id_nhom`, `stt_barcode`, `barcode`, `check_sum`, `gia_ban`, `thue_suat`, `gia_ban_truoc_vat`, `gia_von`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
(4, 'T', 'AH03', '00002', '03', 'TAH030000203', 'áo dài', NULL, NULL, 'l', 'Bộ', 3, '000004', '2000020000040', NULL, '3', NULL, NULL, NULL, NULL, '2024-09-30 03:44:34', NULL, 0),
(5, 'T', 'AH03', '00002', '04', 'TAH030000204', 'áo dài', NULL, NULL, 'xl', 'Bộ', 3, '000005', '2000020000057', NULL, '4', NULL, NULL, NULL, NULL, '2024-09-30 03:44:34', NULL, 0),
(6, 'T', 'AH03', '00002', '05', 'TAH030000205', 'áo dài', NULL, NULL, '2xl', 'Bộ', 3, '000006', '2000020000064', NULL, '5', NULL, NULL, NULL, NULL, '2024-09-30 03:44:34', NULL, 0),
(7, 'T', 'AH03', '00003', NULL, 'TAH030000300', 'Quần Dài', NULL, NULL, '', 'Cái', 2, '000007', '2000010000074', NULL, '0', 5, '0.00', NULL, NULL, '2024-09-30 03:52:05', NULL, 0),
(8, 'T', 'AH02', '00004', '01', 'TAH020000401', 'áo dài gấm rồng', NULL, NULL, 'x', ' Cái', 3, '000008', '2000020000088', NULL, '', NULL, NULL, NULL, NULL, '2024-09-30 03:57:25', NULL, 0),
(9, 'T', 'AH02', '00004', '02', 'TAH020000402', 'áo dài gấm rồng', NULL, NULL, 'm', ' Cái', 3, '000009', '2000020000095', NULL, '', NULL, NULL, NULL, NULL, '2024-09-30 03:57:25', NULL, 0),
(10, 'T', 'AH02', '00004', '03', 'TAH020000403', 'áo dài gấm rồng', NULL, NULL, 'l', ' Cái', 3, '000010', '2000020000101', NULL, '', NULL, NULL, NULL, NULL, '2024-09-30 03:57:25', NULL, 0),
(11, 'K', 'AH03', '00005', '01', 'KAH030000501', 'túi xách', NULL, NULL, 'x', 'Bộ', 3, '000011', '2000020000118', NULL, '', NULL, NULL, NULL, NULL, '2024-09-30 03:58:09', NULL, 0),
(12, 'K', 'AH03', '00005', '02', 'KAH030000502', 'túi xách', NULL, NULL, 'm', 'Bộ', 3, '000012', '2000020000125', NULL, '', NULL, NULL, NULL, NULL, '2024-09-30 03:58:09', NULL, 0),
(13, 'K', 'AH03', '00005', '03', 'KAH030000503', 'túi xách', NULL, NULL, 'l', 'Bộ', 3, '000013', '2000020000132', NULL, '', NULL, NULL, NULL, NULL, '2024-09-30 03:58:09', NULL, 0),
(14, 'K', 'AH02', '00006', '01', 'KAH020000601', 'testy', NULL, NULL, 'x', ' Cái', 3, '000014', '2000020000149', NULL, '', NULL, NULL, NULL, NULL, '2024-09-30 03:58:44', NULL, 0),
(15, 'K', 'AH02', '00006', '02', 'KAH020000602', 'testy', NULL, NULL, 'm', ' Cái', 3, '000015', '2000020000156', NULL, '', NULL, NULL, NULL, NULL, '2024-09-30 03:58:44', NULL, 0),
(16, 'K', 'AH02', '00006', '03', 'KAH020000603', 'testy', NULL, NULL, 'l', ' Cái', 3, '000016', '2000020000163', NULL, '', NULL, NULL, NULL, NULL, '2024-09-30 03:58:44', NULL, 0),
(17, 'T', 'AH03', '00007', '01', 'TAH030000701', 'test giá ko size', NULL, NULL, 'x', 'Cái', 3, '000017', '2000020000170', NULL, '7', NULL, NULL, NULL, NULL, '2024-09-30 04:12:11', NULL, 0),
(18, 'T', 'AH03', '00007', '02', 'TAH030000702', 'test giá ko size', NULL, NULL, 'm', 'Cái', 3, '000018', '2000020000187', NULL, '8', NULL, NULL, NULL, NULL, '2024-09-30 04:12:11', NULL, 0),
(19, 'T', 'AH03', '00007', '03', 'TAH030000703', 'test giá ko size', NULL, NULL, 'l', 'Cái', 3, '000019', '2000020000194', NULL, '9', NULL, NULL, NULL, NULL, '2024-09-30 04:12:11', NULL, 0),
(20, 'K', 'AH01', '00008', NULL, 'KAH010000800', 'Test Giá', NULL, NULL, '', 'Cái', 3, '000020', '2000020000200', NULL, '2000000000', 5, '1904761904.76', NULL, NULL, '2024-09-30 04:27:00', NULL, 0),
(21, 'K', 'AH02', '00009', NULL, 'KAH020000900', 'Áo Dài Giá', NULL, NULL, '', 'Cái', 2, '000021', '2000010000210', NULL, '1,235,665,554', 5, 'NaN', NULL, NULL, '2024-09-30 04:30:59', NULL, 0),
(22, 'T', 'AH02', '00010', '01', 'TAH020001001', 'áo dài test', NULL, NULL, 'x', 'Cái', 2, '000022', '2000010000227', NULL, '1,234', NULL, NULL, NULL, NULL, '2024-10-01 04:01:13', NULL, 0),
(23, 'T', 'AH02', '00010', '02', 'TAH020001002', 'áo dài test', NULL, NULL, 'm', 'Cái', 2, '000023', '2000010000234', NULL, '5,678', NULL, NULL, NULL, NULL, '2024-10-01 04:01:13', NULL, 0),
(24, 'T', 'AH02', '00010', '03', 'TAH020001003', 'áo dài test', NULL, NULL, 'l', 'Cái', 2, '000024', '2000010000241', NULL, '7,890', NULL, NULL, NULL, NULL, '2024-10-01 04:01:13', NULL, 0),
(25, 'T', 'AH03', '00011', NULL, 'TAH030001100', 'Áo Dài Vat', NULL, NULL, '', 'Cái', 3, '000025', '2000020000255', NULL, '20,000', 8, 'NaN', NULL, NULL, '2024-10-01 04:23:46', NULL, 0),
(26, 'T', 'AH01', '00012', NULL, 'TAH010001200', 'Áo Dài Vat1', NULL, NULL, '', 'Cái', 3, '000026', '2000020000262', NULL, '25,000', 10, 'NaN', NULL, NULL, '2024-10-01 04:24:39', NULL, 0),
(27, 'T', 'AH01', '00013', '01', 'TAH010001301', 'áo dài vat a', NULL, NULL, 'x', 'Cái', 3, '000027', '2000020000279', NULL, '11,111', NULL, 'NaN', NULL, NULL, '2024-10-01 04:25:33', NULL, 0),
(28, 'T', 'AH01', '00013', '02', 'TAH010001302', 'áo dài vat a', NULL, NULL, 'm', 'Cái', 3, '000028', '2000020000286', NULL, '2,222', NULL, 'NaN', NULL, NULL, '2024-10-01 04:25:33', NULL, 0),
(29, 'T', 'AH01', '00013', '03', 'TAH010001303', 'áo dài vat a', NULL, NULL, 'l', 'Cái', 3, '000029', '2000020000293', NULL, '3,333', NULL, 'NaN', NULL, NULL, '2024-10-01 04:25:33', NULL, 0),
(30, 'K', 'AH01', '00014', '01', 'KAH010001401', 'áo dài gấm rồngsà', NULL, NULL, 'x', 'Cái', 2, '000030', '2000010000302', NULL, '', NULL, '0', NULL, NULL, '2024-10-01 04:25:49', NULL, 0),
(31, 'K', 'AH01', '00014', '02', 'KAH010001402', 'áo dài gấm rồngsà', NULL, NULL, 'm', 'Cái', 2, '000031', '2000010000319', NULL, '', NULL, '0', NULL, NULL, '2024-10-01 04:25:49', NULL, 0),
(32, 'K', 'AH01', '00014', '03', 'KAH010001403', 'áo dài gấm rồngsà', NULL, NULL, 'l', 'Cái', 2, '000032', '2000010000326', NULL, '', NULL, '0', NULL, NULL, '2024-10-01 04:25:49', NULL, 0),
(33, 'T', 'AH01', '00015', NULL, 'TAH010001500', 'Test', NULL, NULL, '', 'Cái', 3, '000033', '2000020000330', NULL, '25,000', 8, 'NaN', NULL, NULL, '2024-10-01 04:26:50', NULL, 0),
(34, 'T', 'AH02', '00016', '01', 'TAH020001601', 'quần dài123', NULL, NULL, 'x', 'Cái', 2, '000034', '2000010000340', NULL, '10000', NULL, '9,259.26', NULL, NULL, '2024-10-01 04:40:39', NULL, 0),
(35, 'T', 'AH02', '00016', '02', 'TAH020001602', 'quần dài123', NULL, NULL, 'm', 'Cái', 2, '000035', '2000010000357', NULL, '20000', NULL, '18,518.52', NULL, NULL, '2024-10-01 04:40:39', NULL, 0),
(36, 'T', 'AH02', '00016', '03', 'TAH020001603', 'quần dài123', NULL, NULL, 'l', 'Cái', 2, '000036', '2000010000364', NULL, '30000', NULL, '27,777.78', NULL, NULL, '2024-10-01 04:40:39', NULL, 0),
(37, 'T', 'AH03', '00017', '01', 'TAH030001701', 'test 111', NULL, NULL, 'x', 'Cái', 2, '000037', '2000010000371', NULL, '22222', NULL, '20,201.82', NULL, NULL, '2024-10-01 04:45:47', NULL, 0),
(38, 'T', 'AH03', '00017', '02', 'TAH030001702', 'test 111', NULL, NULL, 'm', 'Cái', 2, '000038', '2000010000388', NULL, '2222111', NULL, '2,020,100.91', NULL, NULL, '2024-10-01 04:45:47', NULL, 0),
(39, 'T', 'AH03', '00017', '03', 'TAH030001703', 'test 111', NULL, NULL, 'l', 'Cái', 2, '000039', '2000010000395', NULL, '333333', NULL, '303,030', NULL, NULL, '2024-10-01 04:45:47', NULL, 0),
(40, 'T', 'AH03', '00018', NULL, 'TAH030001800', 'Áo Dài Test11', NULL, NULL, '', 'Cái', 3, '000040', '2000020000408', NULL, '25,000', 8, 'NaN', NULL, NULL, '2024-10-01 06:07:58', NULL, 0),
(41, 'T', 'AH03', '00019', '01', 'TAH030001901', 'áo dài', NULL, NULL, 'x', 'Cái', 3, '000041', '2000020000415', NULL, '1111', NULL, '1,058.1', NULL, NULL, '2024-10-01 06:12:11', NULL, 0),
(42, 'T', 'AH03', '00019', '02', 'TAH030001902', 'áo dài', NULL, NULL, 'm', 'Cái', 3, '000042', '2000020000422', NULL, '12222', NULL, '11,640', NULL, NULL, '2024-10-01 06:12:11', NULL, 0),
(43, 'T', 'AH03', '00019', '03', 'TAH030001903', 'áo dài', NULL, NULL, 'l', 'Cái', 3, '000043', '2000020000439', NULL, '22222', NULL, '21,163.81', NULL, NULL, '2024-10-01 06:12:11', NULL, 0),
(44, 'T', 'AH01', '00020', '01', 'TAH010002001', 'áo dài123123', NULL, NULL, 'x', 'Bộ', 3, '000044', '2000020000446', NULL, '1234', 5, '1,175.24', NULL, NULL, '2024-10-01 06:14:41', NULL, 0),
(45, 'T', 'AH01', '00020', '02', 'TAH010002002', 'áo dài123123', NULL, NULL, 'm', 'Bộ', 3, '000045', '2000020000453', NULL, '56789', 5, '54,084.76', NULL, NULL, '2024-10-01 06:14:41', NULL, 0),
(46, 'T', 'AH01', '00020', '03', 'TAH010002003', 'áo dài123123', NULL, NULL, 'l', 'Bộ', 3, '000046', '2000020000460', NULL, '90000', 5, '85,714.29', NULL, NULL, '2024-10-01 06:14:41', NULL, 0),
(47, 'T', 'AH03', '00021', '01', 'TAH030002101', 'test giá bán mơi·', NULL, 'xanh', 'x', 'Bộ', 3, '000047', '2000020000477', NULL, '200,000', 10, '181,818.18', NULL, NULL, '2024-10-01 06:17:20', NULL, 0),
(48, 'T', 'AH03', '00021', '02', 'TAH030002102', 'test giá bán mơi·', NULL, 'đỏ', 'x', 'Bộ', 3, '000048', '2000020000484', NULL, '300,000', 10, '272,727.27', NULL, NULL, '2024-10-01 06:17:20', NULL, 0),
(49, 'T', 'AH03', '00021', '03', 'TAH030002103', 'test giá bán mơi·', NULL, 'xanh', 'm', 'Bộ', 3, '000049', '2000020000491', NULL, '400,000', 10, '363,636.36', NULL, NULL, '2024-10-01 06:17:20', NULL, 0),
(50, 'T', 'AH03', '00021', '04', 'TAH030002104', 'test giá bán mơi·', NULL, 'đỏ', 'm', 'Bộ', 3, '000050', '2000020000507', NULL, '500,000', 10, '454,545.45', NULL, NULL, '2024-10-01 06:17:20', NULL, 0),
(51, 'T', 'AH03', '00021', '05', 'TAH030002105', 'test giá bán mơi·', NULL, 'xanh', 'l', 'Bộ', 3, '000051', '2000020000514', NULL, '600,000', 10, '545,454.55', NULL, NULL, '2024-10-01 06:17:20', NULL, 0),
(52, 'T', 'AH03', '00021', '06', 'TAH030002106', 'test giá bán mơi·', NULL, 'đỏ', 'l', 'Bộ', 3, '000052', '2000020000521', NULL, '700,000', 10, '636,363.64', NULL, NULL, '2024-10-01 06:17:20', NULL, 0),
(53, 'T', 'AH03', '00022', '01', 'TAH030002201', 'balo chống sốc', 'Balo Chống Sốc', NULL, 'x', 'Bộ', 2, '000053', '2000010000531', NULL, '20,000', 5, '19,047.62', NULL, NULL, '2024-10-01 06:24:27', NULL, 0),
(54, 'T', 'AH03', '00022', '02', 'TAH030002202', 'balo chống sốc', 'Balo Chống Sốc', NULL, 'm', 'Bộ', 2, '000054', '2000010000548', NULL, '30,000', 5, '28,571.43', NULL, NULL, '2024-10-01 06:24:27', NULL, 0),
(55, 'T', 'AH03', '00022', '03', 'TAH030002203', 'balo chống sốc', 'Balo Chống Sốc', NULL, 'l', 'Bộ', 2, '000055', '2000010000555', NULL, '40,000', 5, '38,095.24', NULL, NULL, '2024-10-01 06:24:27', NULL, 0);
INSERT INTO `MaSku` (`id_sku`, `loai_hang`, `ma_ncc`, `stt_mat_hang`, `stt_thuoc_tinh`, `ma_sku`, `ten_sp`, `ten_sp_tt`, `tt_mau`, `tt_size`, `dvt`, `id_nhom`, `stt_barcode`, `barcode`, `check_sum`, `gia_ban`, `thue_suat`, `gia_ban_truoc_vat`, `gia_von`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
(56, 'T', 'AH03', '00023', '01', 'TAH030002301', 'balo chống sốc', 'Balo Chống Sốc', NULL, 'x', 'Bộ', 2, '000055', '2000010000555', NULL, '20,000', 5, '19,047.62', NULL, NULL, '2024-10-01 06:24:27', NULL, 0),
(57, 'T', 'AH03', '00023', '02', 'TAH030002302', 'balo chống sốc', 'Balo Chống Sốc', NULL, 'm', 'Bộ', 2, '000056', '2000010000562', NULL, '30,000', 5, '28,571.43', NULL, NULL, '2024-10-01 06:24:27', NULL, 0),
(58, 'T', 'AH03', '00023', '03', 'TAH030002303', 'balo chống sốc', 'Balo Chống Sốc', NULL, 'l', 'Bộ', 2, '000057', '2000010000579', NULL, '40,000', 5, '38,095.24', NULL, NULL, '2024-10-01 06:24:27', NULL, 0),
(59, 'T', 'AH03', '00024', '01', 'TAH030002401', NULL, 'balo du lịchx', NULL, 'x', 'Cái', 3, '000058', '2000020000583', NULL, '11,111', 10, '10,100.91', NULL, NULL, '2024-10-01 06:25:54', NULL, 0),
(60, 'T', 'AH03', '00024', '02', 'TAH030002402', NULL, 'balo du lịchm', NULL, 'm', 'Cái', 3, '000059', '2000020000590', NULL, '22,222', 10, '20,201.82', NULL, NULL, '2024-10-01 06:25:54', NULL, 0),
(61, 'T', 'AH03', '00024', '03', 'TAH030002403', NULL, 'balo du lịchl', NULL, 'l', 'Cái', 3, '000060', '2000020000606', NULL, '33,333', 10, '30,302.73', NULL, NULL, '2024-10-01 06:25:54', NULL, 0),
(62, 'T', 'AH03', '00025', '01', 'TAH030002501', NULL, 'balo du lịchx', NULL, 'x', 'Cái', 3, '000060', '2000020000606', NULL, '11,111', 10, '10,100.91', NULL, NULL, '2024-10-01 06:25:55', NULL, 0),
(63, 'T', 'AH03', '00025', '02', 'TAH030002502', NULL, 'balo du lịchm', NULL, 'm', 'Cái', 3, '000061', '2000020000613', NULL, '22,222', 10, '20,201.82', NULL, NULL, '2024-10-01 06:25:55', NULL, 0),
(64, 'T', 'AH03', '00025', '03', 'TAH030002503', NULL, 'balo du lịchl', NULL, 'l', 'Cái', 3, '000062', '2000020000620', NULL, '33,333', 10, '30,302.73', NULL, NULL, '2024-10-01 06:25:55', NULL, 0),
(65, 'T', 'AH01', '00026', '01', 'TAH010002601', NULL, 'balo đi bụi - S - ', NULL, 'S', 'Cái', 2, '000063', '2000010000630', NULL, '1,111', 8, '1,028.7', NULL, NULL, '2024-10-01 06:27:39', NULL, 0),
(66, 'T', 'AH01', '00026', '02', 'TAH010002602', NULL, 'balo đi bụi - M - ', NULL, 'M', 'Cái', 2, '000064', '2000010000647', NULL, '2,222', 8, '2,057.41', NULL, NULL, '2024-10-01 06:27:39', NULL, 0),
(67, 'T', 'AH01', '00026', '03', 'TAH010002603', NULL, 'balo đi bụi - L - ', NULL, 'L', 'Cái', 2, '000065', '2000010000654', NULL, '3,333', 8, '3,086.11', NULL, NULL, '2024-10-01 06:27:39', NULL, 0),
(68, 'T', 'AH01', '00027', '01', 'TAH010002701', NULL, 'giày thể thao - S', NULL, 'S', 'Cái', 3, '000066', '2000020000668', NULL, '100,000', 8, '92,592.59', NULL, NULL, '2024-10-01 06:29:59', NULL, 0),
(69, 'T', 'AH01', '00027', '02', 'TAH010002702', NULL, 'giày thể thao - M', NULL, 'M', 'Cái', 3, '000067', '2000020000675', NULL, '20,000', 8, '18,518.52', NULL, NULL, '2024-10-01 06:29:59', NULL, 0),
(70, 'T', 'AH01', '00027', '03', 'TAH010002703', NULL, 'giày thể thao - L', NULL, 'L', 'Cái', 3, '000068', '2000020000682', NULL, '300,000', 8, '277,777.78', NULL, NULL, '2024-10-01 06:29:59', NULL, 0),
(71, 'T', 'AH03', '00028', '01', 'TAH030002801', NULL, 'giày thể thao - S - xanh', 'xanh', 'S', 'Cái', 3, '000069', '2000020000699', NULL, '10,000', 5, '9,523.81', NULL, NULL, '2024-10-01 06:30:37', NULL, 0),
(72, 'T', 'AH03', '00028', '02', 'TAH030002802', NULL, 'giày thể thao - S - đỏ', 'đỏ', 'S', 'Cái', 3, '000070', '2000020000705', NULL, '20,000', 5, '19,047.62', NULL, NULL, '2024-10-01 06:30:37', NULL, 0),
(73, 'T', 'AH03', '00028', '03', 'TAH030002803', NULL, 'giày thể thao - M - xanh', 'xanh', 'M', 'Cái', 3, '000071', '2000020000712', NULL, '30,000', 5, '28,571.43', NULL, NULL, '2024-10-01 06:30:37', NULL, 0),
(74, 'T', 'AH03', '00028', '04', 'TAH030002804', NULL, 'giày thể thao - M - đỏ', 'đỏ', 'M', 'Cái', 3, '000072', '2000020000729', NULL, '40,000', 5, '38,095.24', NULL, NULL, '2024-10-01 06:30:37', NULL, 0),
(75, 'T', 'AH03', '00028', '05', 'TAH030002805', NULL, 'giày thể thao - L - xanh', 'xanh', 'L', 'Cái', 3, '000073', '2000020000736', NULL, '50,000', 5, '47,619.05', NULL, NULL, '2024-10-01 06:30:37', NULL, 0),
(76, 'T', 'AH03', '00028', '06', 'TAH030002806', NULL, 'giày thể thao - L - đỏ', 'đỏ', 'L', 'Cái', 3, '000074', '2000020000743', NULL, '60,000', 5, '57,142.86', NULL, NULL, '2024-10-01 06:30:37', NULL, 0),
(77, 'T', 'AH03', '00029', '01', 'TAH030002901', NULL, 'Áo Dài Cho Nam - X - Đỏ', 'Đỏ', 'X', 'Cái', 3, '000075', '2000020000750', NULL, '20,000', 10, '18,181.82', NULL, NULL, '2024-10-01 06:53:12', NULL, 0),
(78, 'T', 'AH03', '00029', '02', 'TAH030002902', NULL, 'Áo Dài Cho Nam - X - Xanh', 'Xanh', 'X', 'Cái', 3, '000076', '2000020000767', NULL, '30,000', 10, '27,272.73', NULL, NULL, '2024-10-01 06:53:12', NULL, 0),
(79, 'T', 'AH03', '00029', '03', 'TAH030002903', NULL, 'Áo Dài Cho Nam - M - Đỏ', 'Đỏ', 'M', 'Cái', 3, '000077', '2000020000774', NULL, '40,000', 10, '36,363.64', NULL, NULL, '2024-10-01 06:53:12', NULL, 0),
(80, 'T', 'AH03', '00029', '04', 'TAH030002904', NULL, 'Áo Dài Cho Nam - M - Xanh', 'Xanh', 'M', 'Cái', 3, '000078', '2000020000781', NULL, '50,000', 10, '45,454.55', NULL, NULL, '2024-10-01 06:53:12', NULL, 0),
(81, 'T', 'AH03', '00029', '05', 'TAH030002905', NULL, 'Áo Dài Cho Nam - L - Đỏ', 'Đỏ', 'L', 'Cái', 3, '000079', '2000020000798', NULL, '60,000', 10, '54,545.45', NULL, NULL, '2024-10-01 06:53:12', NULL, 0),
(82, 'T', 'AH03', '00029', '06', 'TAH030002906', NULL, 'Áo Dài Cho Nam - L - Xanh', 'Xanh', 'L', 'Cái', 3, '000080', '2000020000804', NULL, '70,000', 10, '63,636.36', NULL, NULL, '2024-10-01 06:53:12', NULL, 0);

INSERT INTO `NhomNganhHang` (`id_nhom`, `ma_lv1`, `ma_lv2`, `ma_lv3`, `ten_lv3`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
(0, NULL, NULL, NULL, '--- Chọn Nhóm Ngành Hàng ---', NULL, NULL, NULL, 1);
INSERT INTO `NhomNganhHang` (`id_nhom`, `ma_lv1`, `ma_lv2`, `ma_lv3`, `ten_lv3`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
(2, '200', '100', '001', 'Quần Dài Nam', NULL, '2024-07-19 01:27:47', NULL, 0);
INSERT INTO `NhomNganhHang` (`id_nhom`, `ma_lv1`, `ma_lv2`, `ma_lv3`, `ten_lv3`, `user_id`, `ngay_tao`, `ngay_sua`, `trang_thai`) VALUES
(3, '200', '100', '002', 'Quần Ngắn Nam', NULL, '2024-07-19 01:36:35', NULL, 0);




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;