import { Grid, Typography } from "@mui/material";

function TopTitleComponent(props) {
  return (
    <Grid
      container
      spacing={4}
      justifyContent="flex-start"
      direction="row"
      alignItems="flex-start"
    >
      <Grid item md={1}></Grid>
      <Grid item md={10} borderBottom={2} borderColor="#85b585">
        <Typography
          color={props.color}
          variant="h2"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {props.icon}
          {props.title}
        </Typography>
      </Grid>
      <Grid item md={1}></Grid>
    </Grid>
  );
}

export default TopTitleComponent;
