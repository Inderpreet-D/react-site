export const size = {
  mobile: ["20rem", "30rem"],
  tablet: ["30.0625rem", "48rem"],
  laptop: ["48.0625rem", "64rem"],
  desktop: ["64.0625rem"],
};

const breakpoints = {
  mobile: "",
  tablet: "",
  laptop: "",
  desktop: "",
};

Object.keys(size).forEach((key) => {
  breakpoints[key] = size[key]
    .map((size, i) => `(${i === 0 ? "min" : "max"}-width: ${size})`)
    .join(" and ");
});

export default breakpoints;
