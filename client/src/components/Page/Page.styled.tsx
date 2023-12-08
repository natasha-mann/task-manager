import styled, { css } from "styled-components";

export const Container = styled.div(
  () => css`
    width: 90%;
    padding: 2rem;
    margin: 0 auto;
  `
);

export const ContentContainer = styled.div(
  () => css`
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;

    @media (min-width: 768px) {
      margin-left: 0;
      margin-bottom: 0;
    }
  `
);
