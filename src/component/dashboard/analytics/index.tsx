import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AnalyticsChart from './AnalyticsChart';
import { analyticTaskFetch } from "../../../api/task";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface AnalyticsItem {
  id: number;
  name: string;
  value: number;
}

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsItem[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analyticTaskFetch();

        const statusMap: { [key: string]: string } = {
          'Todo': 'TODO',
          'In Progress': 'IN PROGRESS',
          'Done': 'DONE',
          'Expired': 'EXPIRED',
        };

        const initialData = [
          { id: 1, name: 'Todo', value: 0 },
          { id: 2, name: 'In Progress', value: 0 },
          { id: 3, name: 'Done', value: 0 },
          { id: 4, name: 'Expired', value: 0 },
        ];

        const result = initialData.map(item => {
          const correspondingEntry = response.data.find(entry => {
            return entry.status === statusMap[item.name]
          });
          return correspondingEntry
            ? { ...item, value: parseInt(correspondingEntry.quantity, 10) }
            : item;
        });
        console.log(result)
        setAnalyticsData(result)

      } catch (error) {
        toast.error('Failed to fetch data: ' + error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ px: 0, height: 410 }}>
      <Stack mt={-0.5} px={3.75} alignItems="center" justifyContent="space-between">
        <Typography style={{fontSize: '18px', fontWeight: '600', marginBottom: '30px', marginTop: '10px'}} color="text.secondary">
          Analytics
        </Typography>
      </Stack>

      <AnalyticsChart data={analyticsData} sx={{ mt: -5.5, mx: 'auto', width: 500, height: '330px !important' }} />
    </Paper>
  );
};

export default Analytics;
