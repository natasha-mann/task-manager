import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ModalProps = PropsWithChildren<{
  show: boolean;
  onClose: () => void;
  title?: string;
}>;

type ModelBackdropProps = {
  show: boolean;
};

const StyledModal = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: fiex-start;
    width: 40vw;
    background-color: rgb(40, 40, 40);
    color: white;
    margin: 0 auto;
    border-radius: 1rem;
    padding: 1rem;
    z-index: 100;
    position: fixed;
    top: 50%; /* Positions the top of the modal at 50% of the viewport height */
    left: 50%;
    transform: translate(-50%, -70%);
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
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgb(58, 58, 58);
`;
const ModalHeading = styled.h2`
  padding-top: 1rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem;
  background-color: unset;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
const ModalBody = styled.div``;

export const Modal = ({ onClose, show, title, children }: ModalProps) => {
  return (
    <ModelBackdrop show={show}>
      <StyledModal>
        <ModalHeader>
          {title && <ModalHeading>{title}</ModalHeading>}
          <StyledButton onClick={onClose}>
            <FontAwesomeIcon icon={faX} style={{ color: "white" }} />
          </StyledButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </StyledModal>
    </ModelBackdrop>
  );
};
