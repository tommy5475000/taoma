import React from 'react';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
import { Button } from '@mui/material';

const ExcelExport = ({ data, fileName }) => {
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <Button variant="contained" onClick={exportToExcel}>Export to Excel</Button>
  );
}

export default ExcelExport;
