import {config} from '../../config/env';
import {ApiError} from './ApiError';

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const res = await fetch(`${config.apiBaseUrl}${path}`, {
      ...init,
      headers: {'Content-Type': 'application/json'},
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new ApiError(res.status, `Yêu cầu thất bại (${res.status})`);
    }
    return (await res.json()) as T;
  } catch (e) {
    if (e instanceof ApiError) {
      throw e;
    }
    const timedOut = e instanceof Error && e.name === 'AbortError';
    throw new ApiError(0, timedOut ? 'Hết thời gian chờ' : 'Không thể kết nối máy chủ');
  } finally {
    clearTimeout(timer);
  }
}

/** HTTP client dùng chung cho mọi service của mini app. */
export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {method: 'POST', body: JSON.stringify(body)}),
};
