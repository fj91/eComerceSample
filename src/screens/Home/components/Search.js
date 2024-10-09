import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from "react-router-dom";


export function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") ?? "";
  const handleWrite = (e) => {
    const newQuery = new URLSearchParams(location.search);
    newQuery.set("q", e.target.value);
    navigate(location.pathname + "?" + newQuery.toString(), {});
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuery = new URLSearchParams(location.search);
    newQuery.set("q", query);
    navigate("/?" + newQuery.toString());
  };
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      onSubmit={handleSubmit}
    >
      
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search products, brands and more...."
        inputProps={{ 'aria-label': 'search google maps' }}
        value={query}
        onChange={handleWrite}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>      
    </Paper>
  );
}