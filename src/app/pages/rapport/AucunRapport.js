import { Paper, Typography } from "@mui/material";
import PageContainer from "src/_ui/components/container/PageContainer";
import ParentCard from "src/_ui/components/shared/ParentCard";
import Breadcrumb from "src/_ui/layouts/full/shared/breadcrumb/Breadcrumb";

const AucunRapport = () => {
    return (
        <PageContainer title="Rapport d'effectifs de la zone" description="Rapport d'effectifs de la zone">
            <Breadcrumb title="Rapport d'effectifs de la zone" subtitle="Rapport d'effectifs de la zone" />
            <ParentCard title="Rapport d'effectifs de la zone" action={null}>
                <Paper variant="outlined">
                    <Typography>
                        Ce type de rapport pour cette zone n'existe pas ! <br/>
                        Les rapports de rencontres concernent les zones, les sous-zones et les assemblées.
                    </Typography>
                </Paper>
            </ParentCard>
        </PageContainer>
    )
}


export default AucunRapport;