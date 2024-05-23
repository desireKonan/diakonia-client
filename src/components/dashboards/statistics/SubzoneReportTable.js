import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
    Grid, 
    Typography, 
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    MenuItem,
    Stack,
    Button
} from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import useFetch from 'src/app/services/useFetch';
import { date, date2, MeetingType } from 'src/utils/utils';
import { useFormik } from 'formik';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { uniqueId } from 'lodash';


const SubzoneReportTable = ({ subzone }) => {
    const { data: subzones } = useFetch('/api/ville/subzones', []);

    const [subzoneReport, setSubzoneReport] = useState([]);

    const formik = useFormik({
        initialValues: {
            subzone: '',
            type: '',
            day: new Date(),
        },
        onSubmit: (values) => {
            getSubzoneReport(values);
        },
    });


    const getSubzoneReport = async(values) => {
        var subzoneReport = await httpAdapter.saveData(`api/subzone/statistics`, {
            subzone: values['subzone'],
            type: values['type'],
            day: values['day']
        });
        if(subzoneReport.error && subzoneReport.error != null) {
            console.log(`Erreur: ${subzoneReport.error}`);
            return;
        }
        setSubzoneReport(subzoneReport);
    }

    return (
        <DashboardCard
            title={`Tableaux des rapports de la sous-zone ${subzone}`}
            subtitle={`Tableaux des rapports de la sous-zone ${subzone}`}
        >
            <form onSubmit={formik.handleSubmit}>
                <Stack 
                    direction={'row'} 
                    spacing={{
                        xs: 1,
                        sm: 2
                    }}
                    alignItems={`flex-end`}
                    alignContent={"center"}
                    justifyContent={"center"}
                >
                    <Grid item xs={3} lg={3}>
                                <CustomFormLabel htmlFor="Sous zone">Sous zone</CustomFormLabel>
                                <CustomSelect
                                        labelId="subzone"
                                        id="subzone" 
                                        fullWidth
                                        name="subzone"
                                        size="large"
                                        value={formik.values.subzone}
                                        onChange={formik.handleChange}
                                >
                                    {
                                        subzones.map(subzone => 
                                            <MenuItem selected={subzone} value={subzone}> { subzone } </MenuItem>    
                                        )
                                    }
                                </CustomSelect>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                                <CustomFormLabel htmlFor="Sous zone">Type de rencontres</CustomFormLabel>
                                <CustomSelect
                                        labelId="meeting-type"
                                        id="meeting-type" 
                                        fullWidth
                                        name="type"
                                        size="large"
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                >
                                    {
                                        Object.keys(MeetingType).map(type => 
                                            <MenuItem selected={type} value={type}> { type } </MenuItem>    
                                        )
                                    }
                                </CustomSelect>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                            <CustomFormLabel htmlFor="day">Date recherché</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="day" 
                                    name="day"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                        '& .MuiSvgIcon-root': {
                                            width: 18,
                                            height: 18,
                                        },
                                        '& .MuiFormHelperText-root': {
                                            display: 'none',
                                        },
                                    }} />}
                                    placeholder="Entrez la date recherchée"
                                    value={formik.values.day}
                                    onChange={(newValue) => {
                                        var day = date2(newValue);
                                        console.log(day, newValue);
                                        formik.setFieldValue('day', day);
                                    }}
                                />
                            </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <Button variant="contained" color='primary' type="submit">
                            Rechercher
                        </Button>
                    </Grid>  
                </Stack>
            </form>
            
            <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TableContainer>
                            <Table
                                aria-label="simple table"
                                sx={{
                                    whiteSpace: "nowrap",
                                    mt: 2
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Assemblée
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Nombre d'adultes
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Nombre d'enfants
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Nombre d'invités
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Nombre de visiteurs
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Horaires (Debut - fin)
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        (subzoneReport.length !== 0) ? subzoneReport.map((subzoneR) => (
                                            <TableRow key={subzoneR.id}>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.assembly }
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.adult_count }
                                                    </Typography>
                                                </TableCell>  
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.child_count }
                                                    </Typography>
                                                </TableCell>                  
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.guest_count }
                                                    </Typography>
                                                </TableCell>        
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.visitor_count }
                                                    </Typography>
                                                </TableCell>  
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { `${subzoneR.start}  -   ${subzoneR.end}`  }
                                                    </Typography>
                                                </TableCell>  
                                            </TableRow>
                                        )) : (
                                            <TableRow key={`${uniqueId()}`}>
                                                <TableCell rowSpan={4}>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        Le rapport recherché pour la sous-zone et à la date recherchée n'existe pas !
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default SubzoneReportTable;
