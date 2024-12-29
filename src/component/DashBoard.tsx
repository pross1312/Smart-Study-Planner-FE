import Grid from '@mui/material/Grid';
import Analytics from './dashboard/analytics';
import Reports from './dashboard/reports';

const Dashboard = () => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        padding: '30px',
        fontSize: '30px',
        fontWeight: '500',
        color: '#333'
      }}>Activity Overview</div>
      <Grid container px={3.75} spacing={3.75}>
        <Grid item xs={12} md={7}>
          <Reports />
        </Grid>
        <Grid item xs={12} md={5}>
          <Analytics />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;