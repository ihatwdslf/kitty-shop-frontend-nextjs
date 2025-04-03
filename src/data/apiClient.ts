export const apiClient = async <T>(
    url: string,
    options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`http://localhost:8080/api/v1${url}`, {
    ...options,
    credentials: "include", // 🔹 Equivalent to axios `withCredentials: true`
    headers: {
      // "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
