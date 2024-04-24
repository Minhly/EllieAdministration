import {
  Grid,
  TextField,
  Typography,
  Box,
  InputLabel,
  Button,
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

export default function EditEmployeeModal(props) {
  const [checked, setChecked] = useState(props.user.active);
  const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [roleA, setRole] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
    instituteId: "",
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

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const employeeData = {
      id: props.user.id,
      firstname:
        data.firstname == null || data.firstname.length < 1
          ? props.user.firstName
          : data.firstname,
      lastname:
        data.lastname == null || data.lastname.length < 1
          ? props.user.lastName
          : data.lastname,
      email:
        data.email == null || data.email.length < 1
          ? props.user.email
          : data.email,
      roleId:
        data.roleId == null || data.roleId.length < 1
          ? props.user.roleId
          : roleA,
      instituteId: 1,
      active: checked,
    };

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .put(
        "https://totally-helpful-krill.ngrok-free.app/employee?id=" +
          props.user.id,
        employeeData,
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
      <Button onClick={handleOpen} startIcon={<EditIcon color={"success"} />} />
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
                name="lastname"
                defaultValue={props.user.lastName}
                label="Efternavn"
                id="lastname"
                onChange={handleChange}
                style={{ width: "95%", marginLeft: "10px" }}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel id="imageId">Rolle</InputLabel>
              <Select
                id="role"
                name="role"
                defaultValue={props.user.roleId}
                required
                onChange={handleSelectChange}
                style={{ width: "100%" }}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Pædagog</MenuItem>
              </Select>
            </Grid>
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="email"
                label="Email"
                id="email"
                onChange={handleChange}
                defaultValue={props.user.email}
                style={{ width: "95%", marginLeft: "10px" }}
              />
            </Grid>
            <Grid item md="6">
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
            </Grid>
            {/*<Grid item md="6">
              <TextField
                margin="normal"
                required
                name="password"
                defaultValue={props.user.password}
                label="Kodeord"
                id="password"
                onChange={handleChange}
                style={{ width: "95%", marginLeft: "10px" }}
              />
  </Grid>*/}
            <Grid item md="12">
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
                Gem medarbejder
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
