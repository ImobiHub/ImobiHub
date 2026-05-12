import { Box, Button, Flex, FormControl, FormLabel, Input, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function AdminLogin() {
  return (
    <Flex direction="column" minH="100vh" bg="#222">
      <Navbar />
      <Flex flex="1" align="center" justify="center" p={4}>
        <Box w="full" maxW="400px" bg="white" p={8} borderRadius={10}>
          <VStack spacing={6}>
            <Box textAlign="center">
              <Heading size="md" color="#222">Portal Administrativo</Heading>
              <Text fontSize="sm" color="#777" mt={2}>Gestão interna ImobiHub</Text>
            </Box>

            <FormControl id="admin-id">
              <FormLabel>ID ou E-mail Admin</FormLabel>
              <Input variant="filled" focusBorderColor="#222" />
            </FormControl>

            <FormControl id="admin-password">
              <FormLabel>Chave de Acesso</FormLabel>
              <Input type="password" variant="filled" focusBorderColor="#222" />
            </FormControl>

            <Button bg="#222" color="white" w="full" _hover={{ bg: "#000" }} h="50px">
              Acessar Dashboard
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}