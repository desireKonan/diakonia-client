import {  
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,  
    TableRow,
    Paper,
    TableContainer
} from "@mui/material";
import ParentCard from "src/components/shared/ParentCard";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
//import RencontreForm from "./RencontreForm";
import useFetch from "src/app/services/useFetch";
import { useNavigate, useParams } from "react-router";


const RencontreList = () => {
    const params = useParams();
    const {data: assemblee, error, loading } = useFetch(`api/assemblee/${params.id}`, {});
    const navigate = useNavigate();
    
    const deleteRencontre = async(id) => {
        //await httpAdapter.deleteDatas(`api/rencontre/${id}`, data);
        //window.location.reload(true);
    }

    return (
        <div>
            { JSON.stringify(assemblee) }                
        </div>
    );
}


export default RencontreList;