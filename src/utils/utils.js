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
        return moment(newDate).format('yyyy-MM-DDTHH:mm:ss');
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