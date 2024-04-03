import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayOutlined";
import ellielogo from "../assets/Ellie2.png";
import GroupIcon from "@mui/icons-material/Group";
import BadgeIcon from "@mui/icons-material/Badge";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

function Sidebar2() {
  return (
    <>
      <div id="app" style={{ height: "100vh" }}>
        <Sidebar
          width="100%"
          backgroundColor="#C1E1C1"
          style={{
            height: "100%",
          }}
        >
          <Menu>
            <Grid
              item
              md={12}
              backgroundColor="#85B585"
              marginBottom={3}
              paddingTop={2}
              paddingBottom={2}
            >
              <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                <img
                  src={ellielogo}
                  alt="ellielogo"
                  style={{ width: "140px" }}
                />
              </Link>
            </Grid>
            <MenuItem
              component={<Link to="/pages/alarms" />}
              icon={<AccessAlarmIcon style={{ color: "#fff" }} />}
            >
              Alarmer
            </MenuItem>
            <MenuItem
              backgroundColor={"black"}
              component={<Link to="/pages/users" />}
              icon={<GroupIcon style={{ color: "#fff" }} />}
            >
              Brugere
            </MenuItem>
            <MenuItem
              component={<Link to="/pages/employees" />}
              icon={<BadgeIcon style={{ color: "#fff" }} />}
            >
              Medarbejdere
            </MenuItem>
            <MenuItem
              component={<Link to="/pages/tutorial" />}
              icon={<CalendarTodayIcon style={{ color: "#fff" }} />}
            >
              Vejledning
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

export default Sidebar2;
