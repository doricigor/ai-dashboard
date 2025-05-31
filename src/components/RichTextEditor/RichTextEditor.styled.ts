import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px;
  border: 1px solid ${colors.border};
  border-radius: 6px 6px 0 0;
  background-color: ${colors.alabaster};
`;

export const Button = styled.button<{ $active?: boolean }>`
  padding: 6px 10px;
  font-size: 14px;
  background: ${({ $active }) => ($active ? colors.primary : colors.white)};
  color: ${({ $active }) => ($active ? colors.white : colors.black)};
  border: 1px solid ${colors.border};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ $active }) =>
      $active ? colors.primaryHover : colors.alabaster};
  }
`;

export const EditorContainer = styled.div`
  border: 1px solid ${colors.border};
  border-top: none;
  border-radius: 0 0 6px 6px;
  min-height: 300px;
  padding: 10px;

  .ProseMirror {
    outline: none;
    min-height: 250px;
  }
`;
