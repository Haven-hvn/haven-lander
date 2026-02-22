/**
 * Utility functions for handling external links
 */

/**
 * Opens an external link in a new tab with security best practices
 * @param url - The URL to open
 */
export const openExternalLink = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
