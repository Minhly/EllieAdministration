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
/*import Alarms1 from "../assets/alarmsx1.png";
import Alarms2 from "../assets/alarmsx2.png";
import Alarms3 from "../assets/alarmsx3.png";
*/
import Alarms1 from "../assets/alarmsx1.png";
import Alarms2 from "../assets/alarmsx2.png";

function TutorialPage() {
  return (
    <Grid
      container
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
      <Grid item md="2"></Grid>
      <Grid
        item
        md="8"
        marginTop={8}
        marginBottom={8}
        sx={{
          backgroundColor: "#fff",
          paddingBottom: "100px",
          paddingTop: "50px",
        }}
      >
        <Grid md="12">
          <Typography variant="h3" sx={{ marginLeft: "100px" }}>
            Alarm liste
          </Typography>
          <img src={Alarms1} width={800} />
          <Grid
            item
            paddingBottom={4}
            md="12"
            sx={{ textAlign: "center", width: "700px", margin: "auto" }}
          >
            <Typography>
              1. Her ses en liste med alle alarmer, typen af alarm, titel,
              beskrivelse, hvilken beboer alarmen tilhører og hvornår den skal
              ringe. <br></br>2. Man har muligheden for at filtrere på listen af
              alarmer, ved hjælp af de her 3 søgefelter, på den ene kan man
              filtrere efter en brugers for -og efternavn, på den anden kan man
              filtrere efter titlen på en alarm og på den sidste kan man
              filtrere på tidspunktet alarmen ringer. <br></br>3. Hvis man
              ønsker at oprette en alarm, skal man trykke på “Opret alarm”
              knappen.
            </Typography>
          </Grid>
          <Typography variant="h3" sx={{ marginLeft: "100px" }}>
            Oprettelse af alarm
          </Typography>
          <img src={Alarms2} width={800} />
          <Grid
            item
            md="12"
            paddingBottom={4}
            sx={{
              textAlign: "center",
              width: "700px",
              margin: "auto",
            }}
          >
            <Typography>
              1. Titlen på alarmen. <br></br>2. Beskrivelsen på alarmen.{" "}
              <br></br>3. Typen på alarmen f.eks Træning, frokost eller medicin.{" "}
              <br></br>4. Tidspunktet på alarmen, her kan man vælge om alarmen
              skal ringe dagligt, ugenligt eller et specifikt dato og tid én
              gang. <br></br>5.Her kan man vælge hvem alarmen skal sættes til,
              ud fra listen af beboere, eller vælge at sætte alarmen for alle
              beboere.
            </Typography>
          </Grid>
          <Typography variant="h3" sx={{ marginLeft: "100px" }}>
            Redigering af alarm
          </Typography>
          <img src={Alarms2} width={800} />
          <Grid
            item
            md="12"
            sx={{ textAlign: "center", width: "700px", margin: "auto" }}
          >
            <Typography>
              Når en alarm er oprettet, kan man nu gå ind og redigere alarmen
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md="2"></Grid>
    </Grid>
  );
}

export default TutorialPage;
