import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import dayjs from "dayjs";
import {
  CalendarIcon,
  DateTimePicker,
  MobileDateTimePicker,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { useLoggedInStore } from "../zustandStore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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

function createData(id, firstName, lastName, age) {
  return {
    id,
    firstName,
    lastName,
    age,
  };
}

export default function CreateAlarmModal() {
  const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [dateValue, setDateValue] = useState(dayjs());
  const [timeValue, setTimeValue] = useState(dayjs());
  const [checked, setChecked] = useState([]);
  const [dailyCheck, setDailyCheck] = useState(false);
  const [weeklyCheck, setWeeklyCheck] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [alarmType, setAlarmType] = useState("");
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    imageId: "",
    dateValue: "",
    usersToSetAlarmFor: [],
  });

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const handleCheckboxChange = (event) => {
    setDailyCheck(event.target.checked);
  };

  const handleCheckboxChange2 = (event) => {
    setWeeklyCheck(event.target.checked);
  };

  const handleCheckboxChange3 = (event) => {
    setChecked4(event.target.checked);
  };

  const handleSelectChange = (event) => {
    setAlarmType(event.target.value);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const url = "https://totally-helpful-krill.ngrok-free.app/user";
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setUsers(res.data);
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

  function handleSubmit(e) {
    e.preventDefault();
    const alarmData = {
      name: data.name,
      activatingTime: !dailyCheck && !weeklyCheck ? dateValue : timeValue,
      description: data.description,
      imageUrl: alarmType.toString(),
      alarmTypeId: !dailyCheck && !weeklyCheck ? 1 : dailyCheck ? 2 : 3,
      active: true,
      userIds: checked,
      isAllUsersChecked: checked4,
    };
    console.log(alarmData);
    const config = {
      headers: {
        "ngrok-skip-browser-warning": 1,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    axios
      .post(
        "https://totally-helpful-krill.ngrok-free.app/alarm",
        alarmData,
        config
      )
      .then((response) => {
        if (response.status === 201) {
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
      <Button
        style={{
          marginTop: "10px",
          color: "green",
          fontWeight: "bold",
          border: "solid 2px",
          float: "right",
          marginRight: "20px",
          backgroundColor: "#C1E1C1",
        }}
        size="large"
        onClick={handleOpen}
        startIcon={<AddBoxIcon />}
      >
        Opret alarm
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography variant="h5">Opret alarm</Typography>
          <Grid container md={12} spacing={2}>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                name="name"
                label="Alarm navn"
                id="name"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                id="description"
                name="description"
                onChange={handleChange}
                label="Beskrivelse"
                multiline
                required
                rows={5}
                fullWidth
              />
            </Grid>
            <Grid item md={12}>
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
                  onChange={handleCheckboxChange}
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
              <Typography>Sæt alarm for alle beboer</Typography>
              <Checkbox
                label="Aktiv"
                checked={checked4}
                size="large"
                style={{ marginLeft: "25px" }}
                onChange={handleCheckboxChange3}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
            {!checked4 ? (
              <Grid item md="10">
                <List
                  dense
                  sx={{
                    width: "100%",
                    maxWidth: 560,
                    borderLeft: 1,
                    padding: 2,
                    bgcolor: "background.paper",
                    maxHeight: 200,
                    overflow: "auto",
                  }}
                >
                  {users.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value.firstName}`;
                    return (
                      <ListItem
                        key={value.id}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            color="success"
                            onChange={handleToggle(value.id)}
                            checked={checked.indexOf(value.id) !== -1}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              alt={value.firstName}
                              src={`/static/images/avatar/1.jpg`}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            id={labelId}
                            primary={`${value.firstName} ${value.lastName}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            ) : null}
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
                Opret alarm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
