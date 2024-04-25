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
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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

dayjs.extend(utc);
dayjs.extend(timezone);

export default function EditAlarmModal(props) {
  const [alarmType, setAlarmType] = useState("");
  const [alarmTypeImg, setAlarmTypeImg] = useState("");
  const [dateValue, setDateValue] = useState(dayjs());
  const [checked, setChecked] = useState(props.alarm.active);
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

  dayjs.extend(utc);
  dayjs.extend(timezone);

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

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleCheckboxChange3 = (event) => {
    setDailyCheck(event.target.checked);
    setAlarmType(2);
  };

  const handleCheckboxChange2 = (event) => {
    setWeeklyCheck(event.target.checked);
    setAlarmType(3);
  };

  const handleSelectChange = (event) => {
    setAlarmTypeImg(event.target.value);
  };
  console.log(alarmType);
  function handleSubmit(e) {
    e.preventDefault();

    const alarmData = {
      id: props.alarm.id,
      name:
        data.name == null || data.name.length < 1
          ? props.alarm.name
          : data.name,
      imageUrl:
        alarmTypeImg == null || alarmTypeImg.length < 1
          ? props.alarm.imageUrl
          : alarmTypeImg.toString(),
      description:
        data.description == null || data.description.length < 1
          ? props.alarm.description
          : data.description,
      alarmTypeId:
        alarmType == null || alarmType < 1
          ? props.alarm.alarmTypeId
          : !dailyCheck && !weeklyCheck
          ? 1
          : alarmType,
      activatingTime:
        dateValue == null ||
        timeValue == null ||
        dateValue.length < 1 ||
        timeValue.length < 1
          ? props.alarm.activatingTime
          : !dailyCheck && !weeklyCheck
          ? dateValue
          : timeValue,
    };
    console.log(alarmData);

    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .put(
        "https://totally-helpful-krill.ngrok-free.app/alarm?id=" +
          props.alarm.id,
        alarmData,
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
            <Grid item md="12">
              <InputLabel id="imageId">Alarm type</InputLabel>
              <Select
                id="imageId"
                name="imageId"
                required
                onChange={handleSelectChange}
                style={{ width: "100%" }}
              >
                <MenuItem value={1}>Medicin</MenuItem>
                <MenuItem value={2}>Morgenmad</MenuItem>
                <MenuItem value={3}>Frokost</MenuItem>
                <MenuItem value={4}>Aftensmad</MenuItem>
                <MenuItem value={5}>Terapi</MenuItem>
                <MenuItem value={6}>Træning</MenuItem>
                <MenuItem value={7}>Studér</MenuItem>
                <MenuItem value={8}>Andet</MenuItem>
              </Select>
            </Grid>
            {!dailyCheck && !weeklyCheck ? (
              <Grid item md={8} marginTop={2}>
                <MobileDateTimePicker
                  timezone={"UTC"}
                  label="Dag og tidspunkt for alarm"
                  disablePast={true}
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
                  timezone={"UTC"}
                  label="Tidspunkt for alarm"
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
            <Grid item md="6" marginTop={1}>
              <Typography style={{ marginLeft: "15px" }}>
                Alarm aktiv
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
