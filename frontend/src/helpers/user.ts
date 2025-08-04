import { api as axios, setToken, getBearerToken } from '@/lib/axios'
import type { User } from '@/types/User'
import type { LoginRequest } from '@/types/requests/LoginRequest';
import type { SignUpRequest } from '@/types/requests/SignUpRequest';
import type { UpdateUserRequest } from '@/types/requests/UpdateUserRequest';

export async function getUser(id: string | null): Promise<User | null> {
    if (getBearerToken() === false) {
        return null;
    }
    try {
        let url = '/user'
        if (id) {
            url += '?id=' + id
        }
        const response = await axios.get(url);
        const responseData = response.data;
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
        const userId = responseData.data.id;
        setToken(token);
        localStorage.setItem('userId', userId);
        return responseData.data
    }
    return null;
}
export async function signUp(formData: SignUpRequest): Promise<User | null> {
    const response = await axios.post('/auth/register', formData);
    const responseData = response.data;
    if (response.status === 201 && responseData.data?.token) {
        const token = responseData.data.token;
        const userId = responseData.data.userId;
        setToken(token);
        localStorage.setItem('userId', userId);
        return responseData.data;
    }
    return null;
}
export async function updateUser(formData: UpdateUserRequest): Promise<User | null> {
    const response = await axios.put('/user', formData);
    const responseData = response.data;
    if (response.status === 200 && responseData.data) {
        return responseData.data;
    }
    return null;
}
export function getCurrentUserId() {
    return localStorage.getItem('userId');
}
