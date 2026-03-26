import { Box, Image, Heading, Text } from "@chakra-ui/react";

interface ImovelCardProps {
  titulo: string;
  preco: number;
  local: string;
  imagem: string;
}

export function ImovelCard({ titulo, preco, local, imagem }: ImovelCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      _hover={{ shadow: "lg" }}
    >
      <Image src={imagem} alt={titulo} borderRadius="md" />

      <Heading fontSize="xl" mt="3">{titulo}</Heading>

      <Text fontWeight="bold" color="green.500">
        R$ {preco.toLocaleString()}
      </Text>

      <Text color="gray.600">{local}</Text>
    </Box>
  );
}