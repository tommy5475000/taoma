import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { columnsSku } from '../../component/ItemHeader/item';
import {  Grid } from '@mui/material';
import ToolbarButtons from '../../component/Button/ToolbarButtons';
import ModalWrapper from '../../component/ModalManager/ModalManager';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getDataSku } from '../../apis/Sku';
import CreateSku from './CreateSku';
import ExcelImport from '../../component/ImportExcel/ImportExcel';


export default function PageDm() {

  const { data: dataSku = [], isLoading, refetch } = useQuery({
    queryKey: ['dataSku'],
    queryFn: getDataSku
  })

  // Mutation để cập nhật dữ liệu SKU sau khi chỉnh sửa
  // const mutation = useMutation(updateDataSku, {
  //   onSuccess: () => {
  //     refetch();  // Tự động tải lại dữ liệu sau khi cập nhật thành công
  //   }
  // });

  // Xử lý cập nhật giá trị của một hàng khi người dùng chỉnh sửa
  // const processRowUpdate = (newRow) => {
  //   const updatedRow = { ...newRow, isNew: false }; // Cập nhật giá trị mới
  //   mutation.mutate(updatedRow); // Gọi mutation để cập nhật giá trị vào backend
  //   return updatedRow;
  // };

  // ------ Modal Tạo -----
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div style={{ height: 680, width: '100%', justifyContent: 'center' }}>
        <DataGrid
          rows={dataSku}
          columns={columnsSku}
          getRowId={(row) => row.id_sku}
          checkboxSelection
          // processRowUpdate={processRowUpdate}
          slots={{
            toolbar: () => (
              <GridToolbarContainer>
                <Grid container alignItem='center'>
                  <Grid item>
                    <ToolbarButtons
                      handleOpen={handleOpen}
                      currentPage="DanhMucHangHoa"
                      data={dataSku}
                    />
                  </Grid>
                  <Grid item>
                    {/* Nút Import Excel */}
                    <ExcelImport />
                  </Grid>
                </Grid>
              </GridToolbarContainer>
            )
          }}
          //   onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'white',
            },
          }}

        />
      </div>

      <ModalWrapper
        open={open}
        handleClose={handleClose}
      >
        <CreateSku handleClose={handleClose} />
      </ModalWrapper>
    </>
  )
}
