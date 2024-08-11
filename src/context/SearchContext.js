import { createContext } from "react";

export const SearchContext = createContext({
  isSearching: false,
  onSearch: () => {},
  onClickSearch: () => {},
});
