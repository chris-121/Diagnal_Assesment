import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import { SearchContext } from "../../context/SearchContext";

const sxStyles = {
  root: {
    backgroundImage: `url(${
      import.meta.env.VITE_BASE_API_URL
    }/images/nav_bar.png)`,
    position: "fixed",
    padding: "8px 16px",
    width: "100%",
    marginTop: "-48px",
    height: "150px",
    zIndex: 2,
  },
  rootContent: {
    width: "100%",
    display: "flex",
    marginTop: "56px",
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

function NavBar({ title = "", scrollToTop = () => {} }) {
  const { isSearching } = useContext(SearchContext);

  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.rootContent}>
        {!isSearching && (
          <Box sx={sxStyles.title}>
            <IconButton onClick={scrollToTop}>
              <img
                height={"20px"}
                width={"20px"}
                alt={"Back-Icon"}
                src={"https://test.create.diagnal.com/images/Back.png"}
              />
            </IconButton>
            <Typography
              sx={{
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "20px",
              }}
            >
              {title}
            </Typography>
          </Box>
        )}
        <SearchBar />
      </Box>
    </Box>
  );
}

NavBar.propTypes = {
  scrollToTop: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default NavBar;
