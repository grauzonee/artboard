export const email = {
    email: {
        name: "email",
        label: "Email",
        validation: {
            regex: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address"
            }
        }

    }
}
