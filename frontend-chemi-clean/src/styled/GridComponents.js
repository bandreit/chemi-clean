import styled from "styled-components";

export const Grid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  align-items: center;
  grid-gap: 1rem;
  padding: 5px;
  margin: 0 20px;
  @media (max-width: 409px) {
    padding: 0px;
    margin: 0px;
  }
`;

export const HeaderSearch = styled.div`
  display: grid;
  place-items: center;
  height: 5rem;
`;

export const SearchInput = styled.input`
  width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

export const Loading = styled.div`
  display: grid;
  place-items: center;
`;
