export const APIFetch = (baseUrl: string) => async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  const response = await fetch(baseUrl + url, options);
  if (!response.ok) {
    let err;
    try {
      err = await response.json();
    } catch (e) {
      err = await response.text();
    }
    throw new Error(`Response error: ${err}`);
  } else if (response.status === 204) {
    return null;
  } else {
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(`Error decoding JSON response: ${e}`);
    }
    return data;
  }
};

export const APIPatchOptions = (payload: any): RequestInit => ({
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});

export const APIUseCredentials = (options: RequestInit): RequestInit => ({
  ...options,
  credentials: "include"
});

const IDAPI_URL = "https://idapi.code.dev-theguardian.com";
export const identityFetch = APIFetch(IDAPI_URL);