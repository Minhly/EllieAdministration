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
//import { useLoggedInStore } from "../components/zustandStore";

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

function UserAlarmsModal() {
  const [userAlarms, SetUserAlarms] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  //const bearerToken = useLoggedInStore((state) => state.bearerToken);
  const [betHistories, setBettingHistory] = useState([]);

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
  return (
    <>
      <TextField
        id="search-box"
        label="Filtrere efter email"
        //onChange={filterBySearch}
        style={{ marginBottom: "20px" }}
      />
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
                Brugernavn
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
                Email
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", color: "#5e90c1" }}
              >
                Aktiv
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
                <TableCell align="left">{row.activateAlarm}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.image}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserAlarmsModal;
