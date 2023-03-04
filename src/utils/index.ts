import { join } from 'path'
import { readFileSync } from 'fs'
import { parse } from 'yaml'

export const getEnv = () => {
  return process.env.RUNNING_ENV
}

export const getConfig = () => {
  const environment = getEnv()
  const yamlPath = join(process.cwd(), `./.config/.${environment}.yaml`)
  const file = readFileSync(yamlPath, 'utf8')
  const config = parse(file)
  return config
}
