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
import { ParticipantService } from "src/services/participant.service";


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
        if(participant) {
            setFormData({
                fullname: participant.fullname,
                discipleId: participant.discipleId,
                details: {},
                prevStartDate: participant.prevStartDate ? dateTimeValue(participant.prevStartDate) : null,
                prevEndDate: participant.prevEndDate ? dateTimeValue(participant.prevEndDate) : null,
                effectiveStartDate: participant.effectiveStartDate ? dateTimeValue(participant.effectiveStartDate) : null,
                effectiveEndDate: participant.effectiveEndDate ? dateTimeValue(participant.effectiveEndDate) : null,
            });
        } 
        DiscipleService.getDisciples().then(disciples => {
            var discipleInfos = disciples.map(disciple => ({
                fullname: `${disciple.firstName} ${disciple.lastName}`,
                discipleId: disciple.id
            }));
            setDiscipleInfos(discipleInfos);
        });
    }, []);


    const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
    }


    const setField = (key, value) => {
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
        if(discipleInfo) {
            participantCommand.fullname = discipleInfo.fullname;
            participantCommand.activityLabel = activite.label;
        }
        participantCommand.prevStartDate = date(formData.prevStartDate);
        participantCommand.prevEndDate = date(formData.prevEndDate);
        participantCommand.effectiveStartDate = date(formData.effectiveStartDate);
        participantCommand.effectiveEndDate = date(formData.effectiveEndDate);
        let saveParticipantCommand = {
            activityId: activityId,
            participants: [
                participantCommand
            ]
        };
        ParticipantService.postParticipant(saveParticipantCommand).then(() => {
            navigate("/activites");
        });
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
                                        setField("prevStartDate", prevStartDate);
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
                                        setField("prevEndDate", prevEndDate);
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
                                        setField("effectiveStartDate", effectiveStartDate);
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
                                        setField("effectiveEndDate", effectiveEndDate);
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