export type Category = "ALL" | "DANCE" | "BRAND" | "EVENTS" | "REELS";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: Exclude<Category, "ALL">;
  year: string;
  /** "drive" uses Google Drive preview iframe; "youtube" uses YouTube embed */
  source: "drive" | "youtube";
  /** Drive file id or YouTube video id */
  videoId: string;
  /** aspect ratio of the card in the grid */
  ratio: "16/9" | "9/16";
  duration: string;
}

export const driveThumb = (id: string) => `/api/thumb/${id}`;

export const youtubeThumb = (id: string) =>
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

export const thumbFor = (p: Project) =>
  p.source === "drive" ? driveThumb(p.videoId) : youtubeThumb(p.videoId);

export const embedFor = (p: Project) =>
  p.source === "drive"
    ? `https://drive.google.com/file/d/${p.videoId}/preview`
    : `https://www.youtube-nocookie.com/embed/${p.videoId}?autoplay=1&rel=0`;

export const projects: Project[] = [
  {
    id: "wingerz-01",
    title: "Wingerz Showcase",
    client: "Wingerz Dance Company",
    category: "DANCE",
    year: "2025",
    source: "drive",
    videoId: "1-NAGjqccb_PXoq5PkTYL6oyhotILZtyX",
    ratio: "16/9",
    duration: "00:01:12",
  },
  {
    id: "wingerz-02",
    title: "Rhythm in Motion",
    client: "Wingerz Dance Company",
    category: "DANCE",
    year: "2025",
    source: "drive",
    videoId: "1NlkTdNI_lOBnkzuUf6kq1wx9L8r939cN",
    ratio: "9/16",
    duration: "00:00:48",
  },
  {
    id: "wingerz-03",
    title: "Stage Cut",
    client: "Wingerz Dance Company",
    category: "DANCE",
    year: "2024",
    source: "drive",
    videoId: "10sPEqFmMDed0NWk9jFQWEU_pvOpSbUs6",
    ratio: "16/9",
    duration: "00:01:30",
  },
  {
    id: "catering-01",
    title: "Plated Stories",
    client: "Catering Brand Film",
    category: "BRAND",
    year: "2025",
    source: "drive",
    videoId: "18c3N1kZWP5aTPj_bGnhBb1JNGsvMojqX",
    ratio: "16/9",
    duration: "00:01:05",
  },
  {
    id: "catering-02",
    title: "Taste of Craft",
    client: "Catering Promo",
    category: "BRAND",
    year: "2025",
    source: "drive",
    videoId: "1V3ktDlecSswWC7JJARYMOc1HVqd7wmgZ",
    ratio: "9/16",
    duration: "00:00:38",
  },
  {
    id: "catering-03",
    title: "Service in Frame",
    client: "Catering Promo",
    category: "BRAND",
    year: "2024",
    source: "drive",
    videoId: "17a_29Lx5kC2zPLIIPcyIQG3p_ryxf6Va",
    ratio: "16/9",
    duration: "00:00:55",
  },
  {
    id: "gym-01",
    title: "Iron Hours",
    client: "Fitness Promo",
    category: "BRAND",
    year: "2025",
    source: "drive",
    videoId: "1DFkv47mPA9DTcBCdgQ4jcg2rqgfL0pp-",
    ratio: "9/16",
    duration: "00:00:42",
  },
  {
    id: "reunion-01",
    title: "Once More Together",
    client: "Reunion Aftermovie",
    category: "EVENTS",
    year: "2024",
    source: "drive",
    videoId: "1Cya5c9JvliXeBcRFzXBzHZ-rt--QAWvG",
    ratio: "16/9",
    duration: "00:02:10",
  },
  {
    id: "reunion-02",
    title: "The Gathering",
    client: "Reunion Aftermovie",
    category: "EVENTS",
    year: "2024",
    source: "drive",
    videoId: "1afdnlahxU6At8EQiaAEdRWqFIup_qho6",
    ratio: "16/9",
    duration: "00:01:45",
  },
  {
    id: "yt-main",
    title: "Director's Cut",
    client: "CutCulture",
    category: "EVENTS",
    year: "2025",
    source: "youtube",
    videoId: "sPXlXoFcGwg",
    ratio: "16/9",
    duration: "00:03:20",
  },
  {
    id: "yt-short",
    title: "Vertical Velocity",
    client: "CutCulture",
    category: "REELS",
    year: "2025",
    source: "youtube",
    videoId: "x4TArJIGIZY",
    ratio: "9/16",
    duration: "00:00:30",
  },
];

/** hero "play reel" target — best public-quality piece */
export const heroReel = projects.find((p) => p.id === "yt-main")!;

/** featured case study — Wingerz (his headline client) */
export const featured = projects.find((p) => p.id === "wingerz-01")!;
