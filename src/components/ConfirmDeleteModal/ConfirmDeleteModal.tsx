import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure you want to delete this report?",
}: ConfirmDeleteModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Report</DialogTitle>
      <DialogContent>
        <Typography>{title}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
