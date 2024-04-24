import { Grid, TextField, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import { useLoggedInStore } from "../zustandStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditNoteModal(props) {
  const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [data, setData] = useState({
    text: "",
  });
  console.log(props);
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const noteData = {
      id: props.note.id,
      text:
        data.text == null || data.text.length < 1 ? props.user.text : data.text,
      userId: props.note.userId,
    };

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .put(
        "https://totally-helpful-krill.ngrok-free.app/note?id=" + props.note.id,
        noteData,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(true);
        } else {
          console.log("failed" + response.body);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ float: "right" }}
        startIcon={<EditIcon color={"success"} />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Grid container md="12">
            <Grid item md={12}>
              <TextField
                margin="normal"
                multiline={true}
                rows={5}
                fullWidth
                required
                name="text"
                defaultValue={props.note.text}
                label="Note"
                id="text"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md="6">
              <Button
                type="submit"
                fullWidth
                startIcon={<EditIcon />}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  backgroundColor: "#85B585",
                }}
              >
                Gem Note
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
