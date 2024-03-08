import { Button, Box, Stack, Grid } from "@mui/material";
import { useFormik } from "formik";
import PageContainer from "src/components/container/PageContainer";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import ParentCard from "src/components/shared/ParentCard";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";

const RencontreForm = ({ rencontre }) => {
    const formik = useFormik({
        initialValues: {
            id: rencontre ? rencontre.id : '',
            label: rencontre ? rencontre.label : '',
            description: rencontre ? rencontre.description : '',
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
                        <Grid item xs={6}>
                            <CustomFormLabel>Localisation</CustomFormLabel>
                            <CustomSelect>
                                
                            </CustomSelect>
                        </Grid>
                    </Grid>
                </form>
            </ParentCard>
        </PageContainer>
    );
}


export default RencontreForm;