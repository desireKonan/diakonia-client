import EffectiveZoneRapport from "./EffectifZoneRapport";
import EffectiveSousZoneRapport from "./EffectifSousZoneRapport";
import { useSearchParams } from "react-router-dom";
import AucunRapport from "./AucunRapport";
import EffectifAssembleeRapport from "./EffectifAssembleeRapport";

const RapportBase = () => {
    const [searchParams] = useSearchParams();

    if(searchParams.get('type_zone') === 'zone') {
        return <EffectiveZoneRapport zone={'Cocody'}/>;
    } else if(searchParams.get('type_zone') === 'sous_zone') {
        return <EffectiveSousZoneRapport subzone={'Angré'}/>;
    } else if(searchParams.get('type_zone') === 'assemblee') {
        return <EffectifAssembleeRapport assemblee={'BCEAO'}/>;
    } else {
        return <AucunRapport />;
    }
}


export default RapportBase;