import config from "@/tailwind.config"
import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"
import resolveconfig from "tailwindcss/resolveConfig"

/* 
tw-merge cannot differentiate between font-size and text color
https://github.com/epicweb-dev/epic-stack/issues/301
*/
const { theme } = resolveconfig(config)

const tailwindMerge = extendTailwindMerge({
  classGroups: {
    "font-size": Object.keys(theme?.fontSize || {}).map((key) => `text-${key}`),
  },
})

export function cn(...inputs: ClassValue[]) {
  return tailwindMerge(clsx(inputs))
}
