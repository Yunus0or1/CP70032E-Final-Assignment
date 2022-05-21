import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { formatAMPM } from "../../utility/formatAMPM";

import { useSelector } from "react-redux";
import {
  selectName,
  selectDateTime,
  selectDuration,
  selectVenues,
} from "../../state/createEventSlice";

export const ConfirmCreation = () => {
  const selectedVenues = useSelector(selectVenues);
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Summary
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <Item elevation={8}> */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              p: 1,
              fontSize: "20px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "10px",
              fontStyle: "italic",
              fontFamily: "Monospace",
            }}
            gutterBottom
          >
            {useSelector(selectName)}
          </Typography>
          {/* </Item> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={new Date(useSelector(selectDateTime)).toDateString()}
              />
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={formatAMPM(new Date(useSelector(selectDateTime)))}
                secondary={"For " + useSelector(selectDuration) + " minutes"}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List disablePadding>
            {Object.keys(selectedVenues).map((key) => {
              const venue = selectedVenues[key];
              return (
                <ListItem key={venue.title} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={venue.title}
                    secondary={venue.location}
                  />
                  {/* <Typography variant="body2">{venue.title}</Typography> */}
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </>
  );
};
