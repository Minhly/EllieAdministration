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

  //const bearerToken = useLoggedInStore((state) => state.bearerToken);

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      //Authorization: `Bearer ${bearerToken}`,
    },
  };

  const url = "https://deep-wealthy-roughy.ngrok-free.app/user";
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
        <TopTitleComponent title="Brugere" />
      </Grid>
      <Grid item md={2}></Grid>
      <Grid item md={8}>
        <CreateUserModal />
        <div
          sx={(theme) => ({
            background: theme.palette.greenx.main,
          })}
          style={{
            width: "100%",
            height: "30px",
            backgroundColor: "#85B585",
            borderTopRightRadius: "5px",
            borderTopLeftRadius: "5px",
          }}
        ></div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
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
                  Fornavn
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Efternavn
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Værelse
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Point
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Kontaktperson
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#5e90c1" }}
                >
                  Aktiv
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">{row.room}</TableCell>
                  <TableCell align="left">{row.points}</TableCell>
                  <TableCell align="left">{row.contactPersonId}</TableCell>
                  <TableCell align="left">{row.active}</TableCell>
                  <TableCell align="left">
                    <EditUserModal user={row} />
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
