import { PropsWithChildren } from "react";
import { Container } from "./Page.styled";
import { Layout } from "../Layout";

type PageProps = PropsWithChildren<{
  isCentered?: boolean;
  hasBackgroundImage?: boolean;
}>;

export const Page = ({ children, hasBackgroundImage = false }: PageProps) => {
  return (
    <Layout hasBackgroundImage={hasBackgroundImage}>
      <Container>{children}</Container>
    </Layout>
  );
};
