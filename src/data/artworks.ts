export type Artwork = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  publishedAt: string;
  likes: number;
  loves: number;
  hahas: number;
  comments: number;
};

export const artworks: Artwork[] = [
  {
    id: "silent-thoughts",
    title: "Silent Thoughts",
    description:
      "An exploration of emotion, atmosphere and visual storytelling.",
    category: "Digital Art",
    image: "/artworks/placeholder-1.jpg",
    publishedAt: "2026-09-04T10:00:00",
    likes: 24,
    loves: 18,
    hahas: 2,
    comments: 4,
  },
  {
    id: "beyond-the-frame",
    title: "Beyond the Frame",
    description:
      "A visual study exploring perspective, composition and imagination.",
    category: "Illustration",
    image: "/artworks/placeholder-2.jpg",
    publishedAt: "2026-09-03T14:30:00",
    likes: 31,
    loves: 22,
    hahas: 3,
    comments: 7,
  },
  {
    id: "inner-world",
    title: "Inner World",
    description:
      "A conceptual piece inspired by thoughts, identity and perception.",
    category: "Concept Art",
    image: "/artworks/placeholder-3.jpg",
    publishedAt: "2026-09-02T09:15:00",
    likes: 19,
    loves: 15,
    hahas: 1,
    comments: 3,
  },
];
