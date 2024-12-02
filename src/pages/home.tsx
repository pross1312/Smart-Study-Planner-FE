import { Button } from '@mui/material';
import { useAuth } from "../component/AuthContext";

export default function() {
  const authContext = useAuth();
  const logout = () => {
    authContext.setAccessToken(null);
  };

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Home Page</h1>
      <Button onClick={logout} variant="contained" color="primary" fullWidth>
        Logout
      </Button>
    </div>
  );
};
