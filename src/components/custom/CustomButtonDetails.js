import { Button } from "@mui/material";
import React from "react";


const CustomButtonDetails = React.forwardRef((props, ref) => {
    console.log(ref);
    return (
        <Button ref={ref} variant="contained" color="info">
            { props.label }
        </Button>
    );
}); 


export default CustomButtonDetails;