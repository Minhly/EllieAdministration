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
import CreateUserModal from "../components/modals/createUserModal";
import axios from "axios";
import UserAlarmsModal from "../components/modals/userAlarmsModal";
import { useLoggedInStore } from "../components/zustandStore";
import GroupIcon from "@mui/icons-material/Group";
import UserNotesModal from "../components/modals/userNotesModal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import IconTextField from "../components/modals/iconTextField";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

function createData(
  id,
  firstName,
  lastName,
  room,
  active,
  points,
  contactPersonId
) {
  return {
    id,
    firstName,
    lastName,
    room,
    active,
    points,
    contactPersonId,
  };
}

function EditUser() {
  const [users, setUsers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const bearerToken = useLoggedInStore((state) => state.bearerToken);

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
        (item.lastName || "").toLowerCase().includes(query) ||
        (item.firstName || "").toLowerCase().includes(query)
      );
    });
    setFilteredList(updatedList);
  };

  const filterBySearchRoom = (event) => {
    const query = event.target.value;
    var updatedList = [...users];
    updatedList = updatedList.filter((item) => {
      return (
        (item.rooms[0].name || "")
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  createData(users);
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
          title="Brugere"
          icon={<GroupIcon fontSize="large" />}
          color={"#C3B1E1"}
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
            backgroundColor: "#C3B1E1",
            borderTopRightRadius: "5px",
            borderTopLeftRadius: "5px",
          }}
        >
          <CreateUserModal />
        </div>
        <TableContainer style={{ maxHeight: 800 }} component={Paper}>
          <IconTextField
            id="search-box"
            label="Filtrere efter For/Efternavn"
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
            label="Filtrere efter Værelse"
            onChange={filterBySearchRoom}
            style={{
              marginBottom: "20px",
              float: "left",
              marginLeft: "50px",
              marginTop: "20px",
            }}
            iconStart={<MeetingRoomIcon />}
          />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5", height: "35px" }}>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                ></TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Fornavn
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Efternavn
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Værelse
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Point
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Kontaktperson
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Aktiv
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Alarmer
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Noter
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#6c546f" }}
                >
                  Rediger
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <ListItem key={row.id} disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={row.firstName}
                          src={`/static/images/avatar/1.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText id={row.id} />
                    </ListItemButton>
                  </ListItem>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    {row.firstName.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">
                    {row.lastName.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">
                    {row.rooms[0].name.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">{row.points}</TableCell>
                  <TableCell align="left">
                    {row.contactPerson.firstName.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">
                    {row.active.toString() == "true" ? "ja" : "nej"}
                  </TableCell>
                  <TableCell align="left">
                    <UserAlarmsModal user={row} />
                  </TableCell>
                  <TableCell align="left">
                    <UserNotesModal user={row} />
                  </TableCell>
                  <TableCell align="left">
                    <EditUserModal user={row} setUsers={setUsers} />
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

export default EditUser;
