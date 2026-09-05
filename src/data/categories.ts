export const categories = [
  "All Categories",
  "Art Nouveau",
  "Art for T-Shirt Design",
  "Concept Art",
  "Character Design",
  "Comic Book",
  "Cover",
  "Furry Art",
  "Pixel Art",
  "Pokémon Art",
  "VTuber / PNGTuber",
  "VRChat",
] as const;

export type Category = (typeof categories)[number];

// Keep this alias available for newer components.
export const CATEGORIES = categories;
