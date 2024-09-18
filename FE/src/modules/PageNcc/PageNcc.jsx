import * as React from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDataNcc, removeNcc } from '../../apis/Ncc';
import {  CircularProgress, Grid, Typography } from '@mui/material';
import { columnsNcc } from '../../component/ItemHeader/item';
import { useState } from 'react';
import { showAlert } from '../../component/ModalManager/itemStyle';
import Swal from 'sweetalert2';
import UpdateNcc from './UpdateNcc';
import ToolbarButtons from '../../component/Button/ToolbarButtons';
import ModalWrapper from '../../component/ModalManager/ModalManager';
import CreateMaNcc from './CreateNcc/CreateMaNcc';

export default function PageNcc() {
  const queryClient = useQueryClient();
  const [selectedRows, setSelectedRows] = useState([]);

  const { data: dataNcc = [], isLoading } = useQuery({ queryKey: ['dataNcc'], queryFn: getDataNcc })
  const filteredDataNcc = dataNcc.filter(row => row.ma_ncc && row.ma_ncc.trim() !== '' && row.trang_thai === false);

  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);
  };

  const { mutate: handleremove } = useMutation({
    mutationFn: (id) => {
      return removeNcc(id)
    },
    onError: (error) => {
      const errorMessage = error.message || error.messenge || 'Đã xảy ra lỗi';
      showAlert(errorMessage, 'error');
    },
    onSuccess: () => {
      showAlert('Thành công', 'success');
      queryClient.invalidateQueries({ queryKey: ['dataNcc'] });
    }
  });

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      showAlert('Vui lòng chọn dòng cần xóa', 'error');
      return;
    }
    Swal.fire({
      title: `Bạn muốn xóa NCC này ?`,
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xác nhận',
    }).then((result) => {
      if (result.isConfirmed) {
        selectedRows.forEach((id) => {
          handleremove(id);
        });
        showAlert('Đã xóa!', 'success');
      }
    });
  };

  //----- modal tạo ncc -----
  const [open, setOpen] = useState(false);
  const handleOpenNCC = () => {
    setOpen(true);
  }
  const handleCloseNCC = () => {
    setOpen(false);
  }
  //----- modal tạo mã -----

  //----- modal sửa ncc -----
  const [editRow, setEditRow] = useState(null); // set row
  const [edit, setEdit] = useState(false); // mở modal

  const handleOpenEditNCC = () => {
    if (selectedRows.length !== 1) {
      showAlert('Vui lòng chọn một dòng để sửa', 'error');
      return;
    }
    const row = filteredDataNcc.find(row => row.ma_ncc === selectedRows[0]);
    setEditRow(row); // Lưu thông tin của dòng được chọn để chỉnh sửa
    setEdit(true);
  };

  const handleCloseEditNCC = () => {
    setEdit(false);
    setEditRow(null);
  };

  //----- modal sửa mã -----

  return (
    <>
      <div style={{ height: 550, width: '100%' }}>
        {isLoading ? (
          <Grid container alignItems="center" justifyContent="center" style={{ height: '100%' }}>
            <CircularProgress />
            <Typography variant="h6" style={{ marginLeft: 10 }}>Đang tải dữ liệu...</Typography>
          </Grid>
        ) : (
          <DataGrid
            rows={filteredDataNcc}
            columns={columnsNcc}
            getRowId={(row) => row.ma_ncc}
            checkboxSelection
            slots={{
              toolbar: () => (
                <GridToolbarContainer>
                  <Grid container alignItem='center'>
                    <Grid item>
                      <ToolbarButtons
                        handleOpen={handleOpenNCC}
                        handleDelete={handleDelete}
                        handleEdit={handleOpenEditNCC}
                        data={filteredDataNcc}
                      />
                    </Grid>
                  </Grid>
                </GridToolbarContainer>
              )
            }}
            onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: 'white',
              },
            }}
          />
        )}
      </div>

      <ModalWrapper
        open={open}
        handleClose={handleCloseNCC}
      >
        <CreateMaNcc handleCloseNCC={handleCloseNCC} />
      </ModalWrapper>

      <ModalWrapper
        open={edit}
        handleClose={handleCloseEditNCC}
      >
        <UpdateNcc handleCloseEditNCC={handleCloseEditNCC} item={editRow} id={selectedRows} />
      </ModalWrapper>

    </>

  );
} 