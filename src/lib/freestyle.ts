import { FreestyleSandboxes } from 'freestyle-sandboxes';

let _freestyle: FreestyleSandboxes | null = null;

export const freestyle = new Proxy({} as FreestyleSandboxes, {
  get(_, prop) {
    if (!_freestyle) {
      if (!process.env.FREESTYLE_API_KEY) {
        throw new Error("FREESTYLE_API_KEY environment variable is required");
      }
      _freestyle = new FreestyleSandboxes({ apiKey: process.env.FREESTYLE_API_KEY });
    }
    return _freestyle[prop as keyof typeof _freestyle];
  }
});