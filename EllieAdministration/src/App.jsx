import "./App.css";
import "./index.css";
import { CssBaseline, Grid, ThemeProvider, Typography } from "@mui/material";
import theme from "./style/theme.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditUser from "./pages/userPage.jsx";
import Sidebar2 from "./layout/sidebar.jsx";
import EmployeePage from "./pages/employeePage.jsx";
import AlarmPage from "./pages/alarmPage.jsx";
import ellie from "../src/assets/Elliebg3.png";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoginPage from "./pages/loginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import PageNotFound from "./pages/pageNotFound.jsx";
import { useLoggedInStore } from "./components/zustandStore.jsx";

function App() {
  const isLoggedIn = useLoggedInStore((state) => state.isLoggedIn);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div
            style={{
              backgroundImage: `url(${ellie})`,
            }}
          >
            <Grid container>
              {isLoggedIn ? (
                <Grid item md={2} sm={3}>
                  <Sidebar2 />
                </Grid>
              ) : null}
              <Grid item md={10} marginTop={4}>
                <CssBaseline />
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/pages/employees" element={<EmployeePage />} />
                  <Route path="/pages/users" element={<EditUser />} />
                  <Route path="/pages/alarms" element={<AlarmPage />} />
                  <Route path="/pages/register" element={<RegisterPage />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Grid>
            </Grid>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
