// src/components/SearchBar.jsx
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SearchContext } from "../../pages/context";

const textFieldStyles = {
  width: "100%",
  padding: "0 16px",
  input: { color: "#fff" },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
};

const SearchBar = ({ isSearchBarOpen, onClickSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { onSearch } = useContext(SearchContext);

  const onChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleClose = () => {
    setSearchTerm("");
    if (onSearch) onSearch("");
    onClickSearch();
  };

  return (
    <>
      {isSearchBarOpen ? (
        <TextField
          autoFocus
          variant={"standard"}
          placeholder="Search..."
          value={searchTerm}
          onChange={onChange}
          sx={textFieldStyles}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img
                  height={"20px"}
                  alt="Search icon"
                  src={"https://test.create.diagnal.com/images/search.png"}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClose} edge="end">
                  <CloseIcon sx={{ color: "White" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <IconButton onClick={onClickSearch} sx={{ paddingRight: "16px" }}>
          <img
            height={"20px"}
            width={"20px"}
            alt="Search button"
            src={"https://test.create.diagnal.com/images/search.png"}
          />
        </IconButton>
      )}
    </>
  );
};

SearchBar.propTypes = {
  isSearchBarOpen: PropTypes.bool,
  onClickSearch: PropTypes.func,
};

export default SearchBar;
