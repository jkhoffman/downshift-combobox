import styled from "styled-components";

export const StyledCombobox = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  position: relative;
  border-radius: 6px;
  border-bottom-right-radius: ${({ isOpen }) => (isOpen ? "0" : "6px")};
  border-bottom-left-radius: ${({ isOpen }) => (isOpen ? "0" : "6px")};
  padding: 10px;
  padding-right: 50px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  border-color: #96c8da;
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-style: solid;

  &:focus-within {
    border-color: #4285f4;
  }
`;

export const StyledSelectedItem = styled.span`
  margin: 2px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
  padding-right: 8px;
  display: inline-block;
  word-wrap: none;
  background-color: #ccc;
  border-radius: 6px;
`;

export const StyledSelectedItemIcon = styled.span`
  margin-left: 4px;

  &:hover {
    color: red;
  }
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  margin-left: 6px;
  flex: 1;
  font-size: 16px;
  min-height: 27px;
`;

export const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 47px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledMenuMultiple = styled.ul<{ isOpen: boolean }>`
  padding: 0;
  margin-top: 0;
  position: absolute;
  background-color: white;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
  outline: 0;
  transition: opacity 0.1s ease;
  border-radius: 0 0 0.28571429rem 0.28571429rem;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  border-color: #96c8da;
  border-top-width: 0;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-style: solid;
  border: ${(props) => (props.isOpen ? null : "none")};
`;

export const StyledMenuItem = styled.li<{
  isActive: boolean;
  isSelected: boolean;
}>`
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  border-top: none;
  line-height: 1em;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1rem;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;
  padding: 0.8rem 1.1rem;
  white-space: normal;
  word-wrap: normal;

  ${({ isActive }) =>
    isActive &&
    `
    color: rgba(0,0,0,.95);
    background: rgba(0,0,0,.03);
  `}

  ${({ isSelected }) =>
    isSelected &&
    `
    color: rgba(0,0,0,.95);
    font-weight: 700;
  `}
`;
