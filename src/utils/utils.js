import moment from "moment";

export function dateTimeValue(dateTime) {
    return Date.parse(dateTime);
}

export function instant(dateTime) {
    if(!dateTime) {
        return 'Aucune date';
    }
    console.log(dateTime);
    return new Date(dateTime).toUTCString();
}

export function dateTime(dateTime) {
    var newDate = null;
    if(dateTime) {
        if((dateTime instanceof Number || dateTime instanceof String)) {
            return new Date(dateTime);
        } else if(dateTime instanceof Array) {
            newDate = new Date(...dateTime);
        } else {
            newDate = dateTime;
        }
        return moment(newDate).format('yyyy-MM-DDThh:mm:ss');
    } 
    return 'Aucune Date';
}

export function instantTime(dateTime) {
    var newDate = null;
    if(dateTime) {
        if((dateTime instanceof Number || dateTime instanceof String)) {
            return new Date(dateTime);
        } else if(dateTime instanceof Array) {
            newDate = new Date(...dateTime);
        } else {
            newDate = dateTime;
        }
        return moment(newDate).format('yyyy-MM-DDTHH:mm:ss.sssZ');
    } 
    return 'Aucune Date';
}


export function date(dateValue) {
    var newDate = null;
    if(dateValue) {
        if(dateValue instanceof Number || dateValue instanceof String) {
            newDate = new Date(dateValue);
        } else if(dateValue instanceof Array) {
            newDate = new Date(...dateValue);
        } else {
            newDate = dateValue;
        }
        return moment(newDate).format('yyyy-MM-DD');
    } 
    return 'Aucune date';
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


export function nameMeeting(type, assemblyName) {
    let name = '';
    switch (type) {
        case MeetingType.CULT:
            name = `Culte d'adoration et de louange de l'${assemblyName}`;
            break;
        case MeetingType.BREAKING_LINK:
            name = `Brisement de liens de l'${assemblyName}`;
            break;
        case MeetingType.COMMON_CULT:
            name = `Culte commun de l'${assemblyName}`;
            break;
        case MeetingType.SPECIAL_MEETING:
            name = `Rencontre spéciale de l'${assemblyName}`;
            break;
        case MeetingType.PRAYER_MEETING:
            name = `Rencontre de prières de l'${assemblyName}`;
                break;
        default:
            break;
    }
    return name;
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