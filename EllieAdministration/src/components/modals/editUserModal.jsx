import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import { useLoggedInStore } from "../zustandStore";
import { useEffect } from "react";

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
  const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [room, setRoom] = useState(props.user.rooms[0].name);
  const [rooms, setRooms] = useState([]);
  const [employeeContact, setEmployeeContact] = useState("");
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    room: 1,
    active: "",
    points: "",
    contactPersonId: "",
    userId: 1,
  });

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const urlroom = "https://totally-helpful-krill.ngrok-free.app/room";
  useEffect(() => {
    axios
      .get(urlroom, config)
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const url = "https://totally-helpful-krill.ngrok-free.app/employee";
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  const handleSelectChange = (event) => {
    setEmployeeContact(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    setRoom(event.target.value);
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
      contactPersonId:
        employeeContact == null || employeeContact.length < 1
          ? props.user.contactPersonId
          : employeeContact,
      points:
        data.points == null || data.points.length < 1
          ? props.user.points
          : data.points,
      active: checked,
    };

    const roomData = {
      userId: props.user.id,
    };

    const roomDataNull = {
      userId: null,
    };

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    axios
      .put(
        "https://totally-helpful-krill.ngrok-free.app/user?id=" + props.user.id,
        userData,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          //window.location.reload(true);
        } else {
          console.log("failed" + response.body);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

    axios
      .put(
        "https://totally-helpful-krill.ngrok-free.app/room?id=" +
          props.user.rooms[0].id,
        roomDataNull,
        config
      )
      .then((roomResponse) => {
        if (roomResponse.status === 200) {
          //window.location.reload(true);
        } else {
          console.log("failed" + roomResponse.body);
        }
      })
      .catch((error) => {
        console.log(error.roomResponse);
      });

    axios
      .put(
        "https://totally-helpful-krill.ngrok-free.app/room?id=" + room,
        roomData,
        config
      )
      .then((roomResponse) => {
        if (roomResponse.status === 200) {
          window.location.reload(true);
        } else {
          console.log("failed" + roomResponse.body);
        }
      })
      .catch((error) => {
        console.log(error.roomResponse);
      });
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} startIcon={<EditIcon color={"success"} />} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h5">
            {props.user.firstName} {props.user.lastName}
          </Typography>
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
            <Grid item md="6" marginTop={1}>
              <Typography style={{ marginLeft: "15px" }}>
                Konto aktiv
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
            <Grid item md="12">
              <TextField
                disabled
                margin="normal"
                name="room"
                defaultValue={props.user.rooms[0].name}
                label="nuværende værelse"
                id="room"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md="12">
              <InputLabel id="room">Skift Værelse til</InputLabel>
              <Select
                id="room"
                name="room"
                required
                onChange={handleSelectChange2}
                style={{ width: "100%" }}
              >
                {rooms.map((row) => (
                  <MenuItem value={row.id}>{row.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item md={12} sx={{ marginTop: "10px" }}>
              <InputLabel id="contactPersonId">Kontaktperson</InputLabel>
              <Select
                id="contactPersonId"
                name="contactPersonId"
                required
                defaultValue={props.user.contactPersonId}
                onChange={handleSelectChange}
                style={{ width: "100%" }}
              >
                {employees.map((row) => (
                  <MenuItem value={row.id}>{row.email}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item md="12">
              <Button
                type="submit"
                fullWidth
                startIcon={<EditIcon />}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  backgroundColor: "#85B585",
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
