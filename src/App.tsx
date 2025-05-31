import { CssBaseline, Container } from "@mui/material";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ReportProvider } from "./context/ReportContext";
import Dashboard from "./pages/Dashboard/DashboardPage";
import LoginPage from "./pages/Login/LoginPage";
import Loader from "./components/Loader/Loader";
import { GlobalStyle } from "./styles/global.styled";

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="lg">{user ? <Dashboard /> : <LoginPage />}</Container>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ReportProvider>
        <GlobalStyle />
        <CssBaseline />
        <AppContent />
      </ReportProvider>
    </AuthProvider>
  );
};

export default App;
