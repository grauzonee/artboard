import { username } from "./Username";
import { email } from "./Email";
export const inputs = {
    ...username,
    ...email,
    name: {
        label: "Name",
        validation: {
            minLength: {
                value: 2,
                message: "Name should be at least 2 characters length"
            }
        }
    },
    surname: {
        label: "Surname",
        validation: {
            minLength: {
                value: 2,
                message: "Surname should be at least 2 characters length"
            }
        }
    },
    birthdate: {
        label: "Birthdate",
        inputType: "date"
    },
};

