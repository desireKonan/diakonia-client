import { Button, Stack, Box, MenuItem, Autocomplete } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import useFetch from "src/app/services/useFetch";


const validationSchema = yup.object({
    username: yup.string()
        .required("Le nom d'utilisateur est requis !"),
    password: yup.string()
        .required("La mot de passe est requis !")
});

const saveUtilisateur = async (values) => {
    var utilisateur = await httpAdapter.saveData(`/api/user`, values);
    if (utilisateur.errorMessage) {
        toast.error(`Erreur: ${utilisateur.errorMessage}`);
        return;
    }
    window.location.reload(true);
}

const UtilisateurForm = ({ utilisateur }) => {
    const formik = useFormik({
        initialValues: {
            id: utilisateur ? utilisateur.id : '',
            username: utilisateur ? utilisateur.username : '',
            password: utilisateur ? utilisateur.password : '',
            discipleId: utilisateur ? utilisateur.discipleId : '',
            roles: utilisateur ? utilisateur.roles : []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            saveUtilisateur(values);
        },
    });

    const { data: disciples } = useFetch("/api/disciple", []);

    const { data: roles } = useFetch("/api/role", []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <Stack>
                {
                    formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                }
                <Box>
                    <CustomFormLabel>Nom d'utilisateur</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                </Box>
                <Box>
                    <CustomFormLabel>Mot de passe</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Box>
                <Box>
                    <CustomFormLabel>Disciple</CustomFormLabel>
                    <CustomSelect
                        labelId="discipleId"
                        id="discipleId"
                        fullWidth
                        name="discipleId"
                        value={formik.values.discipleId}
                        onChange={formik.handleChange}
                    >
                        {
                            disciples.map(disciple => (
                                <MenuItem key={disciple.id} value={disciple.id}> { `${disciple.firstName} ${disciple.lastName}` } </MenuItem>
                            ))
                        }
                    </CustomSelect>
                </Box>
                <Box>
                    <CustomFormLabel>Roles</CustomFormLabel>
                    <Autocomplete
                        multiple
                        fullWidth
                        id="tags-outlined"
                        options={roles}
                        getOptionLabel={(option) => (option instanceof Object) ? option.label : option}
                        defaultValue={formik.values.roles}
                        onChange={(e) => {
                            let value = e.target.innerHTML;
                            formik.setFieldValue('roles', [value, ...formik.values.roles]);
                        }}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <CustomTextField {...params} placeholder="Roles" aria-label="Roles" />
                        )}
                    />
                </Box>
                <Box mt={2}>
                    <Button color={utilisateur ? "warning" : "primary"} variant="contained" type="submit">
                        {utilisateur ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};


export default UtilisateurForm;