/**
 * Type definitions for Si Ying's Magazine Archive: "The Archive of Unpublished Stories"
 * Prepared for future characters to be featured as individual magazine pages / articles.
 */

export interface SiYingCharacter {
  id: string;
  pageNumber: number; // The magazine page number this character occupies
  issueNumber?: string; // e.g. "ISSUE 001"
  name: string;
  vietnameseName?: string;
  roleOrTitle?: string; // e.g. "Dạ Dực Thư Ký", "Đặc Phái Viên Rừng Sương"
  headline?: string; // Catchy editorial headline
  tagline?: string; // Editorial summary or lead paragraph
  synopsis?: string; // Long-form story or character biography
  featuredQuote?: string; // Pull quote featured across the page
  tags: string[]; // e.g. ["r18", "bg", "bl", "np", "mystery", "supernatural"]
  portraitUrl?: string; // Main full-page or framed portrait
  artCredit?: string;
  plotLink?: string; // External or in-universe story plot link
  ggaiLink?: string; // GGAI character link
  likes: number; // Public-like count
  editorialNotes?: string; // Personal note from Editor-in-Chief Si Ying
  dateDrafted?: string;
  classification?: 'UNPUBLISHED' | 'CLASSIFIED' | 'SPECIAL EDITION' | 'ARCHIVED';
}

export interface MagazineSpread {
  spreadIndex: number;
  leftPageNumber: number;
  rightPageNumber: number;
  label: string;
  sublabel: string;
  type: 'cover' | 'draft-spread' | 'editorial-colophon';
}
