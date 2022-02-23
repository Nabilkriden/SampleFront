import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddRoomModal({ close, creatChatRomm }) {
  const [data, setData] = React.useState();
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const addRoom = () => {
    if (data?.email && data?.room) creatChatRomm(data.email, data.room);
  };
  return (
    <div>
      <Dialog open={true} onClose={close} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>ChatRoom</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a new chat Room</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            name='room'
            onChange={onChange}
            id='name'
            label='Room Name'
            type='text'
            fullWidth
          />
          <TextField
            margin='dense'
            id='email'
            name='email'
            onChange={onChange}
            label='Email Address'
            type='email'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color='primary'>
            Cancel
          </Button>
          <Button onClick={addRoom} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
