import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import { useLoggedInStore } from "../zustandStore";
import axios from "axios";
import dayjs from "dayjs";
import {
  CalendarIcon,
  DateTimePicker,
  MobileDateTimePicker,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
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

export default function EditAlarmModal(props) {
  const [alarmType, setAlarmType] = useState("");
  const [dateValue, setDateValue] = useState(dayjs());
  const [timeValue, setTimeValue] = useState(dayjs());
  const [dailyCheck, setDailyCheck] = useState(false);
  const [weeklyCheck, setWeeklyCheck] = useState(false);
  const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [data, setData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    alarmTypeId: "",
    activatingTime: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    if (props.alarm.alarmTypeId == 2) {
      setDailyCheck(true);
    } else if (props.alarm.alarmTypeId == 3) {
      setWeeklyCheck(true);
    }
  }, []);

  const handleCheckboxChange3 = (event) => {
    setDailyCheck(event.target.checked);
    setAlarmType(2);
  };

  const handleCheckboxChange2 = (event) => {
    setWeeklyCheck(event.target.checked);
    setAlarmType(3);
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
      alarmTypeId:
        data.alarmTypeId == null || data.alarmTypeId.length < 1
          ? props.alarm.alarmTypeId
          : !dailyCheck && !weeklyCheck
          ? 1
          : alarmType,
      activatingTime:
        data.activatingTime == null || data.activatingTime.length < 1
          ? props.alarm.activatingTime
          : !dailyCheck && !weeklyCheck
          ? dateValue
          : timeValue,
    };

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        Authorization: `Bearer ${bearerToken}`,
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
      <Button onClick={handleOpen} startIcon={<EditIcon color={"success"} />} />
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
            {!dailyCheck && !weeklyCheck ? (
              <Grid item md={8} marginTop={2}>
                <MobileDateTimePicker
                  label="Dag og tidspunkt for alarm"
                  disablePast={true}
                  required
                  ampm={false}
                  defaultValue={dayjs(props.alarm.activatingTime)}
                  closeOnSelect={true}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        endAdornment: (
                          <InputAdornment
                            sx={{
                              color: "#979797",
                            }}
                            position="end"
                          >
                            <CalendarIcon />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                  onChange={(newValue) => setDateValue(newValue)}
                />
              </Grid>
            ) : null}
            {dailyCheck || weeklyCheck ? (
              <Grid item md={8} marginTop={2}>
                <MobileTimePicker
                  label="Tidspunkt for alarm"
                  required
                  defaultValue={dayjs(props.alarm.activatingTime)}
                  ampm={false}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        endAdornment: (
                          <InputAdornment
                            sx={{
                              color: "#979797",
                            }}
                            position="end"
                          >
                            <CalendarIcon />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                  onChange={(newValue) => setTimeValue(newValue)}
                />
              </Grid>
            ) : null}
            {!weeklyCheck ? (
              <Grid item md="2">
                <Typography style={{ marginLeft: "15px" }}>Dagligt</Typography>
                <Checkbox
                  label="Aktiv"
                  checked={dailyCheck}
                  size="large"
                  style={{ marginLeft: "25px" }}
                  onChange={handleCheckboxChange3}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
            ) : null}
            {!dailyCheck ? (
              <Grid item md="2">
                <Typography style={{ marginLeft: "15px" }}>
                  Ugentligt
                </Typography>
                <Checkbox
                  label="Aktiv"
                  checked={weeklyCheck}
                  size="large"
                  style={{ marginLeft: "25px" }}
                  onChange={handleCheckboxChange2}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
            ) : null}
            <Grid item md="12">
              <TextField
                margin="normal"
                name="description"
                label="Beskrivelse"
                id="description"
                multiline
                rows={5}
                fullWidth
                onChange={handleChange}
                defaultValue={props.alarm.description}
                style={{ width: "100%" }}
              />
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
                  backgroundColor: "#85B585",
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
