import { DataFetchError } from "./error"

const OUTPOST_API_BASE_URL =
  (process.env.OUTPOST_API_URL as string) || "https://api.outpost.run/v1/"

const IAM_API_BASE_URL = process.env.IAM_API_URL

type Get = {
  path: string
  token: string
  next?: NextFetchRequestConfig
  cache?: RequestCache
}

export async function get<T>({ path, token, next, cache, ...options }: Get) {
  const url = `${OUTPOST_API_BASE_URL}${path}`
  console.log(url)
  const res = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      ...options,
    },
    next: {
      ...next,
    },
    cache: cache ? cache : "default",
  })
  try {
    if (!res.ok) {
      throw new DataFetchError(
        "message - " + res.statusText + " - " + res.status
      )
    } else {
      return {
        data: await (res.json() as Promise<T>),
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
      }
    }
  } catch (err: any) {
    console.error(err)
  }
}

type Post = {
  path: string
  token: string
  next?: NextFetchRequestConfig
  cache?: RequestCache
  body: any
}
export async function post<T>({
  path,
  token,
  next,
  cache,
  body,
  ...options
}: Post) {
  console.log("SERVER_SIDE_REQUEST")
  const url = `${OUTPOST_API_BASE_URL}${path}`
  console.log("URL: ", url)
  console.log("BODY: ", body)

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body ? body : {}),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options,
    },
    next: {
      ...next,
    },
    cache: cache ? cache : "default",
  })
  console.log(await res.json())

  try {
    if (!res.ok) {
      throw new DataFetchError(
        "message - " + res.statusText + " - " + res.status
      )
    } else {
      return {
        data: await (res.json() as Promise<T>),
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
      }
    }
    console.log(res)
  } catch (err: any) {
    console.error(err)
    return {
      data: null,
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    }
  }
}

type Put = {
  path: string
  token: string
  next?: NextFetchRequestConfig
  cache?: RequestCache
  body: any
}

export async function put<T>({
  path,
  token,
  next,
  cache,
  body,
  ...options
}: Put) {
  console.log("SERVER_SIDE_REQUEST")
  const url = `${OUTPOST_API_BASE_URL}${path}`
  console.log("URL: ", url)
  console.log("BODY: ", body)

  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body ? body : {}),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options,
    },
    next: {
      ...next,
    },
    cache: cache ? cache : "default",
  })
  console.log(await res.json())

  try {
    if (!res.ok) {
      throw new DataFetchError(
        "message - " + res.statusText + " - " + res.status
      )
    } else {
      return {
        data: await (res.json() as Promise<T>),
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
      }
    }
    console.log(res)
  } catch (err: any) {
    console.error(err)
    return {
      data: {},
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    }
  }
}

type Delete = {
  path: string
  token: string
  next?: NextFetchRequestConfig
  cache?: RequestCache
  iam?: boolean
}

export async function Delete<T>({
  path,
  token,
  next,
  cache,
  iam,
  ...options
}: Delete) {
  const url = iam
    ? (IAM_API_BASE_URL as string)
    : `${OUTPOST_API_BASE_URL}${path}`

  console.log(url)
  const res = await fetch(url, {
    method: "Delete",
    headers: {
      authorization: `Bearer ${token}`,
      ...options,
    },
    next: {
      ...next,
    },
    cache: cache ? cache : "default",
  })

  try {
    if (!res.ok) {
      throw new DataFetchError(
        "message - " + res.statusText + " - " + res.status
      )
    } else {
      return {
        data: await (res.json() as Promise<T>),
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
      }
    }
  } catch (err: any) {
    console.error(err)
    return {
      data: {},
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    }
  }
}

export const outpostAPI = {
  get,
  post,
  Delete,
  put,
}
