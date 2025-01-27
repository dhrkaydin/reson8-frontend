import { useState, useCallback } from "react";
import apiClient from "../api/apiClient";

type HttpProtocol = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (method: HttpProtocol, url: string, payload?: any) => Promise<void>;
}

const useApi = <T,>(): UseApiResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (method: HttpProtocol, url: string, payload?: any) => {
        setLoading(true);
        setError(null);
        setData(null);
        
        try {
            let response;
            switch (method) {
                case 'GET':
                    response = await apiClient.get<T>(url);
                    break;
                case 'POST':
                    response = await apiClient.post<T>(url, payload);
                    break;
                case 'PUT':
                    response = await apiClient.put<T>(url, payload);
                    break;
                case 'DELETE':
                    response = await apiClient.delete<T>(url);
                    break;
                default:
                    throw new Error('Invalid HTTP method');
            }
            setData(response.data);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []); // `execute` won't change on every render.

    return { data, loading, error, execute };
};

export default useApi;