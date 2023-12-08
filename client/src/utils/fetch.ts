import { getTokenFromCookie } from "./cookies";

export function fetchWrapper<TData, TError = string>(
  ...args: Parameters<typeof fetch>
): Promise<TData> {
  const headers = new Headers(args[1]?.headers || {});
  if (!headers.has("content-type")) {
    headers.append("content-type", "application/json");
  }
  const token = getTokenFromCookie();
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return fetch(args[0], { ...args[1], headers, credentials: "include" }).then(
    async (response) => {
      const data = (response.headers.get("content-type") || "").includes(
        "application/json"
      )
        ? await response.json()
        : await response.text();

      return response.ok
        ? Promise.resolve(data)
        : Promise.reject({ data: data as TError, status: response.status });
    }
  );
}
