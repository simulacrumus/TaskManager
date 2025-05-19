import * as React from 'react';
import Box from '@mui/material/Box';
import {Modal as MUIModal} from '@mui/material';
import { modalStyles } from '../styles'; 

interface ModalProps{
  open:boolean,
  onClose:()=>void,
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <div>
      <MUIModal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ modalStyles }>
          {children}
        </Box>
      </MUIModal>
    </div>
  );
};
