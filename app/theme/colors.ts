// TODO: write documentation for colors and palette in own markdown file and add links from here

// 00204f blue
// f7c100 yellow
// ded9db white


const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#00204f", // background
  neutral300: "#f7c100", // separator
  neutral400: "#f7c100", // border
  neutral500: "#978F8A",
  neutral600: "#fdfdfd", // text dim
  neutral700: "#3C3836",
  neutral800: "#f7c100", // text
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#f7c100", // tint
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#ded9db", // error

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: "#000000",
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.angry500,
  /**
   * The default color of the screen background.
   */
  background_tab: "#b1b0b9",
  /**
   * The default border color.
   */
  border: "#00204f",
  /**
   * The main tinting color.
   */
  tint: "#00204f",
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
