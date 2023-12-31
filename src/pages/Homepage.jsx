import React, { useEffect, useState } from "react";
import "./homepage.css";
import { Box, Button, Input, Spinner, Flex, useToast } from "@chakra-ui/react";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import axios from "axios";

function Homepage(props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY
  const API_ID = process.env.REACT_APP_API_ID

  const URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&&app_id=${API_ID}&app_key=${API_KEY}`;

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

  const handleSearchSubmit = async () => {
    if (searchQuery) {
      try {
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
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button colorScheme="cyan" onClick={handleSearchSubmit}>
            Search
          </Button>
        </Box>
      </div>

      <div className="mainContainer">
        {!isLoading ? (
          searchQuery && searchResults.length > 0 ? (
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

export default Homepage;
