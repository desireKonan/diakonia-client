import { dateTime } from "src/app/services/utils";

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
        id: 'localization',
        label: 'Lieu',
        minWidth: 200
    },
    {
        id: 'locationType',
        label: 'Type d\'eglise',
        minWidth: 200,
    },
    {
        id: 'meetingTypeLabel',
        label: 'Type de rencontre',
        minWidth: 200,
    },
    {
        id: 'start',
        label: 'Date de debut de la rencontre',
        minWidth: 200,
        render: (start) => dateTime(start)
    },
    {
        id: 'end',
        label: 'Date de fin de la rencontre',
        minWidth: 200,
        render: (end) => dateTime(end)
    },
];