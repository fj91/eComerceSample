import { List, ListItemText } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import LoadingButton from "@mui/lab/LoadingButton";

export const Specifications = () => {
  const params = useParams();
  const { data, loading } = useFetch(
    `https://ddam-2022-react-api.onrender.com/shop/${params.slug}/specifications`
  );

  if (!data || loading)
    return (
      <LoadingButton
        loading
        variant=""
        size="large"
        fontSize="large"
      ></LoadingButton>
    );
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data.map((specifications, index) => {
        return (
          <ListItemText
            key={index}
            primary={specifications.key}
            secondary={specifications.value}
          />
        );
      })}
    </List>
  );
};
