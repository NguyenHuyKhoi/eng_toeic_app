import {
  createRef,
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
export const globalAlertRef = createRef<any>();

export interface GlobalAlertParams {
  title: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  caption?: string;
  confirm_style?: CSSProperties;
}
export const globalAlert = {
  show: (params: GlobalAlertParams) => {
    globalAlertRef?.current?.show(params);
  },
  hide: () => {
    globalAlertRef?.current?.hide();
  },
};

export const GlobalAlert = forwardRef((_, ref) => {
  const [data, setData] = useState<GlobalAlertParams | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  useImperativeHandle(ref, () => {
    return { show: show, hide: hide };
  });

  const show = (params: GlobalAlertParams) => {
    setOpen(true);
    setData(params);
  };
  const hide = () => {
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
    data?.onCancel?.();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          overflow: "visible",
          backdropFilter: "blur(20px)",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: 1,
          boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          position: "relative",
          textAlign: "center",
          px: 2,
          py: 1,
        },
      }}
    >
      {/* Close Button */}
      <Box sx={{ position: "absolute", top: 12, right: 12 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Title */}
      <DialogTitle sx={{ mt: 1, fontWeight: "bold" }}>
        {data?.title}
      </DialogTitle>

      {/* Description */}
      {data?.caption && (
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {data?.caption}
          </Typography>
        </DialogContent>
      )}

      {/* Actions */}
      <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            minWidth: 120,
            px: 3,
            borderRadius: 1,
            borderColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            data?.onConfirm?.();
            setOpen(false);
          }}
          sx={{
            minWidth: 120,
            px: 3,
            borderRadius: 1,

            ...data?.confirm_style,
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
});
