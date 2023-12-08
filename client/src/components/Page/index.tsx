import { PropsWithChildren } from "react";
import { Container, ContentContainer } from "./Page.styled";
import { Layout } from "../Layout";

type PageProps = PropsWithChildren<{
  isCentered?: boolean;
  hasBackgroundImage?: boolean;
}>;

export const Page = ({ children, hasBackgroundImage = false }: PageProps) => {
  return (
    <Layout hasBackgroundImage={hasBackgroundImage}>
      <Container>
        <ContentContainer>{children}</ContentContainer>
      </Container>
    </Layout>
  );
};
