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


const CustomDialog2 = ({ title, form, open = false, closeDialog = () => {}}) => {
    return (
        <>
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


export {
    CustomDialog2,
    useDialogEvent
};