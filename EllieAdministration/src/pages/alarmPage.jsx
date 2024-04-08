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

  //const bearerToken = useLoggedInStore((state) => state.bearerToken);

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      //Authorization: `Bearer ${bearerToken}`,
    },
  };

  const url = "https://deep-wealthy-roughy.ngrok-free.app/alarm";
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setAlarms(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(alarms);
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
        <TopTitleComponent title="Alarmer" />
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Image
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Title
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Beskrivelse
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Alarm ringer
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alarms.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.imageUrl}
                  </TableCell>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
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
