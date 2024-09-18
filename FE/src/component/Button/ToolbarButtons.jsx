import React from 'react'
import ExcelExport from '../ExportExcel/ExportExcel';
import { Button } from '@mui/material';


export default function ToolbarButtons ({handleOpen,handleDelete,handleEdit,data}) {
  return (
    <div>
        <Button variant="contained" color="primary" style={{ marginRight: 5 }} onClick={handleOpen}>Thêm</Button>
        <Button variant="contained" color="warning" style={{ marginRight: 5 }} onClick={handleDelete}>Xóa</Button>
        <Button variant="contained" color="success" style={{ marginRight: 5 }} onClick={handleEdit}>Sửa</Button>
        <ExcelExport data={data} fileName={`Nhà cung cấp_${new Date().toISOString().slice(0, 10)}`} />
    </div>
  )
}
