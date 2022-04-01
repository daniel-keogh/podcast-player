import { useState } from "react";

function useDialog({ open = false, ...initialState }) {
  const [dialog, setDialog] = useState({
    open,
    ...initialState,
  });

  const handleOpen = (state) => {
    setDialog({
      ...state,
      open: true,
    });
  };

  const handleClose = () => {
    setDialog((state) => ({
      ...state,
      open: false,
    }));
  };

  return [dialog, handleOpen, handleClose];
}

export default useDialog;
