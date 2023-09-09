import React from "react";
import {useNavigate} from "react-router-dom"
import {
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";

function RecipeCard({
  recipe,
  key,
  showButtons,
  handleAddToNow
}) {
    const navigate = useNavigate();

  return (
    <Card maxW="sm" key={key}>
      <CardBody>
        <Image
        _hover={{cursor:"pointer"}}
          src={recipe.image}
          alt={recipe.label}
          borderRadius="lg"
        />

        <Stack mt="6" spacing="3">
          <Heading size="md">{recipe.label}</Heading>
          <Text>Total Calories:- {(recipe.calories).toFixed(2)}gm</Text>
          <Text>Protein:- {(recipe.totalDaily.PROCNT.quantity).toFixed(2)}gm</Text>
          <Text>Fat:- {(recipe.totalDaily.FAT.quantity).toFixed(2)}gm</Text>
        </Stack>
        <Divider m="10px 0" />
        {
            showButtons ? (<Box display={"flex"} justifyContent="space-around">
          <Button
            colorScheme="cyan"
            onClick={() => handleAddToNow(recipe.id)}
          >
            Order Now
          </Button>
        </Box>):""
        }
        
      </CardBody>
    </Card>
  );
}

export default RecipeCard;
