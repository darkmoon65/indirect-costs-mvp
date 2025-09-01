import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { forwardRef, useImperativeHandle, useState } from "react";
import OperacionForm from "../form";

const ModalCustom = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const { operacion, volumenes, onSave, onCancel } = props;

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useImperativeHandle(ref, () => ({
    openModal: handleOpen,
    closeModal: handleClose,
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 560,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {volumenes && (
          <OperacionForm
            operacion={operacion}
            volumenes={volumenes}
            onSave={onSave}
            onCancel={onCancel}
          />
        )}
      </Box>
    </Modal>
  );
});

export default ModalCustom;
