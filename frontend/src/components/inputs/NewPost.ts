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
    content: {
        name: "content",
        label: "Description",
        type: "textarea"
    },
    image: {
        name: "imageUrl",
        label: "Select image",
        type: "drop"
    },
}
