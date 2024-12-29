import React, { useState, useEffect } from 'react';
import { Paper, Stack, Typography, Button } from '@mui/material';
import ReportsChart from './ReportsChart'; 
import dayjs from 'dayjs';
import { reportTaskFetch } from "../../../api/task";

const ReportsChartContainer = () => {
  const [data, setData] = useState<number[]>([]);
  const [weekOffset, setWeekOffset] = useState(-1);

  const getWeekLabel = (offset: number) => {
    const startOfWeek = dayjs().add(offset, 'week').startOf('week').add(1, 'days'); 
    const endOfWeek = startOfWeek.add(6, 'days'); 
    return `${startOfWeek.format('D/MM')} - ${endOfWeek.format('D/MM')}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startOfWeek = dayjs().add(weekOffset, 'week').startOf('week').add(2, 'days');
        const endOfWeek = startOfWeek.add(6, 'days');
        const response = await reportTaskFetch(startOfWeek.unix(), endOfWeek.unix());
        const data = response.data.map(res => {
          return res.record_count;
        })
        setData(data); 
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [weekOffset]);

  return (
    <Paper
      sx={{
        pr: 0,
        height: 410,
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 2,
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            fontSize: '1.2rem',
          }}
        >
          Reports
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Button
            onClick={() => setWeekOffset((prev) => prev - 1)} 
            sx={{
              textTransform: 'none',
              px: 2,
              backgroundColor: 'rgb(80, 81, 249)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgb(123, 123, 255)',
              },
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ width: '14px', color: 'white' }}>
              <path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
            </svg>
          </Button>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              width: '120px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {getWeekLabel(weekOffset)} {/* Display the current week range */}
          </Typography>
          <Button
            onClick={() => setWeekOffset((prev) => prev + 1)} 
            sx={{
              textTransform: 'none',
              px: 2,
              width: '14px',
              backgroundColor: 'rgb(80, 81, 249)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgb(123, 123, 255)',
              },
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ width: '14px', color: 'white' }}>
              <path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
            </svg>
          </Button>
        </Stack>
      </Stack>

      {/* Chart */}
      <ReportsChart
        data={data}
        sx={{
          height: '320px !important',
          padding: '16px',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
          borderRadius: '0 0 16px 16px',
        }}
      />
    </Paper>
  );
};

export default ReportsChartContainer;
