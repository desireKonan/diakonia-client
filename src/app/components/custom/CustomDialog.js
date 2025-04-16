import { useState } from "react";
import { Button, Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import Breadcrumb from "src/_ui/layouts/full/shared/breadcrumb/Breadcrumb";
import { IconEdit, IconPlus } from "@tabler/icons";
import Tooltip from '@mui/material/Tooltip';


const CustomDialog = ({ isIconButton, label, title, form, color }) => {
    const [open , setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <>
            {
                isIconButton ? (
                    <Tooltip title="Modifier une assemblée">
                        <IconButton
                            variant="contained" 
                            color={ !color ? "primary": "warning" } 
                            onClick={openDialog}
                            style={{margin: 5}}
                        >
                            { !color ? (<IconPlus width={30} height={30} />) : (<IconEdit width={30} height={30} />) }
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Button variant="contained" color={ !color ? "primary": "warning" } onClick={openDialog}>
                        { label }
                    </Button>
                )
            }
            
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