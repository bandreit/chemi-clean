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

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    axios.get("https://localhost:5001/api/products").then((res) => {
      const products = res.data;
      setProducts(products);
      setSearchResults(products);
    });
  }, []);

  useEffect(() => {
    const results = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, products]);

  return (
    <div className="App">
      <HeaderSearch>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
      </HeaderSearch>
      <Grid>
        {searchResults.map((product, key) => (
          <ProductCard key={key} product={product}></ProductCard>
        ))}
      </Grid>
    </div>
  );
}

export default App;
