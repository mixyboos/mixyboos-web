import { withSentryConfig } from "@sentry/nextjs";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      "mixyboos.dev.fergl.ie",
      "mixyboos.blob.core.windows.net",
      "cloudflare-ipfs.com",
      "i.pravatar.cc",
      "avatars.githubusercontent.com",
      "mixyboos.twic.pics",
      "cdn.mixyboos.com",
    ],
  },
};
export default withSentryConfig(
  config,
  {
    silent: true,
    org: "fergal-moran",
    project: "mixyboos",
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  },
);
