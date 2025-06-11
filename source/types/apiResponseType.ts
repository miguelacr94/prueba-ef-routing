// types/api-response.ts
export interface ApiResponse<T = any> {
  // Eliminamos el campo 'data' ya que la respuesta es directa
  [key: string]: any; // Para propiedades adicionales que pueda tener la respuesta
  success?: boolean;
  info?: string;
  error?: {
    message: string;
    code?: number;
  };
  // La respuesta ES el array T (ServiceRequest[])
}

export interface ApiError {
  response?: {
    data?: {
      info?: string;
      message?: string;
      [key: string]: any;
    };
  };
  message?: string;
}
