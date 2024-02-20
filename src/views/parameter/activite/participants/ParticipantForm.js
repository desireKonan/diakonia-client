import { Button, Grid, Stack, MenuItem } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { date, dateTimeValue } from "src/utils/utils";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PageContainer from "src/components/container/PageContainer";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { DiscipleService } from "src/services/disciple.service";
import { addParticipant } from "src/store/features/apps/ActiviteSlice";


const ParticipantForm = ({ activityId , participant }) => {
    const [formData, setFormData] = useState({
        discipleId: "",
        details: {},
        prevStartDate: null,
        prevEndDate: null,
        effectiveStartDate: null,
        effectiveEndDate: null
    }); 
    const activite = useSelector(state => state.activiteReducer.activites.find(activite => activite.id === activityId));

    const [discipleInfos, setDiscipleInfos] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        if(participant && participant.id) {
            setFormData({
                fullname: participant.fullname,
                discipleId: participant.discipleId,
                details: {},
                prevStartDate: participant.prevStartDate ? dateTimeValue(participant.prevStartDate) : null,
                prevEndDate: participant.prevEndDate ? dateTimeValue(participant.prevEndDate) : null,
                effectiveStartDate: participant.effectiveStartDate ? dateTimeValue(participant.effectiveStartDate) : null,
                effectiveStartDate: participant.effectiveEndDate ? dateTimeValue(participant.effectiveEndDate) : null,
            });
        } else {
            DiscipleService.getDisciples().then(disciples => {
                var discipleInfos = disciples.map(disciple => ({
                    fullname: `${disciple.firstName} ${disciple.lastName}`,
                    discipleId: disciple.id
                }));
                setDiscipleInfos(discipleInfos);
            });
        }
    }, []);


    const handleInputChange = (event) => {
        console.log(event.target);
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
    }


    const setDate = (key, value) => {
        setFormData({
          ...formData,
          [key]: value
        });
    }


    const submitParticipant = (event) => {
        event.preventDefault();
        let participantCommand = {};
        if(participant && participant.id) {
            participantCommand.id = participant.id;
        }
        participantCommand.discipleId = formData.discipleId;
        var discipleInfo = discipleInfos.find(info => info.discipleId === formData.discipleId);
        console.log(discipleInfos, formData);
        if(discipleInfo) {
            participantCommand.fullname = discipleInfo.fullname;
            participantCommand.activityLabel = activite.label;
            participantCommand.discipleName = discipleInfo.fullname;
        }
        participantCommand.activityId = activityId;
        participantCommand.prevStartDate = formData.prevStartDate;
        participantCommand.prevEndDate = formData.prevEndDate;
        participantCommand.effectiveStartDate = formData.effectiveStartDate;
        participantCommand.effectiveEndDate = formData.effectiveEndDate;

        dispatch(addParticipant(participantCommand));
    }


    return (
        <PageContainer title="Formulaire de participant" description="Formulaire de participant">
            <ParentCard title="Formulaire de participant">
                <form method="POST" onSubmit={submitParticipant}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} lg={12}>
                            <CustomFormLabel htmlFor="label">Nom complet</CustomFormLabel>
                            <CustomSelect
                                labelId="disciple-id"
                                id="disciple-id" 
                                fullWidth
                                name="discipleId"
                                value={formData.discipleId}
                                onChange={handleInputChange}
                            >
                                {
                                    discipleInfos ? (
                                        discipleInfos.map(info => 
                                            (<MenuItem key={info.discipleId} value={info.discipleId}> {info.fullname} </MenuItem>)
                                        )
                                    ) : null
                                }
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="startDate">Date prévisionnelle de debut</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="date"
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
                                    value={formData.prevStartDate}
                                    onChange={(newValue) => {
                                        var prevStartDate = date(newValue);
                                        setDate("prevStartDate", prevStartDate);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="startDate">Date prévisionnelle de fin</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="date"
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
                                    value={formData.prevEndDate}
                                    onChange={(newValue) => {
                                        var prevEndDate = date(newValue);
                                        setDate("prevEndDate", prevEndDate);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="startDate">Date effective de debut</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="date"
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
                                    value={formData.effectiveStartDate}
                                    onChange={(newValue) => {
                                        var effectiveStartDate = date(newValue);
                                        setDate("effectiveStartDate", effectiveStartDate);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="startDate">Date effective de fin</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="date"
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
                                    value={formData.effectiveEndDate}
                                    onChange={(newValue) => {
                                        var effectiveEndDate = date(newValue);
                                        setDate("effectiveEndDate", effectiveEndDate);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12} md={12} lg={4}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mt={2}>
                            <Stack spacing={1} direction="row">
                                <Button variant="contained" color={(participant && participant.id) ? "warning": "primary"} type="submit"> 
                                    { (participant && participant.id) ? 'Modifier': 'Ajouter' } un participant 
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </form>
            </ParentCard>
        </PageContainer>
    );
}

export default ParticipantForm;