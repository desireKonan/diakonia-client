import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box } from '@mui/material';
import { IconGridDots } from '@tabler/icons';
import DashboardCard from 'src/_ui/components/shared/DashboardCard';
import PropTypes from 'prop-types';

const PersonsOverview = ({ labels, colors, series }) => {
  // chart color
  const theme = useTheme();
  const textColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : '#2A3547';
  const _series = Object.values(series);

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
    labels: labels,
    colors: colors,
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
              label: Object.values(_series)
                        .reduce((acc, value) => acc + value, 0),
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

  return (
    <DashboardCard title="Personnes presentes dans une assemblee" subtitle="Pour l'assemblee">
      <>
        <Box mt={3}>
          <Chart
            options={optionscolumnchart}
            series={_series}
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
                { series['adult_count'] + series['child_count'] }
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Membres
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
                { series['visitor_count'] + series['guest_count'] }
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Visiteurs
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </>
    </DashboardCard>
  );
};

PersonsOverview.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired),
  colors: PropTypes.arrayOf(PropTypes.string.isRequired),
  series: PropTypes.arrayOf({
    name: PropTypes.string,
    value: PropTypes.number.isRequired 
  })
};

export default PersonsOverview;
