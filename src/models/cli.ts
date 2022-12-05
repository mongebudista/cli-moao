export interface Cli {
  createComponent: () => Promise<void>;
  deleteComponent: () => Promise<void>;
  prompt: () => Promise<void>;
}
