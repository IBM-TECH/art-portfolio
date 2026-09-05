const VISITOR_KEY = "luqss_visitor_id";

export function getVisitorId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let visitorId = localStorage.getItem(VISITOR_KEY);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, visitorId);
  }

  return visitorId;
}
