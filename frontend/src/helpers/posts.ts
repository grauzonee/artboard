import { api as axios } from '@/lib/axios'
import type { CreatePostRequest } from "@/types/requests/CreatePostRequest";

export async function getPosts(page: number, author: string | null, sortByDesc: string | null) {
    let url = '/posts/all?limit=10&page=' + page;
    if (author) {
        url += '/' + author;
    }
    if (sortByDesc) {
        url += '&sortByDesc=' + sortByDesc;
    }
    const response = await axios.get(url);
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
