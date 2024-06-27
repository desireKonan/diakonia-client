import { Button, Grid, Stack, MenuItem } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { date } from "src/utils/utils";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ToastContainer, toast } from 'react-toastify';


const submitParticipant = async(values, activityId) => {
    console.log(values, activityId);
    var participant = await httpAdapter.saveData(`api/activite/participants`, {
        activityId: activityId,
        participants: [
            {
                id: values['id'], 
                discipleId: values['discipleId'],
                fullname: values['fullname'],
                description: values['description'],
                activityTypeId: values['typeId'],
                //activityDetails: values['details'],
                prevStartDate: values['prevStartDate'],
                prevEndDate: values['prevEndDate'],
                effectiveStartDate: values['effectiveStartDate'],
                effectiveEndDate: values['effectiveEndDate']
            }
        ]
    });
    if(participant.errorMessage) {
        toast.error(`Erreur: ${participant.errorMessage}`);
        return;
    }
    window.location.reload(true);
}


const ParticipantForm = ({ activityId , participant }) => {
    console.log(participant, activityId);
    const formik = useFormik({
        initialValues: {
            id: participant ? participant.id : "",
            fullname: participant ? participant.fullname : "",
            discipleId: participant ? participant.discipleId : "",
            //details: participant ? participant.details : {},
            prevStartDate: participant ? date(participant.prevStartDate) : null,
            prevEndDate: participant ? date(participant.prevEndDate) : null,
            effectiveStartDate: participant ? date(participant.effectiveStartDate) : null,
            effectiveEndDate: participant ? date(participant.effectiveEndDate) : null
        },
        onSubmit: (values) => {
            submitParticipant(values, activityId);
        }
    }); 
    const { data: disciples } = useFetch('/api/disciple', []);
    
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={12}>
                    <CustomFormLabel htmlFor="label">Nom complet</CustomFormLabel>
                    <CustomSelect
                        labelId="discipleId"
                        id="discipleId" 
                        fullWidth
                        name="discipleId"
                        value={formik.values.discipleId}
                        onChange={(e) => {
                            formik.handleChange(e);
                            const disciple = disciples.find(disciple => disciple.id === e.target.value);
                            console.log(e, disciple);
                            formik.setFieldValue('fullname', `${disciple.firstName} ${disciple.lastName}`);
                        }}
                    >
                        {
                            disciples.map(info => 
                                (<MenuItem key={info.id} value={info.id}> {`${info.firstName} ${info.lastName}`} </MenuItem>)
                            )
                        }
                    </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <CustomFormLabel htmlFor="startDate">Date prévisionnelle de debut</CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                        id="prevStartDate"
                        name="prevStartDate"
                        renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                            '& .MuiSvgIcon-root': {
                                width: 18,
                                height: 18,
                            },
                            '& .MuiFormHelperText-root': {
                                display: 'none',
                            },
                        }} />}
                        placeholder="Entrez la date prévisionnelle de debut"
                        value={formik.values.prevStartDate}
                        onChange={(newValue) => {
                            var prevStartDate = date(newValue);
                            formik.setFieldValue("prevStartDate", prevStartDate);
                        }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <CustomFormLabel htmlFor="startDate">Date prévisionnelle de fin</CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            id="prevEndDate"
                            name="prevEndDate"
                            renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                '& .MuiSvgIcon-root': {
                                    width: 18,
                                    height: 18,
                                },
                                '& .MuiFormHelperText-root': {
                                    display: 'none',
                                },
                            }} />}
                            placeholder="Entrez la date prévisionnelle de fin"
                            value={formik.values.prevEndDate}
                            onChange={(newValue) => {
                                var prevEndDate = date(newValue);
                                formik.setFieldValue("prevEndDate", prevEndDate);
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <CustomFormLabel htmlFor="startDate">Date effective de debut</CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            id="effectiveStartDate"
                            name="effectiveStartDate"
                            renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                '& .MuiSvgIcon-root': {
                                    width: 18,
                                    height: 18,
                                },
                                '& .MuiFormHelperText-root': {
                                    display: 'none',
                                },
                            }} />}
                            placeholder="Entrez la date effective de debut"
                            value={formik.values.effectiveStartDate}
                            onChange={(newValue) => {
                                var effectiveStartDate = date(newValue);
                                formik.setFieldValue("effectiveStartDate", effectiveStartDate);
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <CustomFormLabel htmlFor="startDate">Date effective de fin</CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            id="effectiveEndDate"
                            name="effectiveEndDate"
                            renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                '& .MuiSvgIcon-root': {
                                    width: 18,
                                    height: 18,
                                },
                                '& .MuiFormHelperText-root': {
                                    display: 'none',
                                },
                            }} />}
                            placeholder="Entrez la date effective de fin"
                            value={formik.values.effectiveEndDate}
                            onChange={(newValue) => {
                                var effectiveEndDate = date(newValue);
                                formik.setFieldValue("effectiveEndDate", effectiveEndDate);
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            
            <Grid item xs={12} md={12} lg={4}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mt={2}>
                    <Stack spacing={1} direction="row">
                        <Button variant="contained" color={participant ? "warning": "primary"} type="submit"> 
                            { participant ? 'Modifier': 'Ajouter' } un participant 
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </form>
    );
}
        
export default ParticipantForm;