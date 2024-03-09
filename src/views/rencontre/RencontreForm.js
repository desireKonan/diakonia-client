import { Button, Box, Stack, Grid } from "@mui/material";
import { useFormik } from "formik";
import PageContainer from "src/components/container/PageContainer";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import ParentCard from "src/components/shared/ParentCard";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";

const validationSchema = yup.object({
    label: yup.string()
        .required("Le libéllé est requis !"),
    description: yup.string()
        .required("La description est requis !")
});


const RencontreForm = ({ rencontre }) => {
    const formik = useFormik({
        initialValues: {
            id: rencontre ? rencontre.id : '',
            label: rencontre ? rencontre.label : '',
            description: rencontre ? rencontre.description : '',
            localization: rencontre ? rencontre.localisation : '',
            meetingTypeId: rencontre ? rencontre.meetingTypeId : '',
            localizationType: rencontre ? rencontre.localizationType : '',
            start: rencontre ? rencontre.start : '',
            end: rencontre ? rencontre.end : ''
        },
        onSubmit: (values) => {

        }
    });

    return (
        <PageContainer title="Formulaire de rencontre" description="Formulaire de rencontres">
            <Breadcrumb title="Formulaire de rencontre" subtitle="Formulaire de rencontres"/>
            <ParentCard title="Formulaire de rencontres">
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomFormLabel>Libéllé</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="label"
                                name="label"
                                value={formik.values.label}
                                onChange={formik.handleChange}
                                error={formik.touched.label && Boolean(formik.errors.label)}
                                helperText={formik.touched.label && formik.errors.label}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomFormLabel>Description</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomFormLabel>Type de rencontre</CustomFormLabel>
                            <CustomSelect
                                labelId="localization"
                                id="localization" 
                                fullWidth
                                name="localization"
                                value={formik.values.localization}
                                onChange={formik.handleChange}
                            >
                                {

                                }   
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomFormLabel>Localisation</CustomFormLabel>
                            <CustomSelect
                                labelId="localization"
                                id="localization" 
                                fullWidth
                                name="localization"
                                value={formik.values.localization}
                                onChange={formik.handleChange}
                            >
                                {

                                }   
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomFormLabel>Type de lieu</CustomFormLabel>
                            <CustomSelect
                                labelId="localizationType"
                                id="localizationType" 
                                fullWidth
                                name="localizationType"
                                value={formik.values.localizationType}
                                onChange={formik.handleChange}
                            >
                                {

                                }   
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="startDate">Date de départ</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="date"
                                    name="startDate"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                        '& .MuiSvgIcon-root': {
                                            width: 18,
                                            height: 18,
                                        },
                                        '& .MuiFormHelperText-root': {
                                            display: 'none',
                                        },
                                    }} />}
                                    placeholder="Entrez la date de depart"
                                    value={formik.values.startDate}
                                    onChange={(newValue) => {
                                        console.log(newValue);
                                        setStartDate(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="startDate">Date de fin</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="date"
                                    name="endDate"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                        '& .MuiSvgIcon-root': {
                                            width: 18,
                                            height: 18,
                                        },
                                        '& .MuiFormHelperText-root': {
                                            display: 'none',
                                        },
                                    }} />}
                                    placeholder="Entrez la date de fin"
                                    value={formData.endDate}
                                    onChange={(newValue) => {
                                        console.log(newValue);
                                        setEndDate(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </form>
            </ParentCard>
        </PageContainer>
    );
}


export default RencontreForm;