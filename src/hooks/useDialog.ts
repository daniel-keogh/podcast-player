import { useState } from "react";

type DialogState = {
  open: boolean;
  [key: string]: any;
};

function useDialog({ open = false, ...initialState }: DialogState) {
  const [dialog, setDialog] = useState({
    open,
    ...initialState,
  });

  const handleOpen = (state: DialogState) => {
    setDialog({
      ...state,
      open: true,
    });
  };

  const handleClose = () => {
    setDialog((state: DialogState) => ({
      ...state,
      open: false,
    }));
  };

  return [dialog, handleOpen, handleClose];
}

export default useDialog;
