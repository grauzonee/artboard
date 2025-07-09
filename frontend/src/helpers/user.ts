import { api as axios, setToken, getBearerToken } from '@/lib/axios'
import { User } from '@/types/User'
import { LoginRequest } from '@/types/requests/LoginRequest';
import { SignUpRequest } from '@/types/requests/SignUpRequest';

export async function getUser(): Promise<User | null> {
    if (getBearerToken() === false) {
        return null;
    }
    try {
        const response = await axios.get('/auth/profile');
        const responseData = response.data;
        console.log(responseData);
        if (response.status === 200) {
            return responseData.data;
        }
        return null;
    } catch {
        return null;
    }
}
export async function logIn(formData: LoginRequest): Promise<User | null> {
    const response = await axios.post('/auth/login', formData);
    const responseData = response.data;
    if (response.status === 200 && responseData.data?.token) {
        const token = responseData.data.token;
        setToken(token);
        return responseData.data
    }
    return null;
}
export async function signUp(formData: SignUpRequest): Promise<User | null> {

    const response = await axios.post('/auth/register', formData);
    const responseData = response.data;
    if (response.status === 201 && responseData.data?.token) {
        const token = responseData.data.token;
        setToken(token);
        return responseData.data;
    }
    return null;
}
