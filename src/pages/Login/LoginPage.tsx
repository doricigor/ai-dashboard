import { Button, Stack, Typography, Box } from "@mui/material";
import { getFakeUsers, useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const users = getFakeUsers();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Typography variant="h5">Select a user to log in</Typography>
      <Stack spacing={2} alignItems="center" mt={4}>
        {users.map((user) => (
          <Button key={user.id} variant="contained" onClick={() => login(user)}>
            Log in as {user.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default LoginPage;
