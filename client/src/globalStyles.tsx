import styled, { createGlobalStyle, css } from "styled-components";
import UbuntuMonoBold from "./resources/fonts/UbuntuMonoBold.ttf";
import UbuntuMonoRegular from "./resources/fonts/UbuntuMonoRegular.ttf";
import { Link } from "react-router-dom";

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
      height: 100%;

      @media (max-width: 768px) {
        height: unset;
      }
    }
  `
);

export const StyledLink = styled(Link)`
  color: white;
`;

export const StyledWhiteP = styled.p`
  color: white;
`;
