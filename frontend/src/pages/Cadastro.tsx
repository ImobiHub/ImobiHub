import { Box, Button, Flex, FormControl, FormLabel, Input, Heading, Select, VStack, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cadastro() {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex flex="1" align="center" justify="center" bg="#f5f5f5" py={10}>
        <Box w="full" maxW="500px" bg="white" p={8} borderRadius={10} boxShadow="0 4px 12px rgba(0,0,0,0.1)">
          <VStack spacing={4} align="flex-start">
            <Heading size="lg">Crie sua conta</Heading>
            
            <FormControl id="nome">
              <FormLabel>Nome Completo</FormLabel>
              <Input placeholder="Seu nome" focusBorderColor="#f4b400" />
            </FormControl>

            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input type="email" placeholder="exemplo@email.com" focusBorderColor="#f4b400" />
            </FormControl>

            <FormControl id="user-type">
              <FormLabel>Eu sou...</FormLabel>
              <Select placeholder="Selecione" focusBorderColor="#f4b400">
                <option value="cliente">Cliente (Quero buscar imóveis)</option>
                <option value="corretor">Corretor (Quero anunciar)</option>
              </Select>
            </FormControl>

            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="Crie uma senha forte" focusBorderColor="#f4b400" />
            </FormControl>

            <Button bg="#f4b400" color="white" w="full" _hover={{ bg: "#d49d00" }} size="lg">
              Cadastrar
            </Button>

            <Text textAlign="center" w="full">
              Já possui conta?{" "}
              <Link as={RouterLink} to="/login" color="#f4b400" fontWeight="bold">
                Faça login
              </Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}