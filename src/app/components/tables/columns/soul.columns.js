import { date } from "src/app/services/utils";

export const AMES_HEADER_CELLS = [
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
        id: 'contacts',
        label: 'Contacts',
        minWidth: 200,
        render: (contacts) => {
            return (
                <ul>
                    {
                        contacts.map(contact => (
                            <li key={contact}> {contact} </li>
                        ))
                    }
                </ul>
            )
        }
    },
    {
        id: 'place',
        label: 'Lieu',
        minWidth: 200
    },
    {
        id: 'repentDate',
        label: 'Date de repentance',
        minWidth: 200,
        render: (_) => date(_)
    },
    {
        id: 'baptizeDate',
        label: 'Date de baptême',
        minWidth: 200,
        render: (_) => date(_)
    },
    {
        id: 'integrationDate',
        label: 'Date d\'intégration',
        minWidth: 200,
        render: (_) => date(_)
    },
    {
        id: 'evangelizeDate',
        label: 'Date d\'évangélisation',
        minWidth: 200,
        render: (_) => date(_)
    },
];