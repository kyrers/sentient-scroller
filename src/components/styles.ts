import styled, { StyledComponent } from "@emotion/styled";

export const StyledButton: StyledComponent<any> = styled.button`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 9999;
  animation: fade-in 0.5s ease-in;
`;
