import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const ProductCardContainer = styled(Card)`
  flex: 0 1 24%;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex: 0 1 33%;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex: 0 1 49%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export function ProductCard(props) {
  const { image, title, price, offerPrice, slug } = props;
  return (
    <ProductCardContainer>
      <CardMedia component="img" alt="eshop-prod" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textDecoration: offerPrice ? "line-through" : "none",
            color: offerPrice ? "text.secondary" : "none",
            fontWeight: !offerPrice ? "bold" : "none",
          }}
        >
          {price}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
          }}
        >
          {offerPrice}
        </Typography>
      </CardContent>
      <CardActions>
        <StyledLink to={"/product/" + slug}>
          <Button size="small">View</Button>
        </StyledLink>
      </CardActions>
    </ProductCardContainer>
  );
}
