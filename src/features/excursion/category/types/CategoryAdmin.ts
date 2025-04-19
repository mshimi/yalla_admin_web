import { Language } from "../../../../common/enums/Language"
import { Category } from "./Category"

export interface CategoryAdmin {
  category: Category;
  missingLanguages: Language[];
}