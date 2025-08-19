import { api as axios } from '@/lib/axios'
import type { BaseFilterData, AuthorFilterData } from '@/types/BaseFilter';
import { BaseFilter } from '@/types/BaseFilter';
import type { CreateCommentRequest } from '@/types/requests/CreateCommentRequest';

export type CommentFilterData = BaseFilterData & AuthorFilterData;

export async function getComments(page: number, filters: CommentFilterData | null) {
    const url = '/comments/all';
    const urlParams = new URLSearchParams({
        page: page.toString()
    });

    if (filters) {
        const filterParams = new BaseFilter<CommentFilterData>(filters).toURLSearchParams();
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

export async function addComment(formData: CreateCommentRequest) {
    const response = await axios.post('/comments/create', formData);
    const responseData = response.data;
    if (response.status === 200) {
        return responseData;
    }
    return null;
}
