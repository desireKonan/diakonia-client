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