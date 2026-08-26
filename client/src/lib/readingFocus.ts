export function usesReadingFocusShell(path: string) {
  return path === "/materi" || path.startsWith("/materi/");
}
