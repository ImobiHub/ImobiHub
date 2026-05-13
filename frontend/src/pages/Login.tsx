import { Box, Button, Flex, FormControl, FormLabel, Input, Heading, Text, Link, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex flex="1" align="center" justify="center" bg="#f5f5f5" p={4}>
        <Box w="full" maxW="400px" bg="white" p={8} borderRadius={10} boxShadow="0 4px 12px rgba(0,0,0,0.1)">
          <VStack spacing={4} align="flex-start">
            <Heading size="lg" color="#222">Acesse sua conta</Heading>
            <Text color="#777">Bem-vindo de volta ao ImobiHub!</Text>
            
            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input type="email" placeholder="seu@email.com" focusBorderColor="#f4b400" />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="********" focusBorderColor="#f4b400" />
            </FormControl>

            <Button bg="#f4b400" color="white" w="full" _hover={{ bg: "#d49d00" }} fontWeight="bold">
              Entrar
            </Button>

            <Text textAlign="center" w="full">
              Não tem conta?{" "}
              <Link as={RouterLink} to="/cadastro" color="#f4b400" fontWeight="bold">
                Cadastre-se
              </Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}