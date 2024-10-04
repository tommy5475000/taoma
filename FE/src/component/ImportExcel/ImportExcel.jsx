import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelImport = () => {
  const [data, setData] = useState([]);

  // Hàm xử lý khi file được tải lên
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    // Kiểm tra nếu không có file
    if (!file) return;

    const reader = new FileReader();
    
    // Đọc file dưới dạng binary string
    reader.readAsBinaryString(file);

    // Sau khi đọc file thành công
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      // Sử dụng XLSX để đọc dữ liệu từ file Excel
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      
      // Giả sử bạn muốn lấy dữ liệu từ sheet đầu tiên
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Chuyển dữ liệu từ sheet thành dạng JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
    };

    // Nếu có lỗi trong quá trình đọc file
    reader.onerror = (error) => {
      console.log('Error reading file:', error);
    };
  };

  return (
    <div>
      <h3>Import Excel File</h3>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      
      <h4>Data from Excel:</h4>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Hiển thị dữ liệu JSON */}
    </div>
  );
};

export default ExcelImport;
