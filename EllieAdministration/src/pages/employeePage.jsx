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

  const bearerToken = useLoggedInStore((state) => state.bearerToken);

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const url = "https://deep-wealthy-roughy.ngrok-free.app/employee";
  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
        <TableContainer style={{ maxHeight: 600 }} component={Paper}>
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
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    {row.roleId == 1 ? "Administrator" : "Pædagog"}
                  </TableCell>
                  <TableCell align="left">{row.institute.name}</TableCell>
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
