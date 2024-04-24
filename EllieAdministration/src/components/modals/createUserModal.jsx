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
import EditIcon from "@mui/icons-material/Edit";
import { useLoggedInStore } from "../zustandStore";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
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

export default function CreateUserModal() {
  const [employeeContact, setEmployeeContact] = useState("");
  const [employees, setEmployees] = useState([]);
  const [room, setRoom] = useState();
  const [userId, setUserId] = useState();
  const [rooms, setRooms] = useState([]);
  const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    room: 1,
    active: "",
    points: "",
    contactPersonId: "",
  });

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const url = "https://totally-helpful-krill.ngrok-free.app/employee";
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const urlroom = "https://totally-helpful-krill.ngrok-free.app/room";
  useEffect(() => {
    axios
      .get(urlroom, config)
      .then((res) => {
        setRooms(res.data);
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

  const handleSelectChange = (event) => {
    setEmployeeContact(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    setRoom(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      active: true,
      points: data.points,
      contactPersonId: employeeContact,
    };

    const roomData = {
      userId: userId,
    };

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .post(
        "https://totally-helpful-krill.ngrok-free.app/user",
        userData,
        config
      )
      .then((response) => {
        if (response.status === 201) {
          setUserId(response.data.id);
          roomData.userId = response.data.id;
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
          float: "right",
          marginRight: "20px",
          border: "solid 2px",
          backgroundColor: "#ece6ff",
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
        <Box sx={style} component="form" onSubmit={handleSubmit}>
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
            <Grid item md={12}>
              <InputLabel id="room">Værelse</InputLabel>
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
                onChange={handleSelectChange}
                style={{ width: "100%" }}
              >
                {employees.map((row) => (
                  <MenuItem value={row.id}>{row.email}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                name="points"
                label="Point"
                id="points"
                type="number"
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
                Opret bruger
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
