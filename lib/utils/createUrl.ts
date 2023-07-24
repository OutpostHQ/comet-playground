export const createURL = (
  {
    slug = [],
    ...queryParams
  }: Partial<{
    [key: string]: string | string[]
  }>,
  base_url: string
): string => {
  const queryParamString = Object.keys(queryParams)
    .map((key) => key + "=" + queryParams[key])
    .join("&")
  const path = typeof slug === "object" ? slug.join("/") : slug
  let url = `${base_url}${path}`
  if (queryParamString) url = `${url}?${queryParamString}`
  return url
}
