import { Box } from "@mui/material";
import NavBar from "../components/Navbar/NavBar";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ImageGrid from "../components/ImageGrid";
import { SearchContext } from "./context";

const sxStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#171717",
    overflowX: "hidden",
  },
};

const normalizePageContent = (shows = {}) => {
  return shows["content-items"].content;
};

function Homepage() {
  const [title, setTitle] = useState("");
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = (query) => {
    setFilteredShows(
      shows.filter((show) =>
        show.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const fetchShows = useCallback(() => {
    setPageNumber((prevPageNumber) => {
      if (isFetching || prevPageNumber > 3) return prevPageNumber;
      setIsFetching(true);
      axios
        .get(`https://test.create.diagnal.com/data/page${prevPageNumber}.json`)
        .then(({ data: { page } }) => {
          setTitle(page.title);
          const normalizedData = normalizePageContent(page);
          setShows((prev) => [...prev, ...normalizedData]);
          setFilteredShows((prev) => [...prev, ...normalizedData]);

          return prevPageNumber + 1;
        })
        .catch((error) => console.log("Error", error))
        .finally(() => setIsFetching(false));

      // This ensures that the pageNumber updates immediately
      return prevPageNumber + 1;
    });
  }, [isFetching]);

  return (
    <Box sx={sxStyles.root}>
      <SearchContext.Provider value={{ onSearch: handleSearch }}>
        <NavBar title={title} />
      </SearchContext.Provider>
      <ImageGrid shows={filteredShows} fetchShows={fetchShows} />
    </Box>
  );
}

export default Homepage;
