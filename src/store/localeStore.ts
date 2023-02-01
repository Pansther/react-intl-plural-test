import { atom } from "recoil";

const en = {
  main: "{benefits_character_typed}/{benefits_character_limit} {benefits_character_typed, plural, =0 {character} one {character} other {characters}}",
};

const th = {
  main: "{benefits_character_typed}/{benefits_character_limit} ตัวอักษร",
};

const messages: Record<"en" | "th", Record<string, string>> = {
  en,
  th,
};

interface LocaleStoreState {
  locale: "en" | "th";
  messages: Record<"en" | "th", Record<string, string>>;
}

export const localeStore = atom<LocaleStoreState>({
  key: "locale-store",
  default: {
    messages,
    locale: "en",
  },
});
