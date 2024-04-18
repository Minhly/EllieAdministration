import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, Route, redirect, useNavigate } from "react-router-dom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconTextField from "../components/modals/iconTextField";

function RegisterPage() {
  const [date, setDate] = useState(new Date("01/01/1999"));
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    phonenumber: "",
    address2: "",
    postalcode: "",
    username: "",
    dateOfBirth: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setIsDirty(true);
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
      email: data.email,
      phonenumber: data.phonenumber,
      username: data.username,
      dateOfBirth: date,
      address: {
        address1: data.address2,
        postalcode: data.postalcode,
      },
    };

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
      },
    };

    try {
      axios
        .post(
          "https://deep-wealthy-roughy.ngrok-free.app/User/CreateUser",
          userData,
          config
        )
        .then((response) => {
          if (response.status === 201) {
            console.log(response);
            navigate("/");
          } else {
            navigate("/pages/login");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container marginTop={25} marginBottom={20}>
      <Grid item md="3"></Grid>
      <Grid item md="6" padding={8} style={{ backgroundColor: "#fff" }}>
        <Box textAlign="center">
          <Typography
            marginBottom={4}
            variant="h3"
            style={{
              color: "#5e90c1",
              fontWeight: "bold",
            }}
          >
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid item md="12">
              <IconTextField
                sx={{ input: { color: "#5e90c1" } }}
                margin="normal"
                required
                fullWidth
                name="username"
                label="Brugernavn"
                onChange={handleChange}
                id="username"
                error={isDirty ? data.username.length === 0 : ""}
                helperText={data.username.length === 0 ? "Field is Empty" : ""}
                autoFocus
                iconStart={<PersonIcon sx={{ color: "#5e90c1" }} />}
              />
            </Grid>
            <Grid container md="12">
              <Grid item md="6">
                <IconTextField
                  sx={{ input: { color: "#5e90c1" } }}
                  margin="normal"
                  required
                  id="firstname"
                  label="Fornavn"
                  name="firstname"
                  fullWidth
                  onChange={handleChange}
                  error={isDirty ? data.firstname.length === 0 : ""}
                  helperText={
                    data.firstname.length === 0 ? "Field is empty" : ""
                  }
                  iconStart={<PersonIcon sx={{ color: "#5e90c1" }} />}
                />
              </Grid>

              <Grid item md="6">
                <IconTextField
                  sx={{ input: { color: "#5e90c1" } }}
                  margin="normal"
                  required
                  name="lastname"
                  label="Efternavn"
                  onChange={handleChange}
                  id="lastname"
                  style={{ width: "95%", marginLeft: "10px" }}
                  error={isDirty ? data.lastname.length === 0 : ""}
                  helperText={
                    data.lastname.length === 0 ? "Field is empty" : ""
                  }
                  iconStart={<PersonIcon sx={{ color: "#5e90c1" }} />}
                />
              </Grid>
            </Grid>

            <Grid item md="12">
              <IconTextField
                sx={{ input: { color: "#5e90c1" } }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Kodeord"
                type="password"
                onChange={handleChange}
                id="password"
                error={isDirty ? data.password.length === 0 : ""}
                helperText={data.password.length === 0 ? "Field is empty" : ""}
                iconStart={<KeyIcon sx={{ color: "#5e90c1" }} />}
              />
            </Grid>
            <Grid container md="12">
              <Grid item md="6">
                <IconTextField
                  sx={{ input: { color: "#5e90c1" } }}
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  id="email"
                  error={isDirty ? data.email.length === 0 : ""}
                  helperText={data.email.length === 0 ? "Field is empty" : ""}
                  iconStart={<AlternateEmailIcon sx={{ color: "#5e90c1" }} />}
                />
              </Grid>

              <Grid item md="6">
                <IconTextField
                  sx={{ input: { color: "#5e90c1" } }}
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  name="phonenumber"
                  label="Telefonnummer"
                  onChange={handleChange}
                  id="phonenumber"
                  style={{ width: "95%", marginLeft: "10px" }}
                  error={isDirty ? data.phonenumber.length === 0 : ""}
                  helperText={
                    data.phonenumber.length === 0 ? "Field is empty" : ""
                  }
                  iconStart={<LocalPhoneIcon sx={{ color: "#5e90c1" }} />}
                />
              </Grid>
            </Grid>

            {/*
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="dateOfBirth"
                  label="Fødselsdag"
                  onChange={handleChange}
                  id="dateOfBirth"
                  style={{ width: "45%", marginLeft: "10%" }}
                  error={data.dateOfBirth.length === 0}
                  helperText={
                      data.dateOfBirth.length === 0 ? "Field is empty" : ""
                  }
                />
                 */}
            <Grid container md="12">
              <Grid item md="6">
                <IconTextField
                  sx={{ input: { color: "#5e90c1" } }}
                  margin="normal"
                  required
                  name="postalcode"
                  label="Postnummer"
                  fullWidth
                  type="number"
                  onChange={handleChange}
                  id="postalcode"
                  error={isDirty ? data.postalcode.length === 0 : ""}
                  helperText={
                    data.postalcode.length === 0 ? "Field is empty" : ""
                  }
                  iconStart={<LocalShippingIcon sx={{ color: "#5e90c1" }} />}
                />
              </Grid>
            </Grid>
            <Grid item md="12">
              <IconTextField
                sx={{ input: { color: "#5e90c1" } }}
                margin="normal"
                required
                fullWidth
                name="address2"
                label="Adresse"
                onChange={handleChange}
                id="address2"
                error={isDirty ? data.address2.length === 0 : ""}
                helperText={data.address2.length === 0 ? "Field is empty" : ""}
                iconStart={<LocationOnIcon sx={{ color: "#5e90c1" }} />}
              />
            </Grid>
            <Grid item md="12">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<VpnKeyIcon />}
                sx={{
                  mt: 3,
                  mb: 2,
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  backgroundColor: "#5e90c1",
                }}
              >
                Registrere bruger
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item md="3"></Grid>
    </Grid>
  );
}

export default RegisterPage;
