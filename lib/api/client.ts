import { APIError } from "./error"

const OUTPOST_API_BASE_URL = `/api/`
const IAM_API_BASE_URL = "/api/iam/"

async function get<T>(
  path: string,
  options: { headers: any } = { headers: {} },
  iam?: boolean
) {
  try {
    const { headers = {} } = options

    const res = await fetch(
      `${iam ? IAM_API_BASE_URL : OUTPOST_API_BASE_URL}${path}`,
      {
        method: "GET",
        headers,
      }
    )

    if (!res.ok || res.status >= 400) {
      throw new APIError({
        statusCode: res.status,
        statusMessage: res.statusText,
        message: (await res?.json())?.message,
      })
    }

    return {
      data: (await res.json()) as T,
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    }
  } catch (error) {
    if (error instanceof APIError) throw error

    throw new APIError({
      statusCode: -1,
      statusMessage: "Client Error",
      message: "Failed to make request client side",
    })
  }
}

async function post<T>(
  path: string,
  body: { [key: string]: any } = {},
  iam?: boolean,
  options: { headers: {} } = { headers: {} }
) {
  try {
    const { headers = {} } = options

    const res = await fetch(
      `${iam ? IAM_API_BASE_URL : OUTPOST_API_BASE_URL}${path}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      }
    )

    if (!res.ok || res.status >= 400) {
      throw new APIError({
        statusCode: res.status,
        statusMessage: res.statusText,
        message: (await res?.json())?.message,
      })
    }

    return {
      data: (await res.json()) as T,
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    }
  } catch (error) {
    if (error instanceof APIError) throw error
    console.error("ERROR", error)
    throw new APIError({
      statusCode: -1,
      statusMessage: "Client Error",
      message: "Failed to make request client side",
    })
  }
}

async function Delete<T>(
  path: string,
  iam?: boolean,
  options: { headers: any } = { headers: {} }
) {
  try {
    const { headers = {} } = options

    const res = await fetch(
      `${iam ? IAM_API_BASE_URL : OUTPOST_API_BASE_URL}${path}`,
      {
        method: "Delete",
        headers,
      }
    )

    const data = await res.json()

    if (!res.ok || res.status >= 400) {
      throw new APIError({
        statusCode: res.status,
        statusMessage: res.statusText,
        message: data?.message,
      })
    }

    return {
      data: data as T,
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    }
  } catch (error) {
    if (error instanceof APIError) throw error

    throw new APIError({
      statusCode: -1,
      statusMessage: "Client Error",
      message: "Failed to make request client side",
    })
  }
}

async function put<T>(
  path: string,
  body: any = {},
  iam?: boolean,
  options: { headers: {} } = { headers: {} }
) {
  try {
    const { headers = {} } = options

    const res = await fetch(
      `${iam ? IAM_API_BASE_URL : OUTPOST_API_BASE_URL}${path}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      }
    )

    if (!res.ok || res.status >= 400) {
      throw new APIError({
        statusCode: res.status,
        statusMessage: res.statusText,
      })
    }

    return {
      data: (await res.json()) as T,
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    }
  } catch (error) {
    if (error instanceof APIError) throw error

    throw new APIError({
      statusCode: -1,
      statusMessage: "Client Error",
      message: "Failed to make request client side",
    })
  }
}

export const outpostAPI = {
  get,
  post,
  Delete,
  put,
}
