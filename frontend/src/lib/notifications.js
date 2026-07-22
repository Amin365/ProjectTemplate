// Call this after login with token and userId
export async function enableNotifications(token, userId) {
  try {
    if (!("serviceWorker" in navigator)) return;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const reg = await navigator.serviceWorker.register("/sw.js");

    // Check existing subscription
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
      });
    }

    const apiBase =
      import.meta.env.PROD
        ? "https://jjureadingclub.com/api"
        : "http://localhost:5000/api";

    await fetch(`${apiBase}/push/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(sub)
    });
  } catch (err) {
    console.warn("Push notification setup skipped:", err?.message || err);
  }
}
