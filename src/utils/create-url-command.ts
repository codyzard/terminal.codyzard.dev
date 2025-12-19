import type {Command} from '../../types'

/**
 * Factory function to create URL opening commands
 * Reduces code duplication for commands that open external links
 *
 * @param name - Command name (e.g., 'github', 'linkedin')
 * @param url - URL to open
 * @param resourceName - Human-readable name for the resource (e.g., 'GitHub profile', 'LinkedIn profile')
 * @returns Command object
 */
export const createUrlCommand = (
  name: string,
  url: string,
  resourceName: string,
): Command => ({
  name,
  description: `Opens my ${resourceName} in a new tab.`,
  execute: () => {
    window.open(url, '_blank')
    return {content: `Opening ${resourceName} in a new tab...`}
  },
})
