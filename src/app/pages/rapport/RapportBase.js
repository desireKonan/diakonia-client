import EffectiveZoneRapport from "./EffectifZoneRapport";
import EffectiveSousZoneRapport from "./sous-zone/EffectifSousZoneRapport";
import AucunRapport from "./AucunRapport";
import EffectifAssembleeRapport from "./assemblee/EffectifAssembleeRapport";
import { useAuth } from "src/app/services/useAuth";
import { ROLES } from "src/app/services/utils";

const RapportBase = () => {
    const { user } = useAuth();

    if(user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ZONE)) {
        return <EffectiveZoneRapport zone={user.place.assembly}/>;
    } else if(user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE)) {
        return <EffectiveSousZoneRapport subzone={user.place.sub_zone}/>;
    } else if(user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE)) {
        return <EffectifAssembleeRapport assemblee={user.place.assembly}/>;
    } else {
        return <AucunRapport />;
    }
}


export default RapportBase;