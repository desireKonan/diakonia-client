import { date3, dateTime } from "src/app/services/utils";

export const MEMBRES_HEADER_CELLS = [
    {
        id: 'id',
        label: 'Id',
        minWidth: 150
    },
    {
        id: 'fullname',
        label: 'Nom et prénoms',
        minWidth: 200
    },
    {
        id: 'discipleMaker',
        label: 'Faiseur de disciples',
        minWidth: 200,
    },
    {
        id: 'birthDate',
        label: 'Date de naissance',
        minWidth: 200,
        render: (row) => date3(row)
    },
    {
        id: 'profession',
        label: 'Profession',
        minWidth: 200,
    },
    {
        id: 'sex_value',
        label: 'Sexe',
        minWidth: 200,
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
        id: 'active',
        label: 'Est Actif ?',
        minWidth: 200,
        render: (active) => active ? 'Vrai' : 'Faux'
    },
    {
        id: 'isLeader',
        label: 'Est dirigeant ?',
        minWidth: 200,
        render: (isLeader) => isLeader ? 'Vrai' : 'Faux'
    },
    {
        id: 'establishedAt',
        label: 'Rejoint le',
        minWidth: 200,
        render: (date) => dateTime(date)
    },
    {
        id: 'rejoinedAt',
        label: 'Etabli le',
        minWidth: 200,
        render: (date) => dateTime(date)
    },
    {
        id: 'leftAt',
        label: 'Quittez le',
        minWidth: 200,
        render: (date) => dateTime(date)
    },
];