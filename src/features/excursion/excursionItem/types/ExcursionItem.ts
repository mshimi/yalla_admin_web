import { ExcursionItemTranslation } from "./ExcursionItemTranslation";

export interface ExcursionItem {
  id: number | null;
  translations: ExcursionItemTranslation[];
}