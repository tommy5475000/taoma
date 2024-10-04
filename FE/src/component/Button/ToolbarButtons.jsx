import React from 'react'
import ExcelExport from '../ExportExcel/ExportExcel';
import { Button } from '@mui/material';
import ExcelImport from '../ImportExcel/ImportExcel';


export default function ToolbarButtons({ handleOpen, handleDelete, handleEdit, data, currentPage }) {
  // Xác định dữ liệu export dựa trên trang hiện tại
  const getExportData = () => {
    switch (currentPage) {
      case 'nhacungcap':
        return data.nhaCungCapData;  // Dữ liệu nhà cung cấp
      case 'DanhMucHangHoa':
        return data.maSku;  // Dữ liệu sản phẩm (MaSku)
      case 'khachhang':
        return data.khachHangData;  // Dữ liệu khách hàng
      default:
        return data;  // Dữ liệu mặc định hoặc toàn bộ
    }
  };
  return (
    <div>
      <Button variant="contained" color="primary" style={{ marginRight: 5 }} onClick={handleOpen}>Thêm</Button>
      <Button variant="contained" color="warning" style={{ marginRight: 5 }} onClick={handleDelete}>Xóa</Button>
      <Button variant="contained" color="success" style={{ marginRight: 5 }} onClick={handleEdit}>Sửa</Button>
      <ExcelExport data={data} fileName={`${currentPage}_${new Date().toISOString().slice(0, 10)}`} />
      
    </div>
  )
}
