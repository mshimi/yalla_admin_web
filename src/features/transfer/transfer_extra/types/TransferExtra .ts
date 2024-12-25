import { Language } from "../../../../common/enums/Language"

export interface TransferExtra {
  id: number;
  paxValue: number;
  isValid: boolean;
  imageId?: number;
  translations: TransferExtraTranslation[] | Partial<TransferExtraTranslation>[];
}

export interface TransferExtraTranslation {
  id: number;
  lang: Language;
  name: string;
}