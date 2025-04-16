import React, { useState } from 'react';
import { MenuItem, Paper } from '@mui/material';
import CustomSelect from 'src/_ui/components/forms/theme-elements/CustomSelect';
import 'react-toastify/dist/ReactToastify.css';
import PageContainer from 'src/_ui/components/container/PageContainer';
import Breadcrumb from 'src/_ui/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from 'src/_ui/components/shared/ParentCard';
import SousZoneRapportJour from './SousZoneRapportJour';
import SousZoneRapportMois from './SousZoneRapportMois';
import SousZoneRapportAnnee from './SousZoneRapportAnnee';


const EffectiveSousZoneRapport = ({ subzone }) => {
    const [period, setPeriod] = useState("Jour");

    const switchReportPeriod = (reportPeriod) => {
        switch (reportPeriod) {
            case "Jour":
                return <SousZoneRapportJour subzone={subzone}/>;
            case "Mois":
                return <SousZoneRapportMois subzone={subzone}/>;
            case "Année":
                return <SousZoneRapportAnnee subzone={subzone}/>;
            default:
                return <SousZoneRapportJour subzone={subzone}/>;
        }
    }

    return (
        <PageContainer title={`Rapport d'effectifs de la sous-zone : ${subzone}`} description="Rapport d'effectifs de la sous-zone">
            <Breadcrumb title={`Rapport d'effectifs de la sous-zone : ${subzone}`} subtitle="Rapport d'effectifs de la sous-zone" />
            <ParentCard title={`Rapport d'effectifs de la sous-zone : ${subzone}`} action={
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

export default EffectiveSousZoneRapport;