import { PropsWithChildren } from "react";
import { StyledLayout, LayoutWithBackground } from "./Layout.styled";

type PageProps = PropsWithChildren<{
  isCentered?: boolean;
  hasBackgroundImage?: boolean;
}>;

export const Layout = ({ children, hasBackgroundImage }: PageProps) => {
  return hasBackgroundImage ? (
    <LayoutWithBackground>{children}</LayoutWithBackground>
  ) : (
    <StyledLayout>{children}</StyledLayout>
  );
};
