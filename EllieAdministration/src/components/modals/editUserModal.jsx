import { Grid, TextField, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import "../layout/register.css";
import EditIcon from "@mui/icons-material/Edit";
//import { useLoggedInStore } from "../components/zustandStore";

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

export default function EditUserModal(props) {
  const [checked, setChecked] = useState(props.user.active);
  //const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    room: "",
    active: false,
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

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      id: props.user.id,
      firstname:
        data.firstname == null || data.firstname.length < 1
          ? props.user.firstName
          : data.firstname,
      lastname:
        data.lastname == null || data.lastname.length < 1
          ? props.user.lastName
          : data.lastname,
      room:
        data.room == null || data.room.length < 1 ? props.user.room : data.room,
      contactPersonId:
        data.contactPersonId == null || data.contactPersonId.length < 1
          ? props.user.contactPersonId
          : data.contactPersonId,
      points:
        data.points == null || data.points.length < 1
          ? props.user.points
          : data.points,
      active: checked,
    };

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        //Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .put(
        "https://deep-wealthy-roughy.ngrok-free.app/user?id=" + props.user.id,
        userData,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          props.setUsers(userData);
          //handleClose();
          //window.location.reload(true);
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
      <Button onClick={handleOpen} startIcon={<EditIcon />} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h5">BrugerId: {props.user.id}</Typography>
          <Grid container md="12">
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="firstname"
                defaultValue={props.user.firstName}
                label="Fornavn"
                onChange={handleChange}
                id="firstname"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="points"
                defaultValue={props.user.points}
                label="Point"
                id="points"
                onChange={handleChange}
                style={{ width: "95%", marginLeft: "10px" }}
              />
            </Grid>
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="lastname"
                defaultValue={props.user.lastName}
                label="Efternavn"
                id="lastname"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="room"
                label="Værelse navn"
                id="room"
                onChange={handleChange}
                defaultValue={props.user.room}
                style={{ width: "95%", marginLeft: "10px" }}
              />
            </Grid>
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="contactPersonId"
                defaultValue={props.user.contactPersonId}
                label="Kontaktperson"
                id="contactPersonId"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md="6" marginTop={2}>
              <Typography style={{ marginLeft: "15px" }}>
                Bruger aktiv:
              </Typography>
              <Checkbox
                label="Aktiv"
                checked={checked}
                size="large"
                style={{ marginLeft: "25px" }}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "controlled" }}
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
                  backgroundColor: "#5e90c1",
                }}
              >
                Gem Bruger
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
