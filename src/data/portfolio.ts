export type MediaAsset = {
  src: string;
  alt: string;
  kind: "image" | "video";
  width?: number;
  height?: number;
  poster?: string;
  title?: string;
};

export type WorkCategorySlug = "sports-stories" | "automotive" | "celebrities" | "lifestyle" | "freelance-work";

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
  appearance: "01" | "02" | "03";
  labels: { films: string; visuals: string };
  featuredVisual?: string;
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

// Street Photography remains the existing homepage reel, immediately after these collections.
export const workCategories: readonly WorkCategory[] = [
  { slug: "sports-stories", number: "01", appearance: "01", title: "Sports", description: "Racing. Action. Emotion.", disciplines: ["Sports photography", "Sports films", "Visual stories"], labels: { films: "Sports Films", visuals: "Sports Photography" } },
  { slug: "automotive", number: "02", appearance: "02", title: "Automotive", description: "Cars. Motion. Stories.", disciplines: ["Automotive photography", "Automotive films"], labels: { films: "Automotive Films", visuals: "Automotive Photography" } },
  { slug: "celebrities", number: "03", appearance: "02", title: "Celebrities", description: "People. Presence. Portraits.", disciplines: ["Celebrity photography"], labels: { films: "Celebrity Films", visuals: "Celebrity Photography" } },
  { slug: "lifestyle", number: "04", appearance: "02", title: "Lifestyle", description: "People. Places. Perspectives.", disciplines: ["Lifestyle photography"], labels: { films: "Lifestyle Films", visuals: "Lifestyle Photography" }, featuredVisual: "/images/lifestyle/lifestyle-05-beach.jpg" },
  { slug: "freelance-work", number: "05", appearance: "03", title: "Freelance", description: "Editing. Design. Visual solutions.", disciplines: ["Video editing", "Branded content", "Creative freelance work"], labels: { films: "Freelance Video", visuals: "Freelance Visuals" } },
];

/** Individual assets are intentionally untitled: no project metadata was supplied with the source media. */
export const portfolioProjects: readonly PortfolioProject[] = [];

const sportsSizes = [[4277, 3055], [4664, 3498], [3867, 2900], [2758, 3677], [3718, 4000], [3719, 2789], [2858, 4000], [4135, 3101], [4049, 3037], [2394, 3350], [4831, 3624], [5300, 3786], [5600, 4000], [2926, 3902], [2626, 3501]] as const;
const sportsImages = imageAssets("sports", "sports", 15, "Sports photograph").map((asset, index) => ({ ...asset, width: sportsSizes[index][0], height: sportsSizes[index][1] }));
// Explicit filenames preserve the reorganized folders and their nonconsecutive numbering.
const namedImages = (folder: string, files: readonly (readonly [string, number, number])[], alt: string): readonly MediaAsset[] =>
  files.map(([filename, width, height], index) => ({ src: `/images/${folder}/${filename}`, alt: `${alt} ${index + 1}`, kind: "image", width, height }));

const automotiveImages = namedImages("Automotive", [
  ["lifestyle-01.jpg", 1080, 1350],
  ["lifestyle-02.jpg", 1080, 1350],
  ["lifestyle-03.jpg", 1080, 1350],
  ["lifestyle-04.jpg", 1080, 1350],
  ["lifestyle-05.jpg", 1080, 1350],
  ["lifestyle-06.jpg", 1080, 1350],
  ["lifestyle-07.jpg", 1080, 1350],
  ["lifestyle-08.jpg", 1080, 1350],
  ["lifestyle-09.jpg", 1080, 1350],
  ["lifestyle-10.jpg", 1080, 1440],
  ["lifestyle-11.jpg", 1080, 1350],
  ["lifestyle-12.jpg", 1080, 1350],
  ["lifestyle-13.jpg", 1080, 1350],
  ["lifestyle-14.jpg", 1080, 1350],
  ["lifestyle-15.jpg", 1080, 1350],
  ["lifestyle-16.jpg", 1080, 1350],
  ["lifestyle-17.jpg", 1080, 1350],
  ["lifestyle-18.jpg", 1080, 1350],
  ["lifestyle-19.jpg", 1080, 1350],
  ["lifestyle-24.jpg", 1080, 1440],
  ["lifestyle-30.jpg", 1080, 1350],
  ["lifestyle-31.jpg", 1080, 1350],
  ["lifestyle-32.jpg", 1080, 1350],
  ["lifestyle-33.jpg", 1080, 1350],
  ["lifestyle-34.jpg", 1080, 1350],
  ["lifestyle-35.jpg", 1080, 1080],
  ["lifestyle-36.jpg", 1080, 1350],
  ["lifestyle-37.jpg", 1080, 1080],
  ["lifestyle-38.jpg", 1080, 1080],
  ["lifestyle-40.jpg", 1080, 1080],
  ["lifestyle-41.jpg", 1080, 1350],
  ["lifestyle-43.jpg", 1080, 1350],
  ["lifestyle-44.jpg", 1080, 1350],
  ["lifestyle-45.jpg", 1080, 1350],
  ["lifestyle-46.jpg", 1080, 1350],
], "Automotive photograph");

const celebrityImages = namedImages("Celebrities", [
  ["lifestyle-20.jpg", 1080, 1080],
  ["lifestyle-25.jpg", 1080, 1350],
  ["lifestyle-26.jpg", 1080, 1350],
  ["lifestyle-27.jpg", 1080, 1350],
  ["lifestyle-28.jpg", 1080, 1350],
  ["lifestyle-29.jpg", 1080, 1350],
  ["lifestyle-39.jpg", 1080, 1350],
], "Celebrity photograph");

const lifestyleImages = namedImages("lifestyle", [
  ["lifestyle-01-indoor.jpg", 1080, 1440],
  ["lifestyle-02-bw-window.jpg", 1080, 1440],
  ["lifestyle-03-greenery.jpg", 1080, 1440],
  ["lifestyle-04-boat.jpg", 4000, 5334],
  ["lifestyle-05-beach.jpg", 1728, 2304],
], "Lifestyle photograph");

// These original posters were matched to the renamed films by their SHA-256 content hashes.
const automotiveFilms: readonly MediaAsset[] = [
  { src: "/videos/Automotive/automotive-01-mustang-gt500.mp4", poster: "/images/posters/final.mp4.png", alt: "Mustang GT500 automotive film", title: "Mustang GT500", kind: "video" },
  { src: "/videos/Automotive/automotive-02-mazda.mp4", poster: "/images/posters/lifestyle-01.mp4.png", alt: "Mazda automotive film", title: "Mazda", kind: "video" },
  { src: "/videos/Automotive/automotive-03-hongkong.mp4", poster: "/images/posters/lifestyle-02.mp4.png", alt: "Hong Kong automotive film", title: "Hong Kong", kind: "video" },
  { src: "/videos/Automotive/automotive-04-gumball3000.mp4", poster: "/images/posters/lifestyle-03.mp4.png", alt: "Gumball 3000 automotive film", title: "Gumball 3000", kind: "video" },
];

export const collectionMediaGroups: Readonly<Record<WorkCategorySlug, CollectionMediaGroups>> = {
  "sports-stories": { films: [], visuals: sportsImages },
  automotive: { films: automotiveFilms, visuals: automotiveImages },
  celebrities: { films: [], visuals: celebrityImages },
  // Add finished films here when available; empty subsections are hidden by the collection page.
  lifestyle: { films: [], visuals: lifestyleImages },
  "freelance-work": { films: videoAssets("freelance", "freelance", 8, "Freelance film"), visuals: [] },
};

export const collectionCovers: Readonly<Record<WorkCategorySlug, MediaAsset>> = {
  "sports-stories": sportsImages[0],
  automotive: automotiveImages.find((asset) => asset.src.endsWith("/lifestyle-10.jpg"))!,
  celebrities: celebrityImages[1],
  lifestyle: lifestyleImages[4],
  "freelance-work": collectionMediaGroups["freelance-work"].films[7],
};

export const streetImages: readonly MediaAsset[] = imageAssets("street", "street", 25, "Street photograph");
