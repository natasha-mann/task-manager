import { createGlobalStyle, css } from "styled-components";
import UbuntuMonoBold from "./resources/fonts/UbuntuMonoBold.ttf";
import UbuntuMonoRegular from "./resources/fonts/UbuntuMonoRegular.ttf";

export const GlobalStyles = createGlobalStyle(
  () => css`
    * {
      font-family: "Ubuntu Mono", monospace;
      src: url("${UbuntuMonoBold}") format("ttf"),
      font-weight: 900;
      font-style: normal;
      font-display: swap;
    }

   * {
      font-family: "Ubuntu Mono", monospace;
      src: url("${UbuntuMonoRegular}") format("ttf"),
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

   * {
      margin: 0;
      padding: 0;
    }

    html, body, #root, #root>div {
      height: 100%
    }
  `
);
