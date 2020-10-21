import * as pathLib from "path";

const publicPaths = ["/contact-us-form"];

export const requiresSignin = (path: string) => {
  const normalizedPath = pathLib.normalize(path);
  return !publicPaths.some(publicPath => normalizedPath.startsWith(publicPath));
};
