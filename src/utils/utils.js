import moment from "moment";

export function dateTimeValue(dateTime) {
    return Date.parse(dateTime);
}

export function dateTime(dateTime) {
    var newDate = null;
    if(dateTime) {
        if((dateTime instanceof Number || dateTime instanceof String)) {
            newDate = new Date(dateTime);
        } else if(dateTime instanceof Array) {
            newDate = new Date(...dateTime);
        } else {
            newDate = dateTime;
        }
    } else {
        newDate = new Date();
    }
    return moment(newDate).format('yyyy-MM-DDTHH:mm:ss');
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
    } else {
        newDate = new Date();
    }
    return moment(newDate).format('yyyy-MM-DD');
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