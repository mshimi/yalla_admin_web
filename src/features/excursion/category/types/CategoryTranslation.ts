import { Language } from "../../../../common/enums/Language"

export interface CategoryTranslation {
  id: number | null;
  lang: Language;
  name: string;
  description: string;
}