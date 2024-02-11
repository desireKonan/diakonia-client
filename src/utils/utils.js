import moment from "moment";

export function dateTimeValue(dateTime) {
    return Date.parse(dateTime);
}

export function date(dateValue) {
    var newDate = new Date(dateValue);
    return moment(newDate).format('yyyy-MM-DD');
}