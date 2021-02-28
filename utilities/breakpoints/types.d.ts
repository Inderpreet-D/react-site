export interface Size {
  [x: string]: string[];
  mobile: string[];
  tablet: string[];
  laptop: string[];
  desktop: string[];
}

export interface Breakpoints {
  [x: string]: string;
  mobile: string;
  tablet: string;
  laptop: string;
  desktop: string;
}
