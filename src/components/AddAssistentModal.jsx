import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog({ close, editRoom, room }) {
  const [data, setData] = React.useState();
  const onClick = () => {
    editRoom(data, room);
  };
  return (
    <div>
      <Dialog open={true} onClose={close} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add assistent</DialogTitle>
        <DialogContent>
          <DialogContentText>Add or remove assistent from this room</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            onChange={(e) => setData(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color='primary'>
            Cancel
          </Button>
          <Button onClick={onClick} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
