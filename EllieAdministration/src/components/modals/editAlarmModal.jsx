import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
//import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
//import "../layout/register.css";
import EditIcon from "@mui/icons-material/Edit";
//import { useLoggedInStore } from "../components/zustandStore";
import axios from "axios";

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

export default function EditAlarmModal(props) {
  const [checked, setChecked] = useState(props.alarm.active);
  const [date, setDate] = useState(new Date(props.alarm.dateOfBirth));
  const [alarmType, setAlarmType] = useState("");
  //const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [data, setData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    alarmtype: 0,
    activatingTime: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSelectChange = (event) => {
    setAlarmType(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const alarmData = {
      id: props.alarm.id,
      name:
        data.name == null || data.name.length < 1
          ? props.alarm.name
          : data.name,
      imageUrl:
        data.imageUrl == null || data.imageUrl.length < 1
          ? props.alarm.imageUrl
          : data.imageUrl,
      description:
        data.description == null || data.description.length < 1
          ? props.alarm.description
          : data.description,
      alarmType:
        data.alarmType == null || data.alarmType.length < 1
          ? props.alarm.alarmType
          : alarmType,
      activatingTime:
        data.activatingTime == null || data.activatingTime.length < 1
          ? props.alarm.activatingTime
          : data.activatingTime,
    };

    console.log(alarmData);

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        //Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .put(
        "https://deep-wealthy-roughy.ngrok-free.app/alarm?id=" + props.alarm.id,
        alarmData,
        config
      )
      .then((response) => {
        if (response.status === 200) {
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
      <Button onClick={handleOpen} startIcon={<EditIcon />} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h5">AlarmId: {props.alarm.id}</Typography>
          <Grid container md="12">
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="name"
                defaultValue={props.alarm.name}
                label="Alarm navn"
                onChange={handleChange}
                id="name"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="imageUrl"
                defaultValue={props.alarm.imageUrl}
                label="Billede"
                id="imageUrl"
                onChange={handleChange}
                style={{ width: "95%", marginLeft: "10px" }}
              />
            </Grid>
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="activatingTime"
                label="Alarm"
                onChange={handleChange}
                id="activatingTime"
                defaultValue={props.alarm.activatingTime}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md="6">
              <TextField
                margin="normal"
                required
                name="description"
                label="Beskrivelse"
                id="description"
                onChange={handleChange}
                defaultValue={props.alarm.description}
                style={{ width: "95%", marginLeft: "10px" }}
              />
            </Grid>
            <Grid item md="12">
              <InputLabel id="imageId">Alarm type</InputLabel>
              <Select
                id="imageId"
                name="imageId"
                defaultValue={props.alarm.alarmTypeId}
                onChange={handleSelectChange}
                style={{ width: "100%" }}
              >
                <MenuItem value={1}>Specifik dato og tid</MenuItem>
                <MenuItem value={2}>Daglig</MenuItem>
                <MenuItem value={3}>Ugentlig</MenuItem>
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
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  backgroundColor: "#5e90c1",
                }}
              >
                Gem alarm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
