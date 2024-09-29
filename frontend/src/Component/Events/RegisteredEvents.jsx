import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Snackbar } from "@mui/material";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import "./RegisterdEvents.css";

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      const userId = localStorage.getItem("userId");

      console.log(userId);

      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(`events/registered-events/${userId}/`);
        setRegisteredEvents(response.data);
        const my_registered_events = localStorage.setItem(
          "my_registered_events",
          response.data.length
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching registered events:", error);
        setError("Failed to load registered events. Please try again later.");
      }
    };

    fetchRegisteredEvents();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: "center",
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: "center",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "grey",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "white", textAlign: "center" }}
      >
        Your Registered Events
      </Typography>

      {error && (
        <Snackbar
          open={!!error}
          message={error}
          autoHideDuration={6000}
          onClose={() => setError("")}
        />
      )}

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400, 
          overflowY: "auto", 
          overflowX: "auto",
          marginTop: 10,
          border: "5px solid black",
          outline: "4px solid white",
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Event Title</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Capacity</StyledTableCell>
              <StyledTableCell align="right">Registered At</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registeredEvents.length > 0 ? (
              registeredEvents.map(({ event, registered_at }) => (
                <StyledTableRow key={event.id}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontWeight: "bold" }}
                  >
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>
                      {event.title}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold" }}>
                    {event.description}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold" }}>
                    {new Date(event.date).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold" }}>
                    {event.capacity}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontWeight: "bold" }}>
                    {new Date(registered_at).toLocaleString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  You have not registered for any events yet.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RegisteredEvents;
