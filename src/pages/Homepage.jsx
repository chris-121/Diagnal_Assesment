import { Box } from "@mui/material";
import NavBar from "../components/navbar/Navbar";
import React, { Suspense, useCallback, useState, lazy, useRef } from "react";
import axios from "axios";
import { SearchContext } from "./context";
import { getErrorMessage } from "../utils/getErrorMessage";

const ImageGrid = lazy(() => import("../components/ImageGrid"));

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

function Homepage() {
  const [title, setTitle] = useState("");
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const imageGridContainerRef = useRef(null);

  const handleSearch = (query) => {
    setFilteredShows(
      shows.filter((show) =>
        show.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleClickOnSearch = () => {
    setIsSearching((prev) => !prev);
  };

  const fetchShows = useCallback(() => {
    if (isSearching || isFetching || pageNumber > 3) return;
    setIsFetching(true);

    axios
      .get(`${import.meta.env.VITE_BASE_API_URL}/data/page${pageNumber}.json`)
      .then(({ data: { page } }) => {
        setTitle(page.title);
        const content = page["content-items"].content;

        setShows((prevShows) => [...prevShows, ...content]);
        setFilteredShows((prevShows) => [...prevShows, ...content]);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      })
      .catch((error) => console.log(getErrorMessage(error)))
      .finally(() => setIsFetching(false));
  }, [isFetching, pageNumber, isSearching]);

  const scrollToTop = useCallback(() => {
    imageGridContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box sx={sxStyles.root}>
      <SearchContext.Provider
        value={{
          isSearching,
          onSearch: handleSearch,
          onClickSearch: handleClickOnSearch,
        }}
      >
        <NavBar title={title} scrollToTop={scrollToTop} />
      </SearchContext.Provider>
      <Suspense fallback={<div>Loading...</div>}>
        <ImageGrid
          shows={filteredShows}
          fetchShows={fetchShows}
          containerRef={imageGridContainerRef}
        />
      </Suspense>
    </Box>
  );
}

export default Homepage;
