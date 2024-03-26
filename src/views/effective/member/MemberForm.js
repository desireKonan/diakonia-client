import { Box, Button, FormControlLabel, Grid, MenuItem, Stack, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CustomCheckbox from "src/components/forms/theme-elements/CustomCheckbox";
import { MemberService } from "src/services/member.service";
import { saveMember, updateMember } from "src/store/features/effective/MemberSlice";
import moment from "moment/moment";
import { dateTimeValue } from "src/utils/utils";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const AssemblyMemberForm = () => {
    const [memberId, setMemberId] = useState(0);
    const [firstName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profession, setProfession] = useState("");
    const [sex, setSex] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [isLeader, setIsLeader] = useState(false);
    const [active, setActive] = useState(true);
    const [position, setPosition] = useState(0);
    const [establishedAt, setEstablishedAt] = useState(new Date());
    const [rejoinedAt, setRejoinedAt] = useState(new Date());
    const [leftAt, setLeftAt] = useState(new Date());
    const [resignedAt, setResignedAt] = useState(new Date());
    const [tabIndex, setTabIndex] = useState('1');

    const changeTab = (event, newValue) => {
        setTabIndex(newValue);
    };

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(params.assemblyId && params.memberId) {
            MemberService
                .getMember(parseInt(params.assemblyId), params.memberId)
                .then(member => {
                    console.log(member);
                    setMemberId(member.memberId);
                    setFistName(member.firstName);
                    setLastName(member.lastName);
                    setSex(member.sex);
                    setProfession(member.profession);
                    setBirthDate(member.birthDate);
                    setActive(member.active);
                    setRejoinedAt(dateTimeValue(member.rejoinedAt));
                    setLeftAt(dateTimeValue(member.leftAt));
                    if(member.leader) {
                        setIsLeader(member.leader);
                        setEstablishedAt(dateTimeValue(member.establishedAt));
                        setPosition(member.position);
                        setResignedAt(dateTimeValue(member.leftAt));
                    }
                });
        }
    }, []);

    const submitMember = (event) => {
        event.preventDefault();
        let member = {
            disciple: {},
            infos: {}
        };
        if(params.id) {
            member.assemblyId = parseInt(params.id);
        } else if(parseInt(params.assemblyId) && params.memberId) {
            member.memberId = memberId;
            member.assemblyId = parseInt(params.assemblyId);
            member.disciple.id = params.memberId;
        }
        member.disciple.firstName = firstName;
        member.disciple.lastName  = lastName;
        member.disciple.birthDate = moment(birthDate).format("YYYY-MM-DD");
        member.disciple.sex       = sex;
        member.disciple.profession = profession;
        member.disciple.active    = active;
        member.isLeader = isLeader;
        if(member.isLeader) {
            member.infos.position = position;
            member.infos.etablishedAt = establishedAt;
            member.infos.leftAt = resignedAt;
        }
        
        member.rejoinedAt = rejoinedAt;
        member.leftAt = leftAt;

        if(parseInt(params.assemblyId) && params.memberId) {
            MemberService
                .updateMember(member)
                .then(response => dispatch(updateMember(response)));
        } else {
            MemberService
                .postMember(member)
                .then(response => dispatch(saveMember(response)));
        }

        

        let assemblyId = params.id ? parseInt(params.id) : parseInt(params.assemblyId);
        
        navigate(`/assemblee/${assemblyId}/membres`);
    }

    return (
        <PageContainer title="Formulaire d'ajout d'un nouveau membre" description="Formulaire d'ajout d'un nouveau membre">
            <Breadcrumb title="Formulaire d'ajout d'un nouveau membre" subtitle="Formulaire d'ajout d'un nouveau membre"/>
            
            <ParentCard title="Formulaire de d'assemblée">
                <form method="POST" onSubmit={submitMember}>
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
                                        id="label"
                                        placeholder="Entrez nom..."
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        value={firstName} 
                                        onChange={(e) => setFistName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6}>
                                    <CustomFormLabel htmlFor="label">Prénoms</CustomFormLabel>
                                    <CustomTextField
                                        id="label"
                                        placeholder="Entrez prénoms"
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="label">Profession</CustomFormLabel>
                                    <CustomTextField
                                        id="label"
                                        placeholder="Entrez une profession"
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        value={profession} 
                                        onChange={(e) => setProfession(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="label">Sexe</CustomFormLabel>
                                    <CustomSelect
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        fullWidth
                                        size="large"
                                        value={sex}
                                        onChange={e => setSex(e.target.value)}
                                    >
                                        <MenuItem value={`Homme`}>Homme</MenuItem>  
                                        <MenuItem value={`Femme`}>Femme</MenuItem>    
                                    </CustomSelect>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="birthdate">Date de naissance</CustomFormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
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
                                            value={birthDate}
                                            onChange={(e) => {
                                                setBirthDate(e);
                                            }}
                                            format="YYYY-MM-DD"
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="birthdate">Date de intégration à l'assemblée</CustomFormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
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
                                            value={rejoinedAt}
                                            onChange={(newValue) => {
                                                setRejoinedAt(newValue);
                                            }}
                                            
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="birthdate">Date de depart de l'assemblée</CustomFormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
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
                                            value={leftAt}
                                            onChange={(newValue) => {
                                                setLeftAt(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="active">Actif</CustomFormLabel>
                                    <FormControlLabel
                                        control={<CustomCheckbox checked={active} onChange={(e) => setActive(e.target.checked)}/>}
                                        label="Est-il actif ou non ?"
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="isLeader">Est dirigeant</CustomFormLabel>
                                    <FormControlLabel
                                        control={<CustomCheckbox checked={isLeader} onChange={(e) => setIsLeader(e.target.checked)}/>}
                                        label="Est-il dirigeant ?"
                                    />
                                </Grid>    
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="position">Position de dirigeant</CustomFormLabel>
                                    <CustomTextField
                                        id="position"
                                        placeholder="Entrez une position de direction"
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        type="number"
                                        value={position} 
                                        onChange={(e) => setPosition(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="establishedAt">Date d'ordination du dirigeant</CustomFormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
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
                                            value={establishedAt}
                                            onChange={(newValue) => {
                                                setEstablishedAt(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel htmlFor="resignedAt">Date de départ de fonction</CustomFormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
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
                                            value={resignedAt}
                                            onChange={(newValue) => {
                                                setResignedAt(newValue);
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
                                    {
                                        params.id ? 
                                            <Button variant="contained" color="primary" type="submit"> Ajouter un membre </Button> :
                                            <Button variant="contained" color="warning" type="submit"> Modifier un membre </Button>
                                    }
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </ParentCard>
        </PageContainer>
    );
}


export default AssemblyMemberForm;