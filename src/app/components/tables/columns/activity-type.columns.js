import { date } from "src/app/services/utils";

export const ACTIVITY_TYPE_HEADERS = [
    { id: 'id', label: 'Id', width: '10%' },
    { id: 'label', label: 'Nom', width: '20%' },
    { id: 'description', label: 'Description', width: '25%' },
    { id: 'createdAt', label: 'Date de création', width: '15%', format: (_) => date(_) },
    { id: 'updatedAt', label: 'Date de mise à jour', width: '15%', format: (_) => date(_) },
];