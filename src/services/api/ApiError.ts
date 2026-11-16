/** Lỗi chuẩn hóa của tầng gọi API. status = 0 nghĩa là lỗi mạng hoặc hết thời gian chờ. */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
