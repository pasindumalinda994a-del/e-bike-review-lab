/**
 * Type declarations for Google Analytics gtag function
 * This provides TypeScript/IDE support for gtag calls
 */

interface Window {
  dataLayer: any[];
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: Record<string, any>
  ) => void;
}

