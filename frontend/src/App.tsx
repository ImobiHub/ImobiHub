import { Box, Button, Heading } from "@chakra-ui/react";

function App() {
  return (
    <Box p={8}>
      <Heading>Chakra UI funcionando!</Heading>
      <Button mt={4} colorScheme="teal">
        Clique aqui
      </Button>
    </Box>
  );
}

export default App;