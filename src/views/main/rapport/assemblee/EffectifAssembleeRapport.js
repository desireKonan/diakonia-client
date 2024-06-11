import React, { useState } from 'react';
import { 
    MenuItem,
    Paper
} from '@mui/material';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import 'react-toastify/dist/ReactToastify.css';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from 'src/components/shared/ParentCard';
import AssembleeRapportJour from './AssembleeRapportJour';
import AssembleeRapportMois from './AssembleeRapportMois';
import AssembleeRapportAnnee from './AssembleeRapportAnnee';


const EffectifAssembleeRapport = ({ assemblee }) => {
    const [period, setPeriod] = useState("");

    const switchReportPeriod = (reportPeriod) => {
        switch (reportPeriod) {
            case "Jour":
                return <AssembleeRapportJour assemblee={assemblee}/>;
            case "Mois":
                return <AssembleeRapportMois assemblee={assemblee}/>;
            case "Année":
                return <AssembleeRapportAnnee assemblee={assemblee}/>;
            default:
                return <AssembleeRapportJour assemblee={assemblee}/>;
        }
    }

    return (
        <PageContainer title={`Rapport d'effectifs de l'assemblée : ${assemblee}`} description="Rapport d'effectifs de l'assemblée">
            <Breadcrumb title={`Rapport d'effectifs de l'assemblée : ${assemblee}`} subtitle="Rapport d'effectifs de l'assemblée" />
            <ParentCard title={`Rapport d'effectifs de l'assemblée : ${assemblee}`} action={
                <CustomSelect
                    id="period" 
                    fullWidth
                    name="period"
                    size="large"
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    <MenuItem selected={true} value="Jour"> Jour </MenuItem>  
                    <MenuItem value="Mois"> Mois </MenuItem>    
                    <MenuItem value="Année"> Année </MenuItem>    
                </CustomSelect>
            }>
                <Paper variant="outlined">
                    { switchReportPeriod(period) }
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default EffectifAssembleeRapport;