import { api as axios } from '@/lib/axios'
import type { PostFilterData } from '@/helpers/posts';

export async function toggleLike(postId: string) {
    const response = await axios.put('/like/posts/' + postId);
    const responseData = response.data;
    if (response.status === 200) {
        return responseData;
    }
    return null;
}

export async function getLikedPosts(page: number, filters: PostFilterData | null) {
    const url = '/like/posts';
    const urlParams = new URLSearchParams({
        page: page.toString()
    });

    if (filters) {
        const filterParams = new BaseFilter<PostFilterData>(filters).toURLSearchParams();
        filterParams.forEach((value, key) => {
            urlParams.append(key, value);
        });
    }
    console.log("filters", filters)
    const response = await axios.get(url, { params: urlParams });
    const responseData = response.data;
    if (response.status === 200) {
        return responseData.data;
    }
    return null;
}
