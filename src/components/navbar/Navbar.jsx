import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import { SearchContext } from "../../pages/context";

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
  const { isSearching } = useContext(SearchContext);

  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.rootContent}>
        {!isSearching && (
          <Box sx={sxStyles.title}>
            <IconButton>
              <img
                height={"20px"}
                width={"20px"}
                alt={"Back-Icon"}
                src={"https://test.create.diagnal.com/images/Back.png"}
              />
            </IconButton>
            <Typography sx={{ fontFamily: "'Titillium Web', sans-serif" }}>
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
  title: PropTypes.string.isRequired,
};

export default NavBar;
