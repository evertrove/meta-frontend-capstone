import React from "react";
import { Box, HStack, VStack, Image, Heading, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, description, imageSrc }) => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    shadow="md"
    bg="white"
    p={4}
    height="100%"
  >
    <Image src={imageSrc} alt={title} />
    <VStack spacing={2} alignItems="start" mt={4}>
      <Heading size="md">{title}</Heading>
      <Text fontSize="sm">{description}</Text>
    </VStack>
    <HStack justifyContent="flex-end" mt={4}>
      <Text fontSize="sm">Learn More</Text>
      <FontAwesomeIcon icon={faArrowRight} size="1x" />
    </HStack>
  </Box>
);

export default Card;

