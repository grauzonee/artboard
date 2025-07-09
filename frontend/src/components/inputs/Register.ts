export const inputs = {
    username: {
        name: "username",
        label: "Username",
        validation: {
            minLength: {
                value: 5,
                message: "Username should be at least 5 characters length"
            }
        }
    },
    email: {
        name: "email",
        label: "Email",
        validation: {
            regex: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address"
            }
        }

    },
    password: {
        name: "password",
        label: "Password",
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
