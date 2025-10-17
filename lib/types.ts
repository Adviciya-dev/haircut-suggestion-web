export interface Feature {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type GptType = "haircut" | "indoor" | "vehicle";
export type StyleGptType = "style";