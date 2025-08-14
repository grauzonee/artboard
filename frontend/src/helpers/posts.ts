import { api as axios } from '@/lib/axios'
import type { CreatePostRequest, UpdatePostRequest } from "@/types/requests/CreatePostRequest";
import { type BaseFilterData, type AuthorFilterData, BaseFilter } from '@/types/BaseFilter';

export type PostFilterData = BaseFilterData & AuthorFilterData & {
    materials: string[] | null;
}

export async function getPosts(page: number, filters: PostFilterData | null) {
    const url = '/posts/all';
    const urlParams = new URLSearchParams({
        page: page.toString()
    });

    if (filters) {
        const filterParams = new BaseFilter<PostFilterData>(filters).toURLSearchParams();
        filterParams.forEach((value, key) => {
            urlParams.append(key, value);
        });
    }

    const response = await axios.get(url, { params: urlParams });
    const responseData = response.data;
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
export async function updatePost(postId: string, formData: UpdatePostRequest) {
    const response = await axios.put('/posts/' + postId, formData);
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
