import { useState } from "react";
import { Grid, Button } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { IconTrash } from "@tabler/icons";

const useAddDetails = () => {
    const [details, setDetails] = useState([]);
    const [countDetails, setCountDetails] = useState(0);
    
    const addDetails = () => {
        setCountDetails(countDetails + 1);
        let detail = (
            <>
                <Grid key={`title-${countDetails}`} item xs={12} sm={12} lg={5}>
                    <CustomFormLabel htmlFor="label">Titre du détails</CustomFormLabel>
                    <CustomTextField
                        id="titleDetails"
                        name="titleDetails[]"
                        placeholder="Entrer une titre de détails"
                        variant="outlined"
                        fullWidth
                        size="large"
                    />
                </Grid>
                <Grid key={`value-${countDetails}`} item xs={12} sm={12} lg={5}>
                    <CustomFormLabel htmlFor="label">Valeur du détails</CustomFormLabel>
                    <CustomTextField
                        id="detailValue"
                        name="detailValue[]"
                        placeholder="Entrer une valeur de détails"
                        variant="outlined"
                        fullWidth
                        size="large"
                    />
                </Grid>
                <Grid key={`row-${countDetails}`} item xs={12} sm={12} lg={2} justifyContent="center">
                    <Button color="error" startIcon={<IconTrash width={18} />} onClick={() => removeDetails(countDetails)}>
                        Supprimer
                    </Button>
                </Grid>
            </>
        );

        details.push(detail);
        setDetails([...details]);
    }

    const removeDetails = (id) => {
        details.slice(id, 1);
        setDetails(details);
    }

    const getDetails = () => {
        let titles = document.querySelectorAll('input[name="titleDetails[]"]');
        let values = document.querySelectorAll('input[name="detailValue[]"]');
        var detailsJson = {};

        for (let index = 0; index < titles.length; index++) {
            const title = titles[index].value;
            const value = values[index].value;
            detailsJson[title] = value;
        }
        return detailsJson;
    }

    return {
        details: details,
        addDetails,
        removeDetails,
        detailsJson: getDetails()
    }
}


export default useAddDetails;
