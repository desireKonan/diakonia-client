import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box } from '@mui/material';
import CustomTextField from "../forms/theme-elements/CustomTextField";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";

const CustomDialog = ({ label, title, form, color }) => {
    const [open , setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color={ !color ? "primary": "warning" } fullWidth onClick={openDialog}>
               { label }
            </Button>
            <Dialog fullWidth={600} open={open} onClose={closeDialog}>
                <Breadcrumb title={ title }/>
                <DialogContent>
                    { form }
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={closeDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


export default CustomDialog;