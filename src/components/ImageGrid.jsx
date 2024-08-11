import PropTypes from "prop-types";
import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { debounce } from "lodash";

const sxStyles = {
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    overflow: "scroll",
    scrollbarWidth: "none", // Firefox
    "&::-webkit-scrollbar": {
      display: "none", // Chrome, Safari, and Opera
    },
    backgroundColor: "#171717",
  },
  name: {
    color: "#ffff",
    fontFamily: "'Titillium Web', sans-serif",
  },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: theme.spacing(1),
  textAlign: "center",
}));

function ImageGrid({ shows, fetchShows }) {
  const containerRef = useRef(null);

  const lastRowItems = useMemo(() => {
    return shows.length % 3;
  }, [shows.length]);

  const handleScroll = useCallback(() => {
    if (
      containerRef.current &&
      (containerRef.current.scrollTop / containerRef.current.scrollHeight) *
        100 >
        5
    ) {
      fetchShows();
    }
  }, [fetchShows]);

  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 100),
    [handleScroll]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      if (container) {
        container.removeEventListener("scroll", debouncedHandleScroll);
      }
    };
  }, []);

  return (
    <Box sx={sxStyles.root} ref={containerRef}>
      <Grid marginTop={8} container rowSpacing={2}>
        {shows.map((show, index) => {
          const isLastRow = index >= shows.length - lastRowItems;
          const xsValue = isLastRow && lastRowItems === 2 ? 6 : 4;
          const imgName =
            show["poster-image"] !== "posterthatismissing.jpg"
              ? show["poster-image"]
              : "placeholder_for_missing_posters.png";
          return (
            <Grid item xs={xsValue} key={index}>
              <Item elevation={0}>
                <LazyLoadImage
                  src={`https://test.create.diagnal.com/images/${imgName}`}
                  width={"100px"}
                  height={"150px"}
                  alt="Image Alt"
                  Placeholder={`https://test.create.diagnal.com/images/posterthatismissing.jpg`}
                />
                <Typography sx={sxStyles.name}>{show.name}</Typography>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

ImageGrid.propTypes = {
  fetchShows: PropTypes.func,
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
};

export default ImageGrid;
