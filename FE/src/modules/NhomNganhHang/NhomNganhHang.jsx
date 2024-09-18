import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React, { useState } from 'react'
import ToolbarButtons from '../../component/Button/ToolbarButtons'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { columnsLV } from '../../component/ItemHeader/item'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDataLV, removeNhomNH } from '../../apis/NhomNganhHang'
import ModalWrapper from '../../component/ModalManager/ModalManager'
import CreateLV from './CreateLV/CreateLV'
import Swal from 'sweetalert2'
import { showAlert } from '../../component/ModalManager/itemStyle'
import UpdateLV from './UpdateLV'

export default function NhomNganhHang() {
    const queryClient = useQueryClient();

    const [selectedRows, setSelectedRows] = useState([]);
    const handleSelectionChange = (newSelectionModel) => {
        setSelectedRows(newSelectionModel);
    };

    const { data: dataNhomLV = [], isLoading } = useQuery({
        queryKey: ['dataNhomLV'],
        queryFn: getDataLV
    })

    const tenLv = dataNhomLV.map(item => ({
        ...item,
        ten_lv1: item.Lv1?.ten_lv1 || 'Chưa có tên',
        ten_lv2: item.Lv2?.ten_lv2 || 'Chưa có tên',
    }));
    const filteredNhomLV = tenLv.filter(row => row.trang_thai === false);

    // ----- Modal Tạo-----
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    //----- modal sửa nhóm LV -----
    const [editRow, setEditRow] = useState(null); // set row
    const [edit, setEdit] = useState(false); // mở modal

    const handleEditNhomLV = () => {
        if (selectedRows.length !== 1) {
            showAlert('Vui lòng chọn một dòng để sửa', 'error');
            return;
        }
        const row = filteredNhomLV.find(row => row.id_nhom === selectedRows[0]);
        setEditRow(row); // Lưu thông tin của dòng được chọn để chỉnh sửa
        setEdit(true);
    };

    const handleCloseNhomLV = () => {
        setEdit(false);
        setEditRow(null);
    };

    const { mutate: handleremove } = useMutation({
        mutationFn: (id) => {
            return removeNhomNH(id)
        },
        onError: (error) => {
            const errorMessage = error.message || error.messenge || 'Đã xảy ra lỗi';
            showAlert(errorMessage, 'error');
        },
        onSuccess: () => {
            showAlert('Thành công', 'success');
            queryClient.invalidateQueries({ queryKey: ['dataNhomLV'] });
        }
    })

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
                        rows={filteredNhomLV}
                        columns={columnsLV}
                        getRowId={(row) => row.id_nhom}
                        checkboxSelection
                        slots={{
                            toolbar: () => (
                                <GridToolbarContainer>
                                    <Grid container alignItems='center'>
                                        <Grid item>
                                            <ToolbarButtons
                                                handleOpen={handleOpen}
                                                handleDelete={handleDelete}
                                                handleEdit={handleEditNhomLV}
                                                data={dataNhomLV}
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
                handleClose={handleClose}
            >
                <CreateLV handleClose={handleClose} />
            </ModalWrapper>

            <ModalWrapper
                open={edit}
                handleClose={handleCloseNhomLV}
            >
                <UpdateLV handleClose={handleCloseNhomLV} data={editRow} dataitem={dataNhomLV}/>
            </ModalWrapper>
        </>

    )
}
