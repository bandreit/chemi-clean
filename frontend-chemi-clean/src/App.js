import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard.js";
import styled from "styled-components";

const Grid = styled.main`
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

const HeaderSearch = styled.div`
  display: grid;
  place-items: center;
  height: 5rem;
`;

const SearchInput = styled.input`
  width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const Loading = styled.div`
  display: grid;
  place-items: center;
`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
    console.log(isFetching);
  };

  useEffect(() => {
    const results = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, products]);

  const fetchData = async () => {
    setTimeout(async () => {
      axios.get(`https://localhost:5001/products?page=${page}`).then((res) => {
        const data = res.data;
        setPage(page + 1);
        setProducts(() => {
          return [...products, ...data];
        });
        setSearchResults(() => {
          return [...products, data];
        });
      });
    }, 1000);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  return (
    <div>
      <HeaderSearch>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
      </HeaderSearch>
      {products.length > 0 ? (
        <Grid>
          {searchResults.map((product, key) => (
            <ProductCard key={key} product={product}></ProductCard>
          ))}
        </Grid>
      ) : (
        <Loading>Loading...</Loading>
      )}
      {isFetching && <p>Fetching more items...</p>}
    </div>
  );
}

export default App;
