import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box } from '@mui/material';
import CustomTextField from "../forms/theme-elements/CustomTextField";

const CustomDialog = ({ label, title, description, form }) => {
    const [open , setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color="warning" fullWidth onClick={openDialog}>
               { label }
            </Button>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle> { title } </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { description }
                    </DialogContentText>
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