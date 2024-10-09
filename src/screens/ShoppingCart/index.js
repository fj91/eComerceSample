import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Body } from "../../components/Body";
import { NavBar } from "../../components/NavBar";
import { useShoppingCart } from "../../hooks/useShoppingCart";
import { styled } from "@mui/system";


const Row = styled("div")`
  display: flex;
  flex-direction: row;
`;


export default function ShoppingCart() {
  const { products } = useShoppingCart();
  /*const [p2, setP2] = useState([]);
  const handleChange = (event,id) => {
    setP2((currentProducts) => {     
      return [...currentProducts, { "id": id , "quantity": event.target.value }];
    });
  };
  useEffect(function syncFromLocalStorage() {
    const persistedQuantity= localStorage.getItem("quantityList");
    if (persistedQuantity) {
      setP2(persistedQuantity);
    }
  }, []);
  useEffect(
    function syncToLocalStorage() {
        localStorage.setItem("quantityList", p2);      
    },
    [p2]
  );*/
  return (
    <Body>
      <NavBar />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          color: "black",
          textDecoration: "none",
          paddingTop: "50px",
          paddingLeft: "100px",
        }}
      >
        Shoping cart:
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 560,
          bgcolor: "background.paper",
          paddingTop: "15px",
          paddingLeft: "100px",
        }}
      >
        {products.map((product) => (
          <Row key={product.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  variant="square"
                  sx={{ width: 100, height: 100 }}
                  src={product.image}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{ display: "inline", margin: "30px" }}
                primary={product.name}
              />
              {/*<TextField
                id="outlined-number-only-input"
                label="Number"
                type="number"  
                defaultValue="1"            
                //value={p2.quantity}
                InputProps={{ inputProps: { max: 10, min: 1 } }}
                min="1"
                InputLabelProps={{
                  shrink: true,
                }}
                //onChange={handleChange(product.id)}                             
              />*/}
            </ListItem>
          </Row>
        ))}
      </List>
    </Body>
  );
}
