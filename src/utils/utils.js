import moment from "moment";

export function dateTimeValue(dateTime) {
    return Date.parse(dateTime);
}

export function date(dateValue) {
    var newDate = null;
    if(dateValue) {
        newDate = new Date(dateValue);
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