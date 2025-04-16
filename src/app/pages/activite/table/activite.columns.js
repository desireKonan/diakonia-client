import { instantTime } from "src/app/services/utils";

export const ACTIVITE_HEADER_CELLS = [
    {
        id: 'id',
        label: 'Id',
        minWidth: 150
    },
    {
        id: 'label',
        label: 'Libelle',
        minWidth: 200
    },
    {
        id: 'description',
        label: 'Description',
        minWidth: 200
    },
    {
        id: 'typeLabel',
        label: 'Type d\'activité',
        minWidth: 200
    },
    {
        id: 'details',
        label: 'Details',
        minWidth: 200
    },
    {
        id: 'createdAt',
        label: 'Date de creation',
        minWidth: 150,
        render: (createdAt) => {
            console.log(createdAt);
            return instantTime(createdAt);
        }
    },
];