import styled, { css } from "styled-components";

import background from "../resources/images/background.jpg";

export const StyledLayout = styled.div(
  () => css`
    display: flex;
    max-width: 100%;
    width: 100%;
    height: 100%;
    margin: auto;
    background-color: black;
  `
);

export const LayoutWithBackground = styled(StyledLayout)(
  () => css`
    background-image: url(${background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `
);
