export type CreatePostRequest = {
    image: string;
    title: string;
    description?: string;
    materials?: string[]
}

export type UpdatePostRequest = {
    [P in keyof CreatePostRequest]?: CreatePostRequest[P]
}
