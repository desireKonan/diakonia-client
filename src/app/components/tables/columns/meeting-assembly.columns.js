import { dateTimeView } from "src/app/services/utils";

export const RENCONTRES_HEADER_CELLS = [
    {
        id: 'id',
        label: 'Id',
        minWidth: 150
    },
    {
        id: 'label',
        label: 'Libéllé',
        minWidth: 200
    },
    {
        id: 'meetingType',
        label: 'Type de rencontre',
        minWidth: 200
    },
    {
        id: 'details',
        label: 'Details de rencontre',
        minWidth: 200,
        render: (row) => {
            console.log(row);
            return JSON.stringify(row);
        }
    },
    {
        id: 'start',
        label: 'Date de début',
        minWidth: 200,
        render: (start) => {
            console.log(start);
            return dateTimeView(start);
        }
    },
    {
        id: 'end',
        label: 'Date de fin',
        minWidth: 200,
        render: (end) => {
            console.log(end);
            return dateTimeView(end);
        }
    },
];