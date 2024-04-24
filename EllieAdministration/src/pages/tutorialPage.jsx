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
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Alarms1 from "../assets/Alarms1.png";
import Alarms2 from "../assets/Alarms2.png";
import Alarms3 from "../assets/Alarms3.png";

function TutorialPage() {
  return (
    <Grid
      container
      spacing={5}
      justifyContent="flex-start"
      direction="row"
      alignItems="flex-start"
      sx={{ overflow: "auto", height: "1000px" }}
    >
      <Grid item md={12}>
        <TopTitleComponent
          title="Vejledning"
          icon={<HelpCenterIcon fontSize="large" />}
          color={"#C3B1E1"}
        />
      </Grid>
      <Grid item md="1"></Grid>
      <Grid
        item
        md="10"
        marginTop={8}
        marginBottom={8}
        sx={{
          backgroundColor: "#fff",
          paddingBottom: "100px",
          paddingTop: "50px",
        }}
      >
        <Grid>
          <img src={Alarms1} width={1400} />
          <img src={Alarms2} width={1400} />
          <img src={Alarms3} width={1400} />
        </Grid>
      </Grid>
      <Grid item md="1"></Grid>
    </Grid>
  );
}

export default TutorialPage;
