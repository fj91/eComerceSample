import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { styled } from "@mui/material/styles";
import { Body } from "../../components/Body";
import { Search } from "./components/Search";
import { ProductCard } from "./components/ProductCard";
import { useQuery, gql } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import SouthIcon from "@mui/icons-material/South";

const Container = styled("div")`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const ProductRow = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3px;
  max-width: 1024px;
  margin: auto;
`;

const GET_PRODUCTS = gql`
  query Products($params: ProductsParams) {
    products(params: $params) {
      id
      image
      name
      slug
      offerPrice
      price
    }
  }
`;

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  function handleClick(e) {
    setPage(current => current + 1);
    console.log(page);
    const newQuery = new URLSearchParams(location.search);
    newQuery.set("page", e.target.value);
    navigate(location.pathname + "?" + newQuery + page, {});
  };
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      params: {
        query: new URLSearchParams(location.search).get("q") ?? "",
        page: +new URLSearchParams(location.search).get("page") ?? page,
      },
    },
  });
  if (loading || !data.products) {
    return (
      <Body>
        <NavBar />
        <Container>
          <Search />
        </Container>
        <Container>
          <LoadingButton
            loading
            variant=""
            size="large"
            fontSize="large"
          ></LoadingButton>
        </Container>
      </Body>
    );
  }
  return (
    <Body>
      <NavBar />
      <Container>
        <Search />
      </Container>

      <ProductRow>
        {data.products.map((row) => {
          return (
            <ProductCard
              key={row.id}
              image={row.image}
              title={row.name}
              price={row.price}
              offerPrice={row.offerPrice}
              slug={row.slug}
            />
          );
        })}
      </ProductRow>
      <Container>
        <Button
          variant="outlined"
          startIcon={<SouthIcon />}
          onClick={handleClick}
        >
          VIEW MORE....
        </Button>
      </Container>
    </Body>
  );
}
