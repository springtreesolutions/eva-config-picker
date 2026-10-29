/**
 * Endpoints come from Firestore (or a host-set prop) and are fetched and handed to the host app,
 * so only absolute https URLs are accepted.
 */
export function isAllowedEndpoint(endpoint: unknown): endpoint is string {
  if (typeof endpoint !== 'string') {
    return false;
  }

  try {
    return new URL(endpoint).protocol === 'https:';
  } catch {
    return false;
  }
}
