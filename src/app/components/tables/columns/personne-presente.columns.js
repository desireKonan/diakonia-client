import { dateTime } from "src/app/services/utils";

export const PERSONNES_HEADER_CELLS = [
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
        id: 'type',
        label: 'Type de personne',
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
        id: 'arrivingTime',
        label: 'Date d\'arrivée',
        minWidth: 200,
        render: (date) => dateTime(date)
    },
    {
        id: 'departureTime',
        label: 'Date de départ',
        minWidth: 200,
        render: (date) => dateTime(date)
    },
];