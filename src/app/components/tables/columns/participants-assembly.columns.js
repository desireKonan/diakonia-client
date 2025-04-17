import { date } from "src/app/services/utils";

export const PARTICIPANTS_ASSEMBLY_HEADER_CELLS = [
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
        label: 'Type de participants',
        minWidth: 200
    },
    {
        id: 'sex',
        label: 'Sexe',
        minWidth: 200
    },
    {
        id: 'contacts',
        label: 'Contacts',
        minWidth: 200,
        render: (contacts) => {
            return (
                <ul>
                    {contacts.map(contact => (
                        <li> {contact} </li>
                    ))}
                </ul>
            )
        }
    },
    {
        id: 'birthdate',
        label: 'Date de naissance',
        minWidth: 200,
        render: (_) => date(_)
    }
];