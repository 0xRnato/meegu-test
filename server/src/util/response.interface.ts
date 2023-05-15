interface IResponse<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

export default IResponse;
