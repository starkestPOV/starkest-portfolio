export type MediaAsset = {
  src: string;
  alt: string;
  kind: "image" | "video";
  width?: number;
  height?: number;
  poster?: string;
};

export type WorkCategorySlug = "sports-stories" | "lifestyle-films" | "freelance-work";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: WorkCategorySlug;
  summary?: string;
  disciplines: readonly string[];
  media: MediaAsset;
  gallery?: readonly MediaAsset[];
  role?: string;
  client?: string;
  year?: string;
  credits?: readonly string[];
  featured?: boolean;
};

export type WorkCategory = {
  slug: WorkCategorySlug;
  number: string;
  title: string;
  description: string;
  disciplines: readonly string[];
};

export type CollectionMediaGroups = {
  films: readonly MediaAsset[];
  visuals: readonly MediaAsset[];
};

const imageAssets = (folder: string, prefix: string, count: number, alt: string, heights?: readonly number[]): readonly MediaAsset[] =>
  Array.from({ length: count }, (_, index) => ({
    src: `/images/${folder}/${prefix}-${String(index + 1).padStart(2, "0")}.jpg`,
    alt: `${alt} ${index + 1}`,
    kind: "image" as const,
    width: 1080,
    height: heights?.[index] ?? 1350,
  }));

const videoAssets = (folder: string, prefix: string, count: number, alt: string): readonly MediaAsset[] =>
  Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      src: `/videos/${folder}/${prefix}-${number}.mp4`,
      poster: `/images/posters/${prefix}-${number}.mp4.png`,
      alt: `${alt} ${index + 1}`,
      kind: "video" as const,
    };
  });

export const workCategories: readonly WorkCategory[] = [
  { slug: "sports-stories", number: "01", title: "Sports Stories", description: "Racing. Action. Emotion.", disciplines: ["Sports photography", "Sports films", "Visual stories"] },
  { slug: "lifestyle-films", number: "02", title: "Lifestyle Films", description: "People. Places. Perspectives.", disciplines: ["Car films", "Event videos", "Lifestyle photography"] },
  { slug: "freelance-work", number: "03", title: "Freelance Work", description: "Editing. Design. Visual solutions.", disciplines: ["Video editing", "Branded content", "Creative freelance work"] },
];

/** Individual assets are intentionally untitled: no project metadata was supplied with the source media. */
export const portfolioProjects: readonly PortfolioProject[] = [];

export const collectionMedia: Readonly<Record<WorkCategorySlug, readonly MediaAsset[]>> = {
  "sports-stories": imageAssets("sports", "sports", 15, "Sports photograph"),
  "lifestyle-films": [
    ...videoAssets("lifestyle", "lifestyle", 3, "Lifestyle film"),
    ...imageAssets("lifestyle", "lifestyle", 46, "Lifestyle photograph"),
  ],
  "freelance-work": videoAssets("freelance", "freelance", 8, "Freelance film"),
};

const lifestyleHeights = [1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1440, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1080, 1080, 1080, 1080, 1440, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1080, 1350, 1080, 1080, 1350, 1080, 1350, 1350, 1350, 1350, 1350, 1350] as const;
const sportsSizes = [[4277, 3055], [4664, 3498], [3867, 2900], [2758, 3677], [3718, 4000], [3719, 2789], [2858, 4000], [4135, 3101], [4049, 3037], [2394, 3350], [4831, 3624], [5300, 3786], [5600, 4000], [2926, 3902], [2626, 3501]] as const;
const sportsImages = imageAssets("sports", "sports", 15, "Sports photograph").map((asset, index) => ({ ...asset, width: sportsSizes[index][0], height: sportsSizes[index][1] }));
const lifestyleImages = imageAssets("lifestyle", "lifestyle", 46, "Lifestyle photograph", lifestyleHeights);
const lifestyleVideos = [
  ...videoAssets("lifestyle", "lifestyle", 3, "Lifestyle film"),
  { src: "/videos/lifestyle/final.mp4", poster: "/images/posters/final.mp4.png", alt: "Lifestyle film", kind: "video" as const },
];

/** Lifestyle media is grouped by its real visual subject, with featured frames kept out of the archive grids. */
const lifestyleStoryImages = lifestyleImages.slice(19, 23);
const automotiveStoryImages = lifestyleImages.filter((_, index) => index < 19 || index > 22);

export const lifestyleProjects = {
  films: lifestyleVideos,
  latestAutomotive: automotiveStoryImages[automotiveStoryImages.length - 1],
  latestLifestyle: lifestyleStoryImages[lifestyleStoryImages.length - 1],
  automotiveStories: automotiveStoryImages.slice(0, -1),
  lifestyleStories: lifestyleStoryImages.slice(0, -1),
} as const;

export const collectionMediaGroups: Readonly<Record<WorkCategorySlug, CollectionMediaGroups>> = {
  "sports-stories": { films: [], visuals: sportsImages },
  "lifestyle-films": { films: lifestyleVideos, visuals: lifestyleImages },
  "freelance-work": { films: videoAssets("freelance", "freelance", 8, "Freelance film"), visuals: [] },
};

export const collectionCovers: Readonly<Record<WorkCategorySlug, MediaAsset>> = {
  "sports-stories": collectionMedia["sports-stories"][0],
  "lifestyle-films": collectionMedia["lifestyle-films"][0],
  "freelance-work": collectionMedia["freelance-work"][0],
};

export const streetImages: readonly MediaAsset[] = imageAssets("street", "street", 25, "Street photograph");
