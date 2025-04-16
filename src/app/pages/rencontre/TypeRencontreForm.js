import { Button, Box, Stack } from "@mui/material";
import PageContainer from "src/_ui/components/container/PageContainer";
import Breadcrumb from "src/_ui/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/_ui/components/shared/ParentCard";
import CustomFormLabel from "src/_ui/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/_ui/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpAdapter } from "src/app/services/http-adapter.service";

const validationSchema = yup.object({
    label: yup.string()
        .required("Le libéllé est requis !"),
    description: yup.string()
        .required("La description est requis !")
});


const saveTypeRencontre = async(values) => {
    var type = await httpAdapter.saveData(`/api/type-rencontre`, values);
    if(type.errorMessage) {
        toast.error(`Erreur: ${type.errorMessage}`);
        return;
    }
    window.location.reload(true);
}


const TypeRencontreForm = ({ typeRencontre }) => {
    const formik = useFormik({
        initialValues: {
            id: typeRencontre ? typeRencontre.id : '',
            label: typeRencontre ? typeRencontre.label : '',
            description: typeRencontre ? typeRencontre.description : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            saveTypeRencontre(values);
        },
    });

    return (
        <PageContainer title="Formulaire de type de rencontre" description="Formulaire de type de rencontres">
            <Breadcrumb title="Formulaire de type de rencontre" subtitle="Formulaire de type de rencontres"/>
            <ParentCard title="Formulaire de type de rencontres">
                <form onSubmit={formik.handleSubmit}>
                    <ToastContainer />
                    <Stack>
                        {
                          formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                        }
                        <Box>
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
                        </Box>
                        <Box>
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
                        </Box>
                        <Box mt={2}>
                            <Button color="primary" variant="contained" type="submit">
                                Ajouter
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </ParentCard>
        </PageContainer>
    );
}


export default TypeRencontreForm;