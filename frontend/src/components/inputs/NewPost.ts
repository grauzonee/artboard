export const inputs = {
    title: {
        name: "title",
        label: "Title",
        validation: {
            minLength: {
                value: 1,
                message: "Title is required"
            },
        }
    },
    description: {
        name: "description",
        label: "Description",
        type: "textarea"
    },
    image: {
        name: "postImage",
        label: "Select image",
        type: "drop"
    }
}
