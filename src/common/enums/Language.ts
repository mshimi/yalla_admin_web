export enum Language {
  EN = "EN",
  DE = "DE",
  FR = "FR",

}
/**
 * Utility function to get a Language enum value from a string.
 * @param value The string representation of the language.
 * @returns The corresponding Language enum or null if not found.
 */
export function getLanguageFromString(value: string): Language  {
  const lang = (Object.values(Language) as string[]).find((lang) => lang === value.toUpperCase());
  return Language.EN;


  // Add other languages as needed
}