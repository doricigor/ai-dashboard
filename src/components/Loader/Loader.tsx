import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={"100vh"}
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
