import { Box, Button, FormControlLabel, Grid, MenuItem, Stack, Tab } from "@mui/material";
import { useState } from "react";
import CustomFormLabel from "src/_ui/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/_ui/components/forms/theme-elements/CustomTextField";
import CustomSelect from "src/_ui/components/forms/theme-elements/CustomSelect";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CustomCheckbox from "src/_ui/components/forms/theme-elements/CustomCheckbox";
import moment from "moment/moment";
import { date, dateTime, SEX } from "src/app/services/utils";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useFormik } from "formik";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const submitMember = async(values, assemblyId) => {
    let member = {
        assemblyId: assemblyId,
        disciple: {
            id: values['memberId'],
            firstName: values['firstName'],
            lastName: values['lastName'],
            birthDate: moment(values['birthDate']).format("YYYY-MM-DD"),
            sex: values['sex'],
            discipleMaker: values['discipleMaker'],
            profession: values['profession'],
            active: values['active'],
        },
        infos: {
            position: values['position'],
            etablishedAt: values['etablishedAt'],
            leftAt: values['leftAt'],
        },
        isLeader: values['isLeader'],
        rejoinedAt: values['rejoinedAt'],
        leftAt: values['leftAt']
    };
    
    console.log('Member --->', member);
    let url = null;
    if(values['memberId'] === '') {
        url = 'api/assemblee/membre';
    } else {
        url = `api/assemblee/membre/update`;
    }
    var memberSaved = await httpAdapter.saveData(url, member);
    if(memberSaved.error && memberSaved.error != null) {
        toast(`Erreur: ${memberSaved.error}`);
        return;
    }
    window.location.reload(true);
}

const MembreForm = ({ membre, assemblyId }) => {
    const formik = useFormik({
        initialValues: {
            id: membre ? membre.id : '',
            memberId: membre ? membre.memberId : '',
            firstName: membre ? membre.firstName : '',
            lastName: membre ? membre.lastName : '',
            profession: membre ? membre.profession : '',
            sex: membre ? membre.sex : '',
            discipleMaker: membre ? membre.discipleMaker : '',
            birthDate: membre ? membre.birthDate : '',
            isLeader: membre ? membre.isLeader : false,
            active: membre ? membre.active : true,
            position: membre ? membre.position : 1,
            establishedAt: membre ? dateTime(membre.establishedAt) : null,
            rejoinedAt: membre ? dateTime(membre.rejoinedAt) : null,
            leftAt: membre ? dateTime(membre.leftAt) : null,
            resignedAt: membre ? dateTime(membre.resignedAt) : null
        },
        onSubmit: (values) => {
            submitMember(values, assemblyId);
        },
    });
    const [tabIndex, setTabIndex] = useState('1');
    
    const changeTab = (event, newValue) => {
        setTabIndex(newValue);
    };
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <TabContext value={tabIndex}>
                <Box sx={{ borderBottom: 1, borderColor: (theme) => theme.palette.divider }}>
                    <TabList onChange={changeTab} aria-label="Membre d'assemblée" variant="scrollable" scrollButtons="auto">
                        <Tab label="Informations sur le disciple" value="1" />
                        <Tab label="Informations sur le dirigeant" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="label">Nom</CustomFormLabel>
                            <CustomTextField
                                labelId="firstName"
                                id="firstName" 
                                fullWidth
                                name="firstName"
                                placeholder="Entrez nom..."
                                variant="outlined"
                                size="large"
                                value={formik.values.firstName} 
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="label">Prénoms</CustomFormLabel>
                            <CustomTextField
                                labelId="lastName"
                                id="lastName" 
                                fullWidth
                                name="lastName"
                                placeholder="Entrez prénoms"
                                variant="outlined"
                                size="large"
                                value={formik.values.lastName} 
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                            <CustomFormLabel htmlFor="discipleMaker">Faiseur de disciples</CustomFormLabel>
                            <CustomTextField
                                labelId="discipleMaker"
                                id="discipleMaker" 
                                fullWidth
                                name="discipleMaker"
                                placeholder="Entrez le faiseur de disciples"
                                variant="outlined"
                                size="large"
                                value={formik.values.discipleMaker} 
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="label">Profession</CustomFormLabel>
                            <CustomTextField
                                labelId="profession"
                                id="profession" 
                                fullWidth
                                name="profession"
                                placeholder="Entrez une profession..."
                                variant="outlined"
                                size="large"
                                value={formik.values.profession} 
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="label">Sexe</CustomFormLabel>
                            <CustomSelect
                                labelId="sex"
                                id="sex" 
                                fullWidth
                                name="sex"
                                variant="outlined"
                                size="large"
                                value={formik.values.sex} 
                                onChange={formik.handleChange}
                            >
                                {
                                    Object.keys(SEX).map(sex => (
                                        <MenuItem value={sex}> { sex === SEX.MALE ? `Homme` : `Femme` } </MenuItem>  
                                    ))
                                }
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="birthdate">Date de naissance</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="birthDate" 
                                    name="birthDate"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                        '& .MuiSvgIcon-root': {
                                            width: 18,
                                            height: 18,
                                        },
                                        '& .MuiFormHelperText-root': {
                                            display: 'none',
                                        },
                                    }} />}
                                    margin="normal"
                                    disableFuture
                                    openTo="year"
                                    views={["year", "month", "day"]}
                                    placeholder="Entrez une date de naissance"
                                    value={formik.values.birthDate}
                                    onChange={(newValue) => {
                                        var birthdate = date(newValue);
                                        console.log('Date --->', birthdate);
                                        formik.setFieldValue('birthDate', birthdate);
                                    }}
                                    format="YYYY-MM-DD"
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="integrationDate">Date de intégration à l'assemblée</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                id="rejoinedAt" 
                                name="rejoinedAt"
                                renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                    '& .MuiSvgIcon-root': {
                                        width: 18,
                                        height: 18,
                                    },
                                    '& .MuiFormHelperText-root': {
                                        display: 'none',
                                    },
                                }} />}
                                openTo="year"
                                views={["year", "month", "day"]}
                                placeholder="Entrez la date de intégration à l'assemblée"
                                value={formik.values.rejoinedAt}
                                onChange={(newValue) => {
                                    var rejoinedAt = dateTime(newValue);
                                    formik.setFieldValue('rejoinedAt', rejoinedAt);
                                }} 
                            />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="birthdate">Date de depart de l'assemblée</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="leftAt" 
                                    name="leftAt"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                        '& .MuiSvgIcon-root': {
                                            width: 18,
                                            height: 18,
                                        },
                                        '& .MuiFormHelperText-root': {
                                            display: 'none',
                                        },
                                    }} />}
                                    placeholder="Entrez la date de depart de l'assemblée"
                                    value={formik.values.leftAt}
                                    onChange={(newValue) => {
                                        var leftAt = dateTime(newValue);
                                        formik.setFieldValue('leftAt', leftAt);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="active">Actif</CustomFormLabel>
                            <FormControlLabel
                                control={<CustomCheckbox checked={formik.values.active} onChange={(e) => formik.setFieldValue('active', e.target.checked)}/>}
                                label="Est-il actif ou non ?"
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value="2">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="isLeader">Est dirigeant ?</CustomFormLabel>
                            <FormControlLabel
                                control={<CustomCheckbox checked={formik.values.isLeader} onChange={(e) => formik.setFieldValue('isLeader', e.target.checked)}/>}
                                label="Est-il dirigeant ?"
                            />
                        </Grid>    
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="position">Position de dirigeant</CustomFormLabel>
                            <CustomTextField
                                labelId="position"
                                id="position" 
                                fullWidth
                                name="position"
                                placeholder="Entrez une position de direction"
                                variant="outlined"
                                size="large"
                                type="number"
                                value={formik.values.position} 
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="establishedAt">Date d'ordination du dirigeant</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="establishedAt" 
                                    name="establishedAt"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                        '& .MuiSvgIcon-root': {
                                            width: 18,
                                            height: 18,
                                        },
                                        '& .MuiFormHelperText-root': {
                                            display: 'none',
                                        },
                                    }} />}
                                    placeholder="Entrez la date d'ordination du dirgieant"
                                    value={formik.values.establishedAt}
                                    onChange={(newValue) => {
                                        var establishedAt = dateTime(newValue);
                                        console.log('Date -->', establishedAt, newValue);
                                        formik.setFieldValue('establishedAt', establishedAt);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4}>
                            <CustomFormLabel htmlFor="resignedAt">Date de départ de fonction</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="resignedAt" 
                                    name="resignedAt"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                        '& .MuiSvgIcon-root': {
                                            width: 18,
                                            height: 18,
                                        },
                                        '& .MuiFormHelperText-root': {
                                            display: 'none',
                                        },
                                    }} />}
                                    placeholder="Entrez la date de depart de fonction"
                                    value={formik.values.resignedAt}
                                    onChange={(newValue) => {
                                        var resignedAt = dateTime(newValue);
                                        console.log('Date --->', resignedAt, newValue);
                                        formik.setFieldValue('resignedAt', resignedAt);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </TabPanel>
            </TabContext>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={3}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mt={2}>
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color={ membre ? "warning" : "primary"} type="submit"> 
                                { membre ? 'Modifier un membre' : 'Ajouter un membre' }
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
}
        
export default MembreForm;