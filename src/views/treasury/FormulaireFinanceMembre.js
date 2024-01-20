import { Box, Button, FormControlLabel, Grid, MenuItem, Stack, Tab } from "@mui/material";

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

import { TabContext, TabList, TabPanel } from "@mui/lab";

const FormulaireFinanceMembre = () => {
    return (
        <PageContainer title="Finance d'un frère" description="Finance d'un frère">
            <Breadcrumb title="Finance d'un frère" subtitle="Finance d'un frère"/>
            
            <ParentCard title="Finance d'un frère">
                <form method="POST" onSubmit={null}>
                    
                </form>
            </ParentCard>
        </PageContainer>
    );
}


export default FormulaireFinanceMembre;