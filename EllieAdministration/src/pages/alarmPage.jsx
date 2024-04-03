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
  
    /*   const config = {
        headers: {
          "ngrok-skip-browser-warning": 1,
          Authorization: `Bearer ${bearerToken}`,
        },
      }; */
  
    /*   const url = "";
      useEffect(() => {
        axios
          .get(url, config)
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => console.log(err));
      }, []); */
  
    useEffect(() => {
      setAlarms([
        {
          id: 1,
          name: "Vitamin X",
          activateAlarm: "24/04/24-00:00:00",
          description: "such a sexy alarm",
          image: "hihihoho",
        },
        {
          id: 2,
          name: "Panodil D",
          activateAlarm: "26/04/24-00:00:00",
          description: "i totally agree",
          image: "hihigigi",
        },
      ]);
    }, []);
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
          <CreateAlarmModal />
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
                      {row.image}
                    </TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.activateAlarm}</TableCell>
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
  
  export default AlarmPage;
  