import { useState } from "react";
import { Button, Dialog, DialogContent, DialogActions, Tooltip, IconButton } from '@mui/material';
import Breadcrumb from "src/_ui/layouts/full/shared/breadcrumb/Breadcrumb";
import { IconEdit, IconPlus } from "@tabler/icons";

export const useDialogEvent = () => {
    const [open, setOpen] = useState(false);

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


export const DiakoniaButtonDialog = ({ label, isIconButton = false, isSimple = false, openDialog = () => { } }) => {
    isIconButton ? (
        <Tooltip title={label}>
            <IconButton
                variant="contained"
                color={isSimple ? "primary" : "warning"}
                onClick={openDialog}
                style={{ margin: 5 }}
            >
                {isSimple ? (<IconPlus width={30} height={30} />) : (<IconEdit width={30} height={30} />)}
            </IconButton>
        </Tooltip>
    ) : (
        <Button variant="contained" color={isSimple ? "primary" : "warning"} onClick={openDialog}>
            {label}
        </Button>
    );
}


export const DiakoniaDialog = ({ children, title, open = false, fullWidth = true, maxWidth = 'lg', closeDialog = () => { } }) => {
    return (
        <>
            <Dialog fullWidth={fullWidth} open={open} maxWidth={maxWidth} onClose={closeDialog}>
                <Breadcrumb title={title} />
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={closeDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}