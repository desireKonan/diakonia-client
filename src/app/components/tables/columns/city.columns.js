import { instant } from "src/app/services/utils";

export const CITY_HEADERS = [
    { id: 'reference', label: 'Id', width: '10%' },
    { id: 'name', label: 'Nom', width: '20%' },
    { id: 'createdAt', label: 'Date de création', width: '15%', format: (_) => instant(_) },
    { id: 'updatedAt', label: 'Date de mise à jour', width: '15%', format: (_) => instant(_) },
];