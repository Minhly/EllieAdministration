import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useLoggedInStore } from "../zustandStore";
import EventNoteIcon from "@mui/icons-material/EventNote";

function createData(
  id,
  firstName,
  lastName,
  active,
  name,
  activateAlarm,
  description,
  image
) {
  return {
    id,
    firstName,
    lastName,
    active,
    name,
    activateAlarm,
    description,
    image,
  };
}

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
export default function UserAlarmsModal(props) {
  const [userAlarms, SetUserAlarms] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const bearerToken = useLoggedInStore((state) => state.bearerToken);

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const url =
    "https://deep-wealthy-roughy.ngrok-free.app/UserAlarmRelation/GetAlarmsByUserId/id?id=" +
    props.user.id;

  console.log(url);
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        console.log(res.data);
        SetUserAlarms(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  /*
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
        var updatedList = [...users];
        updatedList = updatedList.filter((item) => {
          return (
            (item.email || "").toLowerCase().indexOf(query.toLowerCase()) !== -1
          );
        });
        setFilteredList(updatedList);
      };
    */
  createData(userAlarms);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<EventNoteIcon color={"success"} />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate>
          <Typography variant="h5">
            {props.user.firstName} {props.user.lastName}
          </Typography>
          <Grid container md="12">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
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
                      Titel
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
                      Alarm ringer
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userAlarms.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.activatingTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
