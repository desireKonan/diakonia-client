import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box } from '@mui/material';
import { IconGridDots } from '@tabler/icons';
import DashboardCard from 'src/_ui/components/shared/DashboardCard';

const PersonsOverview = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const primarylight = theme.palette.primary.light;
  const textColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : '#2A3547';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",

      toolbar: {
        show: false,
      },
      height: 275,
    },
    labels: ["Profit", "Revenue", "Expance"],
    colors: [primary, primarylight, secondary],
    plotOptions: {
      pie: {
        
        donut: {
          size: '89%',
          background: 'transparent',

          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 7,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              color: textColor,
              fontSize: '20px',
              fontWeight: '600',
              label: '$500,458',
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [55, 55, 55];

  return (
    <DashboardCard title="Sales Overview" subtitle="Every month">
      <>
        <Box mt={3}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="275px"
          />
        </Box>

        <Stack direction="row" spacing={2} justifyContent="space-between" mt={7}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor="primary.light"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                color="primary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconGridDots width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="600">
                $23,450
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Profit
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              width={38}
              height={38}
              bgcolor="secondary.light"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                color="secondary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconGridDots width={22} />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="600">
                $23,450
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Expance
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </>
    </DashboardCard>
  );
};

// DiakoniaPaginationTable.propTypes = {
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//       align: PropTypes.oneOf(['left', 'center', 'right', 'justify', 'inherit']),
//       minWidth: PropTypes.number,
//       render: PropTypes.func,
//     })
//   ).isRequired,
//   data: PropTypes.array.isRequired,
//   totalCount: PropTypes.number.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
//   loading: PropTypes.bool,
//   error: PropTypes.string,
//   onPageChange: PropTypes.func.isRequired,
//   onRowsPerPageChange: PropTypes.func.isRequired,
//   rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
//   elevation: PropTypes.number,
//   stickyHeader: PropTypes.bool,
//   size: PropTypes.oneOf(['small', 'medium']),
//   sx: PropTypes.object,
// };

export default PersonsOverview;
