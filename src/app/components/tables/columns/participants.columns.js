import { date } from "src/app/services/utils";

export const PARTICIPANTS_HEADER_CELLS = [
    {
        id: 'id',
        label: 'Id',
        minWidth: 150
    },
    {
        id: 'fullname',
        label: 'Nom complet',
        minWidth: 200
    },
    {
        id: 'prevStartDate',
        label: 'Date previsionnelle de debut',
        minWidth: 200,
        render: (createdAt) => {
            console.log(createdAt);
            return date(createdAt);
        }
    },
    {
        id: 'prevEndDate',
        label: 'Date previsionnelle de fin',
        minWidth: 200,
        render: (createdAt) => {
            console.log(createdAt);
            return date(createdAt);
        }
    },
    {
        id: 'effectiveStartDate',
        label: 'Date effective de fin',
        minWidth: 200,
        render: (createdAt) => {
            console.log(createdAt);
            return date(createdAt);
        }
    },
    {
        id: 'effectiveEndDate',
        label: 'Date effective de fin',
        minWidth: 200,
        render: (createdAt) => {
            console.log(createdAt);
            return date(createdAt);
        }
    },
    {
        id: 'createdAt',
        label: 'Date de creation',
        minWidth: 150,
        render: (createdAt) => {
            console.log(createdAt);
            return date(createdAt);
        }
    },
];