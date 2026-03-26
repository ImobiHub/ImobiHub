import { Box, Heading, Text, Button } from "@chakra-ui/react";

function App() {
  return (
    <Box p={8}>
      <Heading>ImobiHub - Frontend</Heading>
      <Text mt={4}>Primeira página React com Chakra UI funcionando!</Text>
      <Button mt={4} colorScheme="teal">Clique aqui</Button>
    </Box>
  );
}

export default App;