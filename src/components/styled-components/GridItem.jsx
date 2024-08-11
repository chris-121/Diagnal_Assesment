import { Paper, styled } from "@mui/material";

const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: theme.spacing(1),
  textAlign: "center",
}));

export default GridItem;
