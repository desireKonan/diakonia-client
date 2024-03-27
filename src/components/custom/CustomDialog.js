import { useState } from "react";
import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';
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
            <Button variant="contained" color={ !color ? "primary": "warning" } onClick={openDialog}>
               { label }
            </Button>
            <Dialog fullWidth={true} open={open} maxWidth={'lg'} onClose={closeDialog}>
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