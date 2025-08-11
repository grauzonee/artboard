import { api as axios } from '@/lib/axios'
import type { CreatePostRequest } from "@/types/requests/CreatePostRequest";
import { PostFilter } from '@/types/PostFilter';

export async function getPosts(page: number, filters: PostFilter | null) {
    const url = '/posts/all';
    const urlParams = new URLSearchParams({
        page: page.toString()
    });

    if (filters) {
        const filterParams = filters.toURLSearchParams();
        filterParams.forEach((value, key) => {
            urlParams.append(key, value);
        });
    }

    const response = await axios.get(url, { params: urlParams });
    const responseData = response.data;
    console.log(responseData.data.docs);
    if (response.status === 200) {
        return responseData.data;
    }
    return null;
}
export async function addPost(formData: CreatePostRequest) {
    const response = await axios.post('/posts/create', formData);
    const responseData = response.data;
    if (response.status === 200) {
        return responseData;
    }
    return null;
}
export async function deletePost(postId: string) {
    const response = await axios.delete('/posts/' + postId);
    if (response.status === 200) {
        return true;
    }
    return null;
}
