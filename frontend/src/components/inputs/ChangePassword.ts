export const inputs = {
    oldPassword: {
        name: "oldPassword",
        label: "Old password",
    },
    newPassword: {
        name: "newPassword",
        label: "New password",
        validation: {
            minLength: {
                value: 5,
                message: "Password should be at least 5 signs length"
            },
            regex: {
                value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                message: "Password should contain at least 1 number and 1 character"
            }
        }
    }
}
