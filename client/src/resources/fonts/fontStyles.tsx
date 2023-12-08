import { createGlobalStyle, css } from "styled-components";
import UbuntuMonoBold from "./UbuntuMonoBold.ttf";
import UbuntuMonoRegular from "./UbuntuMonoRegular.ttf";

export const FontStyles = createGlobalStyle(
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
  `
);
