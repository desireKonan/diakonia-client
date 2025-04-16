import { Grid, Button, Stack, Typography } from "@mui/material";
import React from "react";


const AddButtonDetails = ({ typography , label, onClicked }) => {
    return (
        <Grid item xs={12} sm={12} lg={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" color="textSecondary">
                    { typography }
                </Typography>
                <Button variant="contained" color="primary" onClick={onClicked}>
                    { label }
                </Button>
            </Stack>
        </Grid>

    );
};


export default AddButtonDetails;