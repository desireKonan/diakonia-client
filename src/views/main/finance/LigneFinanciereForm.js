import { Button, Box, Stack, MenuItem } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { useFormik } from "formik";
import { httpAdapter } from "src/app/services/http-adapter.service";
import useFetch from "src/app/services/useFetch";

const saveLigneFinanciere = async(values, assemblyId) => {
    var ligneFinanciere = await httpAdapter.saveData(`api/assemblee/ligne-financiere`, {
        assemblyId: assemblyId,
        financialLines: [
            {
                id: values['id'],
                financialSectionId: values['rubriqueFinanciereId'],
                discipleId: values['discipleId'],
                amount: values['amount']
            }
        ]
    });
    if(ligneFinanciere.errorMessage) {
        toast.error(`Erreur: ${ligneFinanciere.errorMessage}`);
        return;
    }
    window.location.reload(true);
}


const LigneFinanciereForm = ({ ligneFinanciere, assemblyId }) => {
    const formik = useFormik({
        initialValues: {
            id: ligneFinanciere ? ligneFinanciere.id : '',
            rubriqueFinanciereId: ligneFinanciere ? ligneFinanciere.financialSectionId : '',
            discipleId: ligneFinanciere ? ligneFinanciere.discipleId : '',
            amount: ligneFinanciere ? ligneFinanciere.amount : 0.0
        },
        onSubmit: (values) => {
            saveLigneFinanciere(values, assemblyId);
        },
    });
    const { data: rubriques } = useFetch('/api/rubrique-financiere', []);
    const { data: disciples } = useFetch('/api/disciple', []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <Stack>
                {
                    formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                }
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
                    <CustomFormLabel>Rubrique financière</CustomFormLabel>
                    <CustomSelect
                        labelId="rubriqueFinanciereId"
                        id="rubriqueFinanciereId" 
                        fullWidth
                        name="rubriqueFinanciereId"
                        value={formik.values.rubriqueFinanciereId}
                        onChange={formik.handleChange}
                    >
                        {
                            rubriques.map(rubrique => (
                                <MenuItem key={rubrique.id} value={`${rubrique.id}`}> { rubrique.label } </MenuItem>
                            ))
                        }   
                    </CustomSelect>
                </Box>
                <Box>
                    <CustomFormLabel>Montant</CustomFormLabel>
                    <CustomTextField 
                        fullWidth
                        id="amount"
                        name="amount"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                    />
                </Box>
                <Box mt={2}>
                    <Button color={ligneFinanciere ? "warning" : "primary"} variant="contained" type="submit">
                        { ligneFinanciere ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
}

export default LigneFinanciereForm;