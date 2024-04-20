import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  CalendarIcon,
  DateTimePicker,
  MobileDateTimePicker,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
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

export default function CreateNoteModal(props) {
  const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [data, setData] = useState({
    text: "",
    userId: 1,
  });

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

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
      text: data.text,
      userId: props.user.id,
    };

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .post("https://deep-wealthy-roughy.ngrok-free.app/note", noteData, config)
      .then((response) => {
        if (response.status === 201) {
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
        style={{
          marginTop: "10px",
          color: "#6c546f",
          fontWeight: "bold",
          border: "solid 2px",
          backgroundColor: "#ece6ff",
          float: "right",
        }}
        size="large"
        onClick={handleOpen}
        startIcon={<AddBoxIcon />}
      >
        Opret Note
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h5">
            Opret Note for {props.user.firstName} {props.user.lastName}
          </Typography>
          <Grid container md={12} spacing={2}>
            <Grid item md={12}>
              <TextField
                margin="normal"
                multiline={true}
                rows={5}
                fullWidth
                required
                name="text"
                label="Note"
                id="text"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md="12">
              <Button
                type="submit"
                fullWidth
                startIcon={<CheckBoxIcon />}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  backgroundColor: "#85B585",
                }}
              >
                Opret Note
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
