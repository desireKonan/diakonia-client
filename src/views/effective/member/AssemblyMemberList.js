import { 
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Paper,
    TableContainer
} from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MemberService } from "src/services/member.service";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import { fetchMembers, deleteMember } from "src/store/features/effective/memberSlice";

const MemberMemberList = () => {
    const data = useSelector((state) => state.members);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();


    useEffect(() => {
        dispatch(fetchMembers(parseInt(params.id)));
    }, []);

    const deleteMemberById = (id) => {
        MemberService.deleteMember(id)
            .then((response) => dispatch(deleteMember(id)));
    }


    return (
        <PageContainer title={`Liste des membres de assemblée`} description="this is Custom Form page">
            <Breadcrumb title={`Liste des membres de assemblée`} subtitle="custom designed element" />
            <ParentCard title="Liste des membres d'une assemblée" action={
                <NavLink to={`/assemblee/${parseInt(params.id)}/membre`}>
                    <Button variant="contained" color="info">Ajouter une membre</Button>
                </NavLink>
            }>
                <Paper variant="outlined">
                    <TableContainer>
                        <Table
                            aria-label="simple table"
                            sx={{
                                whiteSpace: "nowrap",
                                mt: 2
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Nom
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Prénoms
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Profession
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Sexe
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Actions
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.members.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {member.firstName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {member.lastName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {member.profession}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {member.sex}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="warning" onClick={(e) => navigate(`/assemblee/${member.assemblyId}/membre/${member.id}`)} style={{margin: 5}}> Modifier </Button>
                                            <Button variant="contained" color="error" onClick={(e) => deleteMemberById(member.memberId)} style={{margin: 5}}> Supprimer </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}


export default MemberMemberList;