import { api as axios, getBearerToken } from '@/lib/axios'

export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    if (getBearerToken() === false) {
        return null;
    }
    try {
        const response = await axios.post('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const responseData = response.data;
        if (response.status === 201) {
            return responseData.data;
        }
        return null;
    } catch {
        return null;
    }
}
