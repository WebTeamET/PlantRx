// Helper function to normalize URLs for Replit preview
export function normalizeHref(href: string): string {
  // Preserve in-page hash links so they don't get rewritten to "/" which
  // would send users to the home page.
  if (href.startsWith("#")) return href;

  try {
    const u = new URL(href, window.location.origin);
    const sameHost = ['plantrxapp.com', 'www.plantrxapp.com'].includes(u.hostname);
    return sameHost ? (u.pathname + u.search + u.hash) : href;
  } catch { 
    return href; 
  }
}

// Check if running in Replit environment
export function isReplit(): boolean {
  return typeof window !== 'undefined' && window.location.hostname.endsWith('.repl.co');
}
