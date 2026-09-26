import { Alert, Box } from "@mui/material";

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <Box sx={{ marginTop: 2 }}>
      <Alert severity="success">
        {message}
      </Alert>
    </Box>
  );
};

export default Notification;