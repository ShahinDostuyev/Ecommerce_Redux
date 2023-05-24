import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { BasketContext } from "../contexts/BasketContext";
import { useDispatch, useSelector } from "react-redux";
function Basket() {
  const dispatch = useDispatch()
  let basket = useSelector(state=>state)
  // const { basket, setbasket,handleAddRemove } = useContext(BasketContext);
  console.log("Basket: ", basket);
 
  return (
    <div style={{backgroundColor:"orange",height:"100vh"}}>
      <h1>Basket page</h1>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {basket &&
          basket?.map((product) => (
            <Card
              sx={{
                maxWidth: 345,
                width: 500,
                margin: 2,
                position: "relative",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt="green iguana"
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontSize: 18 }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="purple"
                    style={{ fontSize: 12 }}
                  >
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ position: "absolute", bottom: 2, right: 2 }}>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => dispatch({type:"ADD_REMOVE_PRODUCT",payload:product})}
                >
                  Remove from basket
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </div>
  );
}

export default Basket;
