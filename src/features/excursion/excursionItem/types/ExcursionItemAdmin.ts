import { ExcursionItem } from "./ExcursionItem";
import { Language } from "../../../../common/enums/Language";

export interface ExcursionItemAdmin {
  item: ExcursionItem;
  missingLanguages: Language[];
}