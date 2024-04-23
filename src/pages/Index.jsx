import React, { useState } from "react";
import { Box, Button, Image, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Index = () => {
  const [signature, setSignature] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignature(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const verifySignature = () => {
    // This function should ideally make an API call to a backend service
    // For demonstration, we'll randomly decide if the signature is verified
    const verified = Math.random() > 0.5;
    setIsVerified(verified);
    toast({
      title: verified ? "Signature Verified" : "Verification Failed",
      status: verified ? "success" : "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <VStack spacing={4} p={5}>
      <Text fontSize="2xl" fontWeight="bold">
        Handwritten Signature Verification
      </Text>
      <Box>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <Button leftIcon={<FaUpload />} ml={2} onClick={verifySignature} colorScheme="blue">
          Upload & Verify
        </Button>
      </Box>
      {signature && <Image src={signature} boxSize="200px" objectFit="contain" />}
      {isVerified !== null && (
        <Box>
          {isVerified ? (
            <Text color="green.500">
              Signature Matches <FaCheckCircle />
            </Text>
          ) : (
            <Text color="red.500">
              Signature Does Not Match <FaTimesCircle />
            </Text>
          )}
        </Box>
      )}
    </VStack>
  );
};

export default Index;
