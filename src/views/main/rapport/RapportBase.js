import EffectiveZoneRapport from "./EffectifZoneRapport";
import EffectiveSousZoneRapport from "./EffectifSousZoneRapport";
import { useSearchParams } from "react-router-dom";
import AucunRapport from "./AucunRapport";

const RapportBase = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    if(searchParams.get('type_zone') === 'zone') {
        return <EffectiveZoneRapport zone={'Cocody'}/>;
    } else if(searchParams.get('type_zone') === 'sous_zone') {
        return <EffectiveSousZoneRapport subzone={'Angré'}/>;
    } else {
        return <AucunRapport />;
    }
}


export default RapportBase;