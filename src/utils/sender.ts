// src/api/sender.ts
import axios, { type AxiosRequestConfig, type Method } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface SenderOptions<T = unknown> {
    url: string;
    method?: Method;
    data?: T;
    config?: AxiosRequestConfig;
}

export async function sender<TResponse = unknown, TData = unknown>({
                                                                       url,
                                                                       method = 'GET',
                                                                       data,
                                                                       config,
                                                                   }: SenderOptions<TData>): Promise<TResponse> {
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
        ...(config?.headers as Record<string, string>),
    };

    // On ajoute le token seulement s'il existe → pas d'erreur sinon
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.request<TResponse>({
        url: `${API_URL}${url}`,
        method,
        data,
        ...config,
        headers,
    });

    return response.data;
}