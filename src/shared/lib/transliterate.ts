/**
 * Transliteration map from Cyrillic to Latin characters
 */
const cyrillicToLatinMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "Yo",
  Ж: "Zh",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "H",
  Ц: "Ts",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Sch",
  Ъ: "",
  Ы: "Y",
  Ь: "",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
};

/**
 * Checks if a string contains Cyrillic characters
 */
export function hasCyrillic(text: string): boolean {
  return /[\u0400-\u04FF]/.test(text);
}

/**
 * Transliterates Cyrillic text to Latin characters
 * Non-Cyrillic characters are preserved as-is
 *
 * @example
 * transliterate("Молоко") // "Moloko"
 * transliterate("Хлеб") // "Hleb"
 * transliterate("Apple") // "Apple" (unchanged)
 */
export function transliterate(text: string): string {
  return text
    .split("")
    .map((char) => cyrillicToLatinMap[char] ?? char)
    .join("")
    .replace(/\s+/g, "")
    .toLowerCase();
}
