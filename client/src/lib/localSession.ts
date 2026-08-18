const LOCAL_SESSION_STORAGE_KEY = "belajar-ai-local-session";

export function storeLocalSessionToken(token: string) {
  try {
    sessionStorage.setItem(LOCAL_SESSION_STORAGE_KEY, token);
    sessionStorage.removeItem("manus-cookie");
  } catch {
    // Cookie tetap menjadi sumber sesi utama apabila sessionStorage tidak tersedia.
  }
}

export function getLocalSessionToken() {
  try {
    return sessionStorage.getItem(LOCAL_SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function clearLocalSessionToken() {
  try {
    sessionStorage.removeItem(LOCAL_SESSION_STORAGE_KEY);
  } catch {
    // Tidak ada tindakan tambahan bila penyimpanan sesi tidak tersedia.
  }
}
