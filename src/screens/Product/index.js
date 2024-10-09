import { Card, CardContent } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Body } from "../../components/Body";
import { NavBar } from "../../components/NavBar";
import { styled } from "@mui/material/styles";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate, useParams} from "react-router-dom";
import { useShoppingCart } from "../../hooks/useShoppingCart";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Specifications } from "./components/Specifications";
import Collapse from "@mui/material/Collapse";
import Typography from '@mui/material/Typography';

const Container = styled("div")`
  display: flex;
  margin: auto;
  padding-top: 15px;
  flex-wrap: no-wrap;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-wrap: wrap;
  }
`;

const PImage = styled("img")`
  width: 95%;
  object-fit: cover;
`;

const PContainer = styled("div")`
  flex: 0 1 50%;
  width: 50%;

  min-width: 300px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
    flex: 1;
    justify-content: center;
    display: flex;
  }
`;

const PDetail = styled("div")`
  flex: 0 1 50%;
  min-width: 300px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
    flex: 1;
  }
`;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Product() {
  const params = useParams();
  const navigate = useNavigate();
  const { handleAddProduct } = useShoppingCart();
  const [expanded, setExpanded] = useState(false); 
  const { data: product, loading } = useFetch(
    "https://ddam-2022-react-api.onrender.com/shop/" + params.slug
  );
  const handleExpandClick = useCallback(
    (event) => {
      setExpanded(!expanded);
      navigate(`/product/${params.slug}/specifications`);
    },
    [navigate, params.slug, expanded]
  );
  if (loading || !product) {
    return (
      <Body>
        <NavBar />
      </Body>
    );
  }
  return (
    <Body>
      <NavBar />
      <Container>
        <PContainer>
          <PImage src={product.image} alt="image" />
        </PContainer>
        <PDetail>
          <Card>
            <CardContent>
              <h2>{product.name}</h2>
              <h3>{product.brand}</h3>
              <p>{product.description}</p>
              <Rating name="read-only" value={product.rating} readOnly />
              <p>{product.price} CLP</p>
              <Button
                variant="outlined"
                onClick={() => {
                  handleAddProduct(product);
                }}
              >
                Add To Cart
              </Button>
            </CardContent>
            <CardActions disableSpacing>
              <Typography>Specifications</Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"                
                label="Specifications"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Specifications />
              </CardContent>
            </Collapse>
          </Card>
        </PDetail>
      </Container>
    </Body>
  );
}
