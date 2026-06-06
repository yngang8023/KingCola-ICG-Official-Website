import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.PORT || env.VITE_DEV_PORT || 8081)
  const open = (env.VITE_DEV_OPEN ?? 'true').toLowerCase() !== 'false'
  const repositoryName =
    process.env.GITHUB_REPOSITORY?.split('/')[1] ||
    env.VITE_GITHUB_PAGES_REPO ||
    'KingCola-ICG-Official-Website'
  const isGitHubPagesBuild =
    (process.env.GITHUB_ACTIONS ?? '').toLowerCase() === 'true' ||
    (env.GITHUB_ACTIONS ?? '').toLowerCase() === 'true' ||
    mode === 'github-pages'
  const base = isGitHubPagesBuild ? `/${repositoryName}/` : '/'

  return {
    base,
    plugins: [react()],
    assetsInclude: ['**/*.glb'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port,
      open,
      hmr: {
        host: 'localhost',
        port
      }
    }
  }
})
