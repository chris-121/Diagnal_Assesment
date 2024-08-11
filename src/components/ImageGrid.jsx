import PropTypes from "prop-types";
import React, { useEffect, useMemo, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import GridItem from "./common/styled-components/GridItem";

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

function ImageGrid({ shows, fetchShows }) {
  const containerRef = useRef(null);
  const triggerElement = useRef(null);

  const lastRowItems = useMemo(() => {
    return shows.length % 3;
  }, [shows.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchShows();
        }
      },
      { root: containerRef.current, rootMargin: "100px" }
    );

    if (triggerElement.current) {
      observer.observe(triggerElement.current);
    }

    return () => {
      if (triggerElement.current) {
        observer.unobserve(triggerElement.current);
      }
    };
  }, [fetchShows]);

  return (
    <Box sx={sxStyles.root} ref={containerRef}>
      <Grid marginTop={8} container rowSpacing={2}>
        {shows.map((show, index) => {
          const isLastRow = index >= shows.length - lastRowItems;
          const xsValue = isLastRow && lastRowItems === 2 ? 6 : 4;

          return (
            <Grid item xs={xsValue} key={index}>
              <GridItem elevation={0}>
                <LazyLoadImage
                  src={`https://test.create.diagnal.com/images/${show["poster-image"]}`}
                  width={"100px"}
                  height={"150px"}
                  alt={"Show-image"}
                  placeholderSrc={
                    "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png"
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png";
                  }}
                />
                <Typography sx={sxStyles.name}>{show.name}</Typography>
              </GridItem>
            </Grid>
          );
        })}
        <div ref={triggerElement} style={{ height: "1px" }}></div>
      </Grid>
    </Box>
  );
}

ImageGrid.propTypes = {
  fetchShows: PropTypes.func.isRequired,
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      "poster-image": PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGrid;
