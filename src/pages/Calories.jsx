import React, { useEffect, useState } from "react";
import "./homepage.css";
import { Box, Button, Input, Spinner, Flex, useToast } from "@chakra-ui/react";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import axios from "axios";

function Calories(props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [minCalories, setMinCalories] = useState("");
  const [maxCalories, setMaxCalories] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY
  const API_ID = process.env.REACT_APP_API_ID

   useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleAddToNow = (userId) => {
    toast({
      title: "Order placed",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleSearchByCalories = async () => {
    if (minCalories && maxCalories) {
      try {
        const URL = `https://api.edamam.com/api/recipes/v2?type=public&calories=${minCalories}-${maxCalories}&app_id=${API_ID}&app_key=${API_KEY}`;
        const { data } = await axios.get(URL);
        setSearchResults(data.hits);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div>
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Input
            type="number"
            placeholder="Min Calories"
            value={minCalories}
            onChange={(e) => setMinCalories(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Calories"
            value={maxCalories}
            onChange={(e) => setMaxCalories(e.target.value)}
          />
          <Button colorScheme="cyan" onClick={handleSearchByCalories}>
            Search by Calories
          </Button>
        </Box>
      </div>

      <div className="mainContainer">
        {!isLoading ? (
          searchResults.length > 0 ? (
            searchResults.map((result, id) => (
              <RecipeCard
                id={id}
                recipe={result.recipe}
                handleAddToNow={handleAddToNow}
                showButtons={true}
              />
            ))
          ) : (
            <p>No search results found.</p>
          )
        ) : (
          <Flex align="center" justify="center" minH="100vh">
            <Spinner
              size="xl"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal.500"
            />
          </Flex>
        )}
      </div>
    </div>
  );
}

export default Calories;
