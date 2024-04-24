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
import { useLoggedInStore } from "../zustandStore";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DescriptionIcon from "@mui/icons-material/Description";
import CreateNoteModal from "./createNoteModal";
import EditNoteModal from "./editNoteModal";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function UserNotesModal(props) {
  const [notes, SetNotes] = useState([]);
  const bearerToken = useLoggedInStore((state) => state.bearerToken);

  const config = {
    headers: {
      "ngrok-skip-browser-warning": 1,
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  const url =
    "https://totally-helpful-krill.ngrok-free.app/Note/GetNoteByUserId/id?id=" +
    props.user.id;

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        SetNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  createData(notes);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<DescriptionIcon color={"success"} />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate>
          <CreateNoteModal user={props.user} />
          <Typography variant="h4" sx={{ color: "#6c546f" }}>
            {props.user.firstName} {props.user.lastName}
          </Typography>
          <Grid container md="12">
            {notes.map((row) => (
              <>
                <Grid
                  item
                  key={row.id}
                  md="12"
                  sx={{
                    backgroundColor: "#ece6ff",
                    borderRadius: "7px",
                    borderStyle: "dashed",
                  }}
                  border={1}
                  padding={2}
                  margin={2}
                >
                  <EditNoteModal note={row} />
                  <Typography variant="h6">Note Id: {row.id}</Typography>
                  <Typography>{row.text}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
