import { PropsWithChildren } from "react";
import {
  CenteredContentContainer,
  Container,
  ContentContainer,
  PageBody,
} from "./Page.styled";

type PageProps = PropsWithChildren<{
  isCentered: boolean;
}>;

export const Page = ({ children, isCentered }: PageProps) => {
  return (
    <PageBody>
      <Container>
        {isCentered ? (
          <CenteredContentContainer>{children}</CenteredContentContainer>
        ) : (
          <ContentContainer>{children}</ContentContainer>
        )}
      </Container>
    </PageBody>
  );
};
