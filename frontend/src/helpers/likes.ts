import { api as axios } from '@/lib/axios'

export async function toggleLike(postId: string) {
    const response = await axios.put('/like/post/' + postId);
    const responseData = response.data;
    if (response.status === 200) {
        return responseData;
    }
    return null;
}
