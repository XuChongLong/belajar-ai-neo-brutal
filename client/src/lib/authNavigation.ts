export function localSignInPath(continueTo = "/") {
  const safePath = continueTo.startsWith("/") && !continueTo.startsWith("//") ? continueTo : "/";
  return `/masuk?lanjut=${encodeURIComponent(safePath)}`;
}
