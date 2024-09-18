import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { columnsSku } from '../../component/ItemHeader/item';
import {  Grid } from '@mui/material';
import ToolbarButtons from '../../component/Button/ToolbarButtons';
import ModalWrapper from '../../component/ModalManager/ModalManager';
import { useQuery } from '@tanstack/react-query';
import { getDataSku } from '../../apis/Sku';
import CreateSku from '../PageDm/CreateSku';


export default function Home() {
  
  const { data: dataSku = [], isLoading } = useQuery({
    queryKey: ['dataSku'],
    queryFn: getDataSku
  })
  
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
      <div>
        <DataGrid
          rows={dataSku}
          columns={columnsSku}
          getRowId={(row) => row.id_sku}
           checkboxSelection
          // slots={{
          //   toolbar: () => (
          //     <GridToolbarContainer>
          //       <Grid container alignItem='center'>
          //         <Grid item>
          //           <ToolbarButtons
          //             handleOpen={handleOpen}
          //           />
          //         </Grid>
          //       </Grid>
          //     </GridToolbarContainer>
          //   )
          // }}
          // onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
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

    </>
  )
}
