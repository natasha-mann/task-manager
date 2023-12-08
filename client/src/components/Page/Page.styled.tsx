import styled, { css } from "styled-components";
import background from "../../resources/images/background.jpg";

export const PageBody = styled.div(
  () => css`
    display: flex;
    flex-flow: column;
    max-width: 100%;
    width: 100%;
    margin: auto;
    background-image: url(${background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `
);

export const Container = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `
);

export const ContentContainer = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    flex: 1 1;
    width: 100%;
    margin-bottom: 20px;

    @media (min-width: 768px) {
      flex: 2;
      margin-left: 0;
      margin-bottom: 0;
    }
  `
);

export const CenteredContentContainer = styled(ContentContainer)(
  () => css`
    justify-content: center;
  `
);
