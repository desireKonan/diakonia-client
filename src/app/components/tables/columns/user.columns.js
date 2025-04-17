export const UTILISATEURS_HEADER_CELLS = [
    {
        id: 'id',
        label: 'Id',
        minWidth: 150
    },
    {
        id: 'firstname',
        label: 'Nom',
        minWidth: 200
    },
    {
        id: 'lastname',
        label: 'Prenoms',
        minWidth: 200
    },
    {
        id: 'roles',
        label: 'Roles',
        minWidth: 200,
        render: (roles) => {
            console.log(roles);
            return JSON.stringify(roles);
        }
    },
];