import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import React, { useContext, useEffect } from "react";
import { BasketContext } from "../contexts/BasketContext";
import { useDispatch, useSelector } from "react-redux";

function Products() {
  const dispatch = useDispatch()
  let basket = useSelector(state=>state)


  const { error, isLoading, data } = useQuery(["Products"], () => {
    return axios.get("https://fakestoreapi.com/products");
  });

  const isInBasket = (product) =>{
    return basket.some(item => item.id == product.id)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        backgroundColor:"orange",
        height:"100vh"
      }}
    >
      {error && (
        <h1 style={{ color: "red" }}>
          Data can not be fetched. Please refresh the page
        </h1>
      )}

      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {data &&
        data?.data?.map((product) => (
          <Card
            sx={{ maxWidth: 345, width: 500, margin: 2, position: "relative" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt="product image"
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
                  style={{ fontSize: 14, fontWeight: 700 }}
                >
                  {product.price}$
                </Typography>
              </CardContent>
            </CardActionArea>
            {isInBasket(product) ? (
              <CardActions sx={{ position: "absolute", bottom: 2, right: 2 }}>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => dispatch({type:"ADD_REMOVE_PRODUCT",payload:product}) }
                >
                  Remove from basket
                </Button>
              </CardActions>
            ) : (
              <CardActions sx={{ position: "absolute", bottom: 2, right: 2 }}>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => dispatch({type:"ADD_REMOVE_PRODUCT",payload:product}) }
                >
                  Add to basket
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
    </Box>
  );
}

export default Products;
