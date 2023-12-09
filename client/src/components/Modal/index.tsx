import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

type ModalProps = PropsWithChildren<{
  show: boolean;
  onClose: () => void;
  title: string;
}>;

type ModelBackdropProps = {
  show: boolean;
};

const StyledModal = styled.div(
  () => css`
    height: 90%;
    width: 70%;
    background-color: rgb(40, 40, 40);
    color: white;
    margin: 0 auto;
    border-radius: 1rem;
    padding: 1rem;
    z-index: 10;
  `
);

const ModelBackdrop = styled.div<ModelBackdropProps>`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgb(226, 53, 54, 0.5);
`;

const ModalHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgb(58, 58, 58);
`;

const ModalBody = styled.div``;

export const Modal = ({ onClose, show, title, children }: ModalProps) => {
  return (
    <ModelBackdrop show={show}>
      <StyledModal>
        <ModalHeader>
          <button onClick={onClose}>Close</button>
          <h2>{title}</h2>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </StyledModal>
    </ModelBackdrop>
  );
};
