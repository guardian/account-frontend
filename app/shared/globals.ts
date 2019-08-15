import { AbTest, OphanComponentEvent } from "./ophanTypes";

export interface Globals {
  domain: string;
  dsn: string | null;
  spaTransition?: true;
  INTCMP?: string;
  ophan?: {
    viewId: string;
    record: (payload: { componentEvent: OphanComponentEvent }) => void;
    sendInitialEvent: (url?: string, referer?: string) => void;
  };
  abTest?: AbTest;
  polyfilled?: boolean;
  onPolyfilled?: () => void;
  identityDetails: IdentityDetails;
}

declare global {
  interface Window {
    guardian: Globals;
  }
}
