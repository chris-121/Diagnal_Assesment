import PropTypes from "prop-types";
import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

const sxStyles = {
  root: {
    backgroundImage: "url(https://test.create.diagnal.com/images/nav_bar.png)",
    position: "fixed",
    padding: "8px 16px",
    width: "100%",
    marginTop: "-40px",
    height: "150px",
  },
  rootContent: {
    width: "100%",
    display: "flex",
    marginTop: "52px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    paddingLeft: "16px",
    gap: 1,
  },
};

function NavBar({ title = "" }) {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const handleClickOnSearch = () => {
    setIsSearchBarOpen((prev) => !prev);
  };

  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.rootContent}>
        {!isSearchBarOpen && (
          <Box sx={sxStyles.title}>
            <IconButton>
              <img
                height={"20px"}
                width={"20px"}
                src={"https://test.create.diagnal.com/images/Back.png"}
              />
            </IconButton>
            <Typography sx={{ fontFamily: "'Titillium Web', sans-serif" }}>
              {title}
            </Typography>
          </Box>
        )}
        <SearchBar
          isSearchBarOpen={isSearchBarOpen}
          onClickSearch={handleClickOnSearch}
        />
      </Box>
    </Box>
  );
}

NavBar.propTypes = {
  title: PropTypes.string,
  onSearch: PropTypes.func,
};

export default NavBar;
