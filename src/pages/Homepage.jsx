import { Box } from "@mui/material";
import NavBar from "../components/navbar/Navbar";
import React, { Suspense, useCallback, useState, lazy } from "react";
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

  const handleSearch = (query) => {
    setFilteredShows(
      shows.filter((show) =>
        show.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const fetchShows = useCallback(() => {
    if (isFetching || pageNumber > 3) return;
    setIsFetching(true);

    axios
      .get(`https://test.create.diagnal.com/data/page${pageNumber}.json`)
      .then(({ data: { page } }) => {
        setTitle(page.title);
        const content = page["content-items"].content;

        setShows((prevShows) => [...prevShows, ...content]);
        setFilteredShows((prevShows) => [...prevShows, ...content]);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      })
      .catch((error) => console.log(getErrorMessage(error)))
      .finally(() => setIsFetching(false));
  }, [isFetching, pageNumber]);

  return (
    <Box sx={sxStyles.root}>
      <SearchContext.Provider value={{ onSearch: handleSearch }}>
        <NavBar title={title.sadsad.asda} />
      </SearchContext.Provider>
      <Suspense fallback={<div>Loading...</div>}>
        <ImageGrid shows={filteredShows} fetchShows={fetchShows} />
      </Suspense>
    </Box>
  );
}

export default Homepage;
