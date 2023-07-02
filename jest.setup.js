import {loadEnvConfig} from '@next/env'
import next from 'next'

next({})
export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)

  import next from 'next'
  next({})
}
