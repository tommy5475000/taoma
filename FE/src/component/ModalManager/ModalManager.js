import React from 'react';
import { Modal, Box } from '@mui/material';
import { styleModal } from '../ModalManager/itemStyle'; 

const ModalWrapper = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ ...styleModal, 
          width: 500,     
          maxHeight: '90vh',  
          overflowY: 'auto',  
          }}>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;