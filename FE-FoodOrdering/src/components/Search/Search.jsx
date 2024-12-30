import React, { useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchItem from "./SearchItem";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItemByKeywordAction } from "../../Redux/Menu/Action";
import MenuCards from "../Restaurant/MenuCard/MenuCards";

const Search = () => {
  const [keyword, setKeyWord] = useState("");

  const dispatch = useDispatch();
  const { menuItemReducer } = useSelector((store) => store);
  const jwtToken = localStorage.getItem("jwtToken");

  const handleSetKeyword = (e) => {
    setKeyWord(e.target.value);
  };

  useEffect(() => {
    dispatch(searchMenuItemByKeywordAction(keyword));
  }, [keyword]);

  return (
    <div className="flex justify-center mx-10 lg:mx-60 mt-10">
      <div className="w-full">
        <TextField
          variant="outlined"
          placeholder="Search..."
          fullWidth
          sx={{
            background: "#242b2e",
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleSetKeyword(e)}
        />

        <div className="mt-8 space-y-5">
          {keyword ? (
            menuItemReducer.menuItemsSearch.map((item) => {
              return <SearchItem key={item.id} item={item} />;
            })
          ) : (
            <h1 className="text-2xl text-center">
              Enter food name or food category to search.
            </h1>
          )}
        </div>

        {/* Show not found foods with given keyword */}
        <div className="mt-8">
          {menuItemReducer.menuItemsSearch.length <= 0 && keyword && (
            <h1 className="text-2xl text-center">
              Sorry, no food items were found matching the keyword "{keyword}".
              Please try searching with a different term.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
