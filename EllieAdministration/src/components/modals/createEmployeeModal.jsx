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

export default function CreateEmployeeModal() {
  const [roleA, setRole] = useState("");
  //const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: 1,
    instituteId: 1,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSelectChange = (event) => {
    setRole(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const employeeData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: roleA,
      instituteId: data.instituteId,
    };

    console.log(employeeData);

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        //Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .post(
        "https://deep-wealthy-roughy.ngrok-free.app/employee",
        employeeData,
        config
      )
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
          color: "green",
          fontWeight: "bold",
          border: "solid 2px",
          backgroundColor: "#C1E1C1",
        }}
        size="large"
        onClick={handleOpen}
        startIcon={<AddBoxIcon />}
      >
        Opret medarbejder
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h5">Opret Spil</Typography>
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
                name="email"
                label="Email"
                id="email"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                name="password"
                label="Kodeord"
                onChange={handleChange}
                id="password"
                style={{ width: "95%", marginLeft: "10px" }}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel id="imageId">Rolle</InputLabel>
              <Select
                id="role"
                name="role"
                onChange={handleSelectChange}
                style={{ width: "100%" }}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Pædagog</MenuItem>
              </Select>
            </Grid>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required
                type="number"
                name="institute"
                label="Institut"
                onChange={handleChange}
                id="institute"
                style={{ width: "50%" }}
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
                Opret medarbejder
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
