import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // height: 100vh;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  //width: 100vw;
`;

export const FooterContainer = styled(HeaderContainer)`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  // width: 100vw;
  min-height: 100%;
  padding: 1rem 0;
  margin: 0 0.3rem;
  // background-color: #FBFAFA;

  overflow-x: auto;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #e7e7e7;
    border-radius: 0.3rem;
    outline: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 0.3rem;
    outline: none;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #e4e4e4;
    border: 1px solid #30cfd0;
    outline: none;
  }
  &::-webkit-scrollbar {
    height: 0.6rem;
    outline: none;
  }
`;

interface DragPreviewContainerProps {
  isHidden?: boolean;
  isPreview?: boolean;
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  transform: ${props => (props.isPreview ? 'rotate(1deg)' : undefined)};
  opacity: ${props => (props.isHidden ? 0 : 1)};
`;

export const ColumnContainer = styled(DragPreviewContainer)`
  position: relative;
  background-color: #ebecf0;
  width: 18.5rem;
  min-height: 40px;
  margin: 0 10px;
  border-radius: 3px;
  padding: 8px;
  color: #000;
  background-color: #fbfafa;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 10px;
  box-shadow: 0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
`;

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`;

export const CardContainer = styled(DragPreviewContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: #091e4240 0px 1px 0px 0px;
`;

interface AddItemButtonProps {
  dark?: boolean;
}

export const AddItemButton = styled.button<AddItemButtonProps>`
  max-width: 300px;
  min-width: 150px;
  padding: 10px 12px;
  background-color: #e5e5e552;
  border-radius: 10px;
  border: none;
  outline: none;
  color: ${props => (props.dark ? '#000' : '#00020')};
  cursor: pointer;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
    box-shadow: 0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
`;

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  // width: 100%;
  align-items: flex-start;
`;

export const NewItemInput = styled.input`
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 7px;
  border: none;
  outline: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  box-shadow: 0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
`;

export const NewItemButton = styled.button`
  width: 100px;
  padding: 6px 12px;
  background-color: #e5e5e5;
  border-radius: 10px;
  border: none;
  outline: none;
  color: #fff;
  text-align: center;

  &:hover {
    background-color: #ffffff52;
    color: #5aac44;
    box-shadow: 0.5rem 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
`;

export const CustomDragLayerContainer = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
  position: fixed;
  z-index: 100;
`;
