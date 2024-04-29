import { Button, Container, Grid, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayOutlined";
import ellielogo from "../assets/Ellie2.png";
import GroupIcon from "@mui/icons-material/Group";
import BadgeIcon from "@mui/icons-material/Badge";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useLoggedInStore } from "../components/zustandStore";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

function Sidebar2() {
  const setIsLoggedIn = useLoggedInStore((state) => state.setIsLoggedIn);
  const setBearerToken = useLoggedInStore((state) => state.setBearerToken);
  const setUserRole = useLoggedInStore((state) => state.setUserRole);
  const setUserEmail = useLoggedInStore((state) => state.setUserEmail);
  const userRole = useLoggedInStore((state) => state.userRole);
  const email = useLoggedInStore((state) => state.email);
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
    setIsLoggedIn(false);
    setBearerToken("");
    setUserRole("");
    setUserEmail("");
  };

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
              <Link
                to="/pages/alarms"
                style={{ textDecoration: "none", color: "#fff" }}
              >
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
            {userRole == "Administrator" ? (
              <MenuItem
                component={<Link to="/pages/employees" />}
                icon={<BadgeIcon style={{ color: "#fff" }} />}
              >
                Medarbejdere
              </MenuItem>
            ) : null}
            <MenuItem
              component={<Link to="/pages/tutorial" />}
              icon={<HelpCenterIcon style={{ color: "#fff" }} />}
            >
              Vejledning
            </MenuItem>
          </Menu>
          <Grid md={12}>
            <Typography
              style={{
                position: "absolute",
                bottom: 50,
                textAlign: "center",
                right: 0,
                left: 0,
                textDecoration: "none",
                fontWeight: "bold",
                color: "#85B585",
              }}
            >
              Velkommen {email}
            </Typography>
          </Grid>
          <Button
            variant="contained"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              marginBottom: "8px",
              width: "100px",
              left: "35%",
              textDecoration: "none",
              backgroundColor: "#C1E1F1",
              fontWeight: "bold",
              color: "#85B585",
            }}
            onClick={logOut}
          >
            Log ud
          </Button>
        </Sidebar>
      </div>
    </>
  );
}

export default Sidebar2;
