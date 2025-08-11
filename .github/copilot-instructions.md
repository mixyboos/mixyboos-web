This application is an audio sharing and live streaming platform aimed at DJs and built with Next.js and Tailwind CSS. 

We use shadcn for components.

bun should be used as the package manager for the project. It is used to manage dependencies and run scripts. The `bun install` command should be used to install dependencies, and `bun run` should be used to run scripts. This is only for local development, for running tests and github actions, npm should be used as the package manager.

We have a backend API server written in .NET which will be available at NEXT_PUBLIC_API_URL - this endpoint will provide all of our data and authentication requirements.
