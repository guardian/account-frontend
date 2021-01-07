import * as pathLib from "path";

// To avoid security vulnerabilities do not add public paths that do not end in a slash
const publicPaths = [
  "/contact-us/",
  "/api/contact-us/",
  "/help-centre/",
  "/api/known-issues/"
];

export const requiresSignin = (path: string) => {
  const normalizedPath = pathLib.normalize(path + "/");
  return !publicPaths.some(publicPath => normalizedPath.startsWith(publicPath));
};
