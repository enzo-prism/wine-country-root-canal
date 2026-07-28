import { FlatCompat } from "@eslint/eslintrc"
import path from "node:path"
import { fileURLToPath } from "node:url"

const filename = fileURLToPath(import.meta.url)
const directory = path.dirname(filename)
const compat = new FlatCompat({ baseDirectory: directory })

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "playwright-report/**", "test-results/**"],
  },
  ...compat.extends("next/core-web-vitals", "plugin:jsx-a11y/recommended"),
]

export default config
