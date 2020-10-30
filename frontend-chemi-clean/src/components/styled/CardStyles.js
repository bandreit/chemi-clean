import styled from "styled-components";

export const Card = styled.div`
  max-height: 120px;
  min-height: 120px;
  border-radius: 10px;
  border: 1px solid #ccc;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  padding: 15px;
  background-color: white;
  -webkit-box-shadow: 0px 8px 16px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 8px 16px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 8px 16px -6px rgba(0, 0, 0, 0.75);
  transition: all 0.3s ease;
  :hover {
    transform: scale(1.01);
    -webkit-box-shadow: 0px 8px 77px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 8px 77px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 8px 77px -3px rgba(0, 0, 0, 0.75);
  }
`;

export const Devider = styled.div`
  display: grid;
  grid-template-rows: 70% 30%;
  height: 100%;
`;

export const DownloadButton = styled.button`
  border: 0;
  background-color: ${(props) => (props.availble ? "#1976d2" : "grey")};
  border-radius: 50%;
  :focus {
    outline: none;
  }
  :hover {
    background-color: ${(props) => (props.availble ? "##0d3d6c" : "grey")};
    cursor: ${(props) => (props.availble ? "pointer" : "not-allowed")};
  }
`;

export const ButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`;

export const Image = styled.img`
  padding: 1.5rem;
  width: 50px;
`;

export const Title = styled.h4`
  overflow: auto;
  max-height: 85px;
  font-size: 2rem;
  margin: 0;
  word-break: break-word;
  align-self: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SubTitle = styled.p`
  margin: 0;
  color: gray;
  align-self: end;
`;

export const Updated = styled.span`
  color: red;
`;
