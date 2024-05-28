import { useState } from "react";
import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";

const useDialogEvent = () => {
    const [open , setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
        console.log(open);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return {
        open,
        openDialog,
        closeDialog
    }
}


const CustomDialog2 = ({ title, form, open = false, fullWidth = true, maxWidth = 'lg', closeDialog = () => {}}) => {
    return (
        <>
            <Dialog fullWidth={fullWidth} open={open} maxWidth={maxWidth} onClose={closeDialog}>
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


export {
    CustomDialog2,
    useDialogEvent
};