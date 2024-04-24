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
import CreateEmployeeModal from "../components/modals/createEmployeeModal";
import EditEmployeeModal from "../components/modals/editEmployeeModal";
import axios from "axios";
import BadgeIcon from "@mui/icons-material/Badge";
import { useLoggedInStore } from "../components/zustandStore";

function createData(
  id,
  firstName,
  lastName,
  email,
  password,
  role,
  instituteId
) {
  return {
    id,
    firstName,
    lastName,
    email,
    password,
    role,
    instituteId,
  };
}

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const bearerToken = useLoggedInStore((state) => state.bearerToken);

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const url = "https://totally-helpful-krill.ngrok-free.app/employee";
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setEmployees(res.data);
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
    var updatedList = [...employees];
    updatedList = updatedList.filter((item) => {
      return (
        (item.lastName || "").toLowerCase().includes(query) ||
        (item.firstName || "").toLowerCase().includes(query)
      );
    });
    setFilteredList(updatedList);
  };

  const filterBySearchEmail = (event) => {
    const query = event.target.value;
    var updatedList = [...employees];
    updatedList = updatedList.filter((item) => {
      return (
        (item.email || "").toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  createData(employees);
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
          title="Medarbejdere"
          icon={<BadgeIcon fontSize="large" />}
          color={"#b2cbde"}
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
            backgroundColor: "#b2cbde",
            borderTopRightRadius: "5px",
            borderTopLeftRadius: "5px",
          }}
        >
          <CreateEmployeeModal />
        </div>
        <TableContainer style={{ maxHeight: 800 }} component={Paper}>
          <TextField
            id="search-box"
            label="Filtrere efter Email"
            onChange={filterBySearchEmail}
            style={{
              marginBottom: "20px",
              float: "left",
              marginLeft: "50px",
              marginTop: "20px",
            }}
          />
          <TextField
            id="search-box"
            label="Filtrere efter For/Efternavn"
            onChange={filterBySearch}
            style={{
              marginBottom: "20px",
              float: "left",
              marginLeft: "50px",
              marginTop: "20px",
            }}
          />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5", height: "35px" }}>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#304674" }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#304674" }}
                >
                  Fornavn
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#304674" }}
                >
                  Efternavn
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#304674" }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#304674" }}
                >
                  Rolle
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#304674" }}
                >
                  Institut
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", color: "#304674" }}
                >
                  Aktiv
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
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    {row.firstName.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">
                    {row.lastName.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">
                    {row.email.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">
                    {row.roleId == 1 ? "administrator" : "pædagog"}
                  </TableCell>
                  <TableCell align="left">
                    {row.institute.name.toString().toLowerCase()}
                  </TableCell>
                  <TableCell align="left">
                    {row.active.toString() == "true" ? "ja" : "nej"}
                  </TableCell>
                  <TableCell align="left">
                    <EditEmployeeModal user={row} />
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

export default EmployeePage;
