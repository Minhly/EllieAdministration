import { Grid, TextField, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import * as React from "react";
//import "react-datepicker/dist/react-datepicker.css";
//import "../layout/register.css";
import EditIcon from "@mui/icons-material/Edit";
//import { useLoggedInStore } from "./zustandStore";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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

export default function CreateUserModal() {
  //const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    room: "",
    active: "",
    points: "",
    contactPersonId: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      room: data.room,
      active: true,
      points: data.points,
      contactPersonId: data.contactPersonId,
    };

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        // Authorization: `Bearer ${bearerToken}`,
      },
    };
    console.log(userData);
    axios
      .post("https://deep-wealthy-roughy.ngrok-free.app/user", userData, config)
      .then((response) => {
        if (response.status === 201) {
          window.location.reload(true);
        } else {
          console.log("failed" + response.status);
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
          color: "white",
          fontWeight: "bold",
          border: "solid 2px",
        }}
        size="large"
        onClick={handleOpen}
        startIcon={<AddBoxIcon />}
      >
        Opret bruger
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h5">Opret Bruger</Typography>
          <Grid container md={12}>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                name="firstName"
                label="Fornavn"
                id="firstName"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                name="lastName"
                label="Efternavn"
                onChange={handleChange}
                id="lastName"
                style={{ width: "95%", marginLeft: "10px" }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                name="room"
                label="Værelse navn"
                id="room"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                name="contactPersonId"
                label="Kontaktperson"
                onChange={handleChange}
                id="contactPersonId"
                style={{ width: "95%", marginLeft: "10px" }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                name="points"
                label="Point"
                id="points"
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
                  backgroundColor: "#5e90c1",
                }}
              >
                Opret bruger
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
