import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TopTitleComponent from "../layout/topTitleComponent";
import { useEffect, useState } from "react";
import EditUserModal from "../components/modals/editUserModal";
import CreateAlarmModal from "../components/modals/createAlarmModal";
import axios from "axios";
import EditAlarmModal from "../components/modals/editAlarmModal";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useLoggedInStore } from "../components/zustandStore";
import IconTextField from "../components/modals/iconTextField";
import GroupIcon from "@mui/icons-material/Group";
import SubtitlesIcon from "@mui/icons-material/Subtitles";

function createData(id, name, activateAlarm, description, image) {
  return {
    id,
    name,
    activateAlarm,
    description,
    image,
  };
}

function AlarmPage() {
  const [alarms, setAlarms] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const bearerToken = useLoggedInStore((state) => state.bearerToken);

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const url = "https://totally-helpful-krill.ngrok-free.app/alarm/WithUsers";
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setAlarms(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setFilteredList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...alarms];
    updatedList = updatedList.filter((item) => {
      return (
        (item.user.lastName || "").toLowerCase().includes(query) ||
        (item.user.firstName || "").toLowerCase().includes(query)
      );
    });
    setFilteredList(updatedList);
  };

  const filterBySearchTitle = (event) => {
    const query = event.target.value;
    var updatedList = [...alarms];
    updatedList = updatedList.filter((item) => {
      return (
        (item.name || "").toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  const filterBySearchAlarm = (event) => {
    const query = event.target.value;
    var updatedList = [...alarms];
    updatedList = updatedList.filter((item) => {
      return (
        (item.activatingTime || "")
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  createData(alarms);
  return (
    <Grid
      container
      spacing={4}
      justifyContent="flex-start"
      direction="row"
      alignItems="flex-start"
    >
      <Grid item md={12}>
        <TopTitleComponent
          title="Alarmer"
          icon={<AccessAlarmIcon fontSize="large" />}
          color={"#85B585"}
        />
      </Grid>
      <Grid item md={2}></Grid>
      <Grid item md={8}>
        <div
          sx={(theme) => ({
            background: theme.palette.greenx.main,
          })}
          style={{
            width: "100%",
            height: "70px",
            backgroundColor: "#85B585",
            borderTopRightRadius: "5px",
            borderTopLeftRadius: "5px",
          }}
        >
          <CreateAlarmModal />
        </div>
        <TableContainer style={{ maxHeight: 800 }} component={Paper}>
          <Grid
            container
            md="12"
            alignContent={"center"}
            alignItems={"center"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <IconTextField
              id="search-box"
              label="Filtrere efter Beboer"
              onChange={filterBySearch}
              style={{
                marginBottom: "20px",
                float: "left",
                marginLeft: "50px",
                marginTop: "20px",
              }}
              iconStart={<GroupIcon />}
            />
            <IconTextField
              id="search-box"
              label="Filtrere efter Titler"
              onChange={filterBySearchTitle}
              style={{
                marginBottom: "20px",
                float: "left",
                marginLeft: "50px",
                marginTop: "20px",
              }}
              iconStart={<SubtitlesIcon />}
            />
            <IconTextField
              id="search-box"
              label="Filtrere efter Alarm tid"
              onChange={filterBySearchAlarm}
              style={{
                marginBottom: "20px",
                float: "left",
                marginLeft: "50px",
                marginTop: "20px",
              }}
              iconStart={<AccessAlarmIcon />}
            />
          </Grid>

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5", height: "35px" }}>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#85B585" }}
                ></TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#85B585" }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#85B585" }}
                >
                  Title
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#85B585" }}
                >
                  Beskrivelse
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#85B585" }}
                >
                  Beboer
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#85B585" }}
                >
                  Alarm ringer
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={row.imageUrl} width={"50px"} />
                  </TableCell>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">
                    {row.name.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">
                    {row.description.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">
                    {row.user.firstName?.toString().toLowerCase()}{" "}
                    {row.user.lastName?.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">{row.activatingTime}</TableCell>
                  <TableCell align="left">
                    <EditAlarmModal alarm={row} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}

export default AlarmPage;
