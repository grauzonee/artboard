import { api as axios } from '@/lib/axios'
import type { BaseFilterData, AuthorFilterData } from '@/types/BaseFilter';
import { BaseFilter } from '@/types/BaseFilter';

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
