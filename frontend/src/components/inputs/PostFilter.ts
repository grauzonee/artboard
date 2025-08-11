import { username } from "./Username"

export const inputs = {
    ...username,
    title: {
        name: "title",
        label: "Post title"
    },
    createdAtFrom: {
        name: "createdAtFrom",
        label: "From",
        type: "date"
    },
    createdAtTill: {
        name: "createdAtTill",
        label: "Till",
        type: "date"
    }
}



