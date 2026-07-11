export interface Mark {
  id: "a";
  name: string;
}

export const marks: ReadonlyArray<Mark> = [
  {
    id: "a",
    name: "Speak",
  },
] as const;
