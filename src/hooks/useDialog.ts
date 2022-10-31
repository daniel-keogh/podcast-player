import { useState } from "react";

type DialogState<T> = {
  open: boolean;
} & T;

type DialogStateWithCallbacks<T> = [
  DialogState<T>,
  (state: Partial<DialogState<T>>) => void,
  () => void
];

function useDialog<T = {}>(dialogState: Partial<DialogState<T>>): DialogStateWithCallbacks<T> {
  const { open = false, ...initialState } = dialogState;

  const [dialog, setDialog] = useState({
    open,
    ...initialState,
  } as DialogState<T>);

  const handleOpen = (state: Partial<DialogState<T>>) => {
    setDialog({
      ...state,
      open: true,
    } as DialogState<T>);
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
