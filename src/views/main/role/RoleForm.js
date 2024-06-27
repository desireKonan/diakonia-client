import { Button, Stack, Box, MenuItem } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { ROLES } from "src/utils/utils";


const validationSchema = yup.object({
    label: yup.string()
        .required("Le libéllé est requis !"),
    description: yup.string()
        .required("La description est requis !")
});

const saveRole = async (values) => {
    var role = await httpAdapter.saveData(`/api/role`, values);
    if (role.errorMessage) {
        toast.error(`Erreur: ${role.errorMessage}`);
        return;
    }
    window.location.reload(true);
}

const RoleForm = ({ role }) => {
    const formik = useFormik({
        initialValues: {
            id: role ? role.id : '',
            label: role ? role.label : '',
            description: role ? role.description : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            saveRole(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <Stack>
                {
                    formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                }
                <Box>
                    <CustomFormLabel>Libéllé</CustomFormLabel>
                    <CustomSelect
                        fullWidth
                        id="label"
                        name="label"
                        value={formik.values.label}
                        onChange={formik.handleChange}
                        error={formik.touched.label && Boolean(formik.errors.label)}
                        helperText={formik.touched.label && formik.errors.label}
                    >
                        {
                            Object.keys(ROLES).map(role => (
                                <MenuItem key={role} value={ROLES[role]}> {ROLES[role]} </MenuItem>
                            ))
                        }
                    </CustomSelect>
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
                    <Button color={role ? "warning" : "primary"} variant="contained" type="submit">
                        {role ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};


export default RoleForm;