import { Box, Button, Grid, MenuItem, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import useFetch from 'src/app/services/useFetch';
import CustomFormLabel from 'src/_ui/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from 'src/_ui/components/forms/theme-elements/CustomSelect';
import CustomTextField from 'src/_ui/components/forms/theme-elements/CustomTextField';
import { date, dateTime, PersonType, SEX } from 'src/app/services/utils';


const saveParticipant = async(values, meetingId) => {
    var participant = await httpAdapter.saveData(`api/assemblee/rencontre/participants`, {
        meetingId: meetingId, 
        participants: [
            {
                id: values['id'],
                fullname: values['fullname'],
                contacts: (values['contacts'] instanceof Array) ? values['contacts'] : [values['contacts']],
                discipleId: values['discipleId'],
                sex: values['sex'],
                type: values['type'],
                birthdate: values['birthdate'],
            }
        ]
    });
    if(participant.errorMessage) {
        toast.error(`Erreur: ${participant.errorMessage}`);
        return;
    }
    window.location.reload(true);
}

const ParticipantRencontreForm = ({ participant, meetingId }) => {
    const [isGuest, setGuest] = useState(false);
    const formik = useFormik({
        initialValues: {
            id: participant ? participant.id : '',
            fullname: participant ? participant.fullname : '',
            type: participant ? participant.type : '',
            discipleId: participant ? participant.discipleId : '',
            sex: participant ? participant.sex : '',
            contacts: participant ? participant.contacts : [],
            birthdate: participant ? dateTime(participant.birthdate) : null,
        },
        onSubmit: (values) => {
            saveParticipant(values, meetingId);
        },
    });
    const { data: disciples } = useFetch('/api/disciple', []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <Stack>
                {
                    formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                }
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomFormLabel>Type</CustomFormLabel>
                        <CustomSelect
                            labelId="type"
                            id="type" 
                            fullWidth
                            name="type"
                            value={formik.values.type}
                            onChange={(e) => {
                                formik.handleChange(e);
                                if(PersonType.GUEST === e.target.value) {
                                    formik.setFieldValue("discipleId", "");
                                    setGuest(true);    
                                } else {
                                    setGuest(false);
                                }
                            }}
                        >
                            {
                                Object.keys(PersonType).map(person => (
                                    <MenuItem key={person} value={PersonType[person]}> {PersonType[person]} </MenuItem>
                                ))
                            }   
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomFormLabel>Nom complet</CustomFormLabel>
                        {
                            isGuest ? (
                                <CustomTextField 
                                    fullWidth
                                    id="fullname"
                                    name="fullname"
                                    value={formik.values.fullname}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                    helperText={formik.touched.fullname && formik.errors.fullname}
                                />
                            ) : (
                                <CustomSelect
                                    labelId="discipleId"
                                    id="discipleId" 
                                    fullWidth
                                    name="discipleId"
                                    value={formik.values.discipleId}
                                    onChange={e => {
                                        formik.handleChange(e);
                                        const disciple = disciples.find(disciple => disciple.id === e.target.value);
                                        formik.setFieldValue('fullname', `${disciple.firstName} ${disciple.lastName}`);
                                        formik.setFieldValue('sex', disciple.sex);
                                        formik.setFieldValue('contacts', disciple.contacts);
                                        formik.setFieldValue('birthdate', disciple.birthDate);
                                    }}
                                >
                                    {
                                        disciples.map(disciple => (
                                            <MenuItem key={disciple.id} value={`${disciple.id}`}> {`${disciple.firstName} ${disciple.lastName}`} </MenuItem>
                                        ))
                                    }   
                                </CustomSelect>
                            )
                        }            
                    </Grid>
                </Grid>
                
                { isGuest ? (<>
                        <Box>
                            <CustomFormLabel>Sexe</CustomFormLabel>
                            <CustomSelect
                                labelId="sex"
                                id="sex" 
                                fullWidth
                                name="sex"
                                value={formik.values.sex}
                                onChange={formik.handleChange}
                            >
                                {
                                    Object.keys(SEX).map(sex => (
                                        <MenuItem key={sex} value={SEX[sex]}> {SEX[sex]} </MenuItem>
                                    ))
                                }   
                            </CustomSelect>
                        </Box>
                                
                        <Box>
                            <CustomFormLabel>Contacts</CustomFormLabel>
                            <CustomTextField 
                                fullWidth
                                id="contacts"
                                name="contacts"
                                value={formik.values.contacts}
                                onChange={formik.handleChange}
                                error={formik.touched.contacts && Boolean(formik.errors.contacts)}
                                helperText={formik.touched.contacts && formik.errors.contacts}
                            />
                        </Box>
                                
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="birthdate">Date de naissance</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="bithdate" 
                                    name="birthdate"
                                    renderInput={(props) => <CustomTextField id="birthdate" name="birthdate" {...props} fullWidth size="large" sx={{
                                            '& .MuiSvgIcon-root': {
                                                width: 18,
                                                height: 18,
                                            },
                                            '& .MuiFormHelperText-root': {
                                                display: 'none',
                                            },
                                        }}
                                    />}
                                    placeholder="Entrez la date de naissance"
                                    value={formik.values.birthdate}
                                    onChange={(newValue) => {
                                        var birthdate = date(newValue);
                                        console.log(birthdate);
                                        formik.setFieldValue('birthdate', birthdate);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </>) : null
                }

                <Box mt={2}>
                    <Button color={ participant ? "warning" : "primary"} variant="contained" type="submit">
                        { participant ? `Modifier` : `Ajouter` }
                    </Button>
                </Box>
            </Stack>
        </form>
    );
}

ParticipantRencontreForm.propTypes = {
    participant: PropTypes.object,
    meetingId: PropTypes.string
}

export default ParticipantRencontreForm;