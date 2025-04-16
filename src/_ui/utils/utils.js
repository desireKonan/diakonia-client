import moment from "moment";

export function dateTimeValue(dateTime) {
    return Date.parse(dateTime);
}

export function instant(dateTime) {
    if(!dateTime) {
        return 'Aucune date';
    }
    return new Date(dateTime).toUTCString();
}

export function dateTime(datetime) {
    return datetime ? 
        moment(datetime, 'DD-MM-yyyy HH:mm:ss').format('yyyy-MM-DDTHH:mm:ss') : 'Aucune date';
}

export function dateTimeView(dateTime) {
    return dateTime ?
        moment(dateTime, 'DD-MM-yyyy HH:mm:ss').format('DD-MM-yyyy HH:mm:ss') : 'Aucun temps';
}

export function instantTime(dateTime) {
    return dateTime ? moment(dateTime, 'yyyy-MM-DDTHH:mm:ss.sssZ').format('yyyy-MM-DDTHH:mm:ss.sssZ') : 'Aucun temps';
}

export function month(monthYear) {
    return monthYear ? moment(monthYear).format('MM/yyyy') : 'Aucun mois !';
}

export function year(_year) {
    return _year ? moment(_year).format('yyyy') : 'Aucune année';
}


export function date(dateValue) {
    return dateValue ? moment(dateValue, 'MM-DD-yyyy').format('yyyy-MM-DD') : 'Aucune date !';
}

export function date2(dateVal) {
    return dateVal ? moment(dateVal).format('yyyy-MM-DD') : 'Aucune date !';
}

export function date3(dateValue) {
    return dateValue ? moment(dateValue, 'DD-MM-yyyy').format('DD-MM-yyyy') : 'Aucune date !';
}


export function mapParticipant(participant) {
    return ({
        id: participant.id,
        fullname: participant.fullname,
        discipleId: participant.discipleId,
        details: participant.details,
        prevStartDate: participant.prevStartDate,
        prevEndDate: participant.prevEndDate,
        effectiveStartDate: participant.effectiveStartDate,
        effectiveEndDate: participant.effectiveEndDate
    });
}


export function nameMeeting(type, assemblyName, date) {
    let name = '';
    switch (type) {
        case MeetingType.CULT:
            name = `Culte d'adoration et de louange de l'assemblée ${assemblyName} du ${date}`;
            break;
        case MeetingType.BREAKING_LINK:
            name = `Brisement de liens de l'assemblée ${assemblyName} du ${date}`;
            break;
        case MeetingType.COMMON_CULT:
            name = `Culte commun de l'assemblée ${assemblyName} du ${date}`;
            break;
        case MeetingType.SPECIAL_MEETING:
            name = `Rencontre spéciale de l'assemblée ${assemblyName} du ${date}`;
            break;
        case MeetingType.PRAYER_MEETING:
            name = `Rencontre de prières de l'assemblée ${assemblyName} du ${date}`;
                break;
        default:
            break;
    }
    return name;
}


export function titleDashboard(key) {
    let title = '';
    switch (key) {
        case 'adult_count':
            title = `Nombre d'adultes`;
            break;
        case 'child_count':
            title = `Nombre d'enfants`;
            break;
        case 'guest_count':
            title = `Nombre d'invités`;
            break;
        case 'visitor_count':
            title = `Nombre de visiteurs`;
            break;
        default:
            break;
    }
    return title;
}


export function isIncludeIn(arrayToSearch, subArray) {
    let isAuthorize;
    for (let index = 0; index < arrayToSearch.length; index++) {
        // En fonction du nombre de roles et de l'autorization du lien, on calcule la somme des autorizations et des liens, si oui l'écran est autorisé, si non c'est non-autorisé.
        if(subArray.includes(arrayToSearch[index])) {
            isAuthorize = true;
        } else {
            isAuthorize |= false;
        }
    }
    return isAuthorize;
}


export function meetingDetailsTitle(key) {
    let title = '';
    switch (key) {
        case 'adultCount':
            title = `Nombre d'adultes`;
            break;
        case 'childCount':
            title = `Nombre d'enfants`;
            break;
        case 'guestCount':
            title = `Nombre d'invités`;
            break;
        case 'visitorCount':
            title = `Nombre de visiteurs`;
            break;
        case 'titheAndGift':
            title = `Total Don et offrandes`;
            break;
        case 'attiekoiGift':
            title = `Total Don attiékoi`;
            break;
        default:
            break;
    }
    return title;
}


export const LocationType = Object.freeze({
    ZONE: "ZONE",
    SUB_ZONE: "SUB_ZONE",
    HOUSE_CHURCH: "HOUSE_CHURCH"
});


export const PersonType = Object.freeze({
    BROTHER: "BROTHER",
    GUEST: "GUEST",
    VISITOR: "VISITOR"
});

export const SEX = Object.freeze({
    MALE: "MALE",
    FEMALE: "FEMALE"
});


export const MeetingType = Object.freeze({
    CULT: "CULT",
    COMMON_CULT: "COMMON_CULT",
    PRAYER_MEETING: "PRAYER_MEETING",
    BREAKING_LINK: "BREAKING_LINK",
    SPECIAL_MEETING: "SPECIAL_MEETING"
});


export const ROLES = Object.freeze({
    ADMIN: "ADMIN",
    RESPONSABLE_EFFECTIF_ASSEMBLEE : "RESPONSABLE_EFFECTIF_ASSEMBLEE",
    RESPONSABLE_EFFECTIF_SOUS_ZONE : "RESPONSABLE_EFFECTIF_SOUS_ZONE",
    RESPONSABLE_EFFECTIF_ZONE : "RESPONSABLE_EFFECTIF_ZONE"
});

