/**
 * Extracts the filename (without extension) from an asset path/URL.
 * Used to generate meaningful alt text for dynamically-imported images.
 * e.g. "/assets/react-abc123.svg" → "react"
 */
export function getImgAlt(src) {
  return String(src).split('/').pop().split('.')[0];
}

/**
 * Returns the URL for the maintenance page for a given project name.
 * Uses import.meta.env.BASE_URL so it works correctly in both dev (/Cv-React/)
 * and production (https://chizzi01.github.io/Cv-React/).
 */
export function maintenanceUrl(projectName) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/mantenimiento.html?p=${encodeURIComponent(projectName)}`;
}
