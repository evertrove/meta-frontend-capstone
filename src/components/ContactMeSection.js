import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useAlertContext } from "../context/alertContext";
import useSubmit from "../hooks/useSubmit";

const ContactMeSection = () => {
  const { isLoading, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string()
        .required("Required")
        .email("Invalid email address"),
      comment: Yup.string().required("Required").min(25, "Must be at least 25 characters"),
    }),
    onSubmit: (values) => {
      submit(values).then((response) => {
        if (response.type === "success") {
          onOpen({ message: `Thank you, ${values.firstName}! Your message has been submitted successfully.`, type: "success" });
          formik.resetForm();
        } else {
          // Handle error response here if needed
        }
      });
    },
  });

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      setIsHeaderVisible(true);
    } else {
      setIsHeaderVisible(false);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const headerStyle = {
    transform: isHeaderVisible ? "translateY(0)" : "translateY(-200px)",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <Box
      ref={headerRef}
      style={headerStyle}
      position="fixed"
      top="0"
      left="0"
      right="0"
      backgroundColor="#20232a"
      padding="16px"
      zIndex="999"
    >
      <FullScreenSection
        isDarkBackground
        backgroundColor="#512DA8"
        py={16}
        spacing={8}
      >
        <VStack w="1024px" p={32} alignItems="flex-start">
          <Heading as="h1" id="contactme-section">
            Contact me
          </Heading>
          <Box p={6} rounded="md" w="100%">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4}>
                <FormControl
                  isInvalid={formik.touched.firstName && formik.errors.firstName}
                >
                  <FormLabel htmlFor="firstName">Name</FormLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    {...formik.getFieldProps("firstName")}
                  />
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.email && formik.errors.email}
                >
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.touched.type && formik.errors.type}>
                  <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                  <Select id="type" name="type" {...formik.getFieldProps("type")}>
                    <option value="hireMe">Freelance project proposal</option>
                    <option value="openSource">Open source consultancy session</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.comment && formik.errors.comment}
                >
                  <FormLabel htmlFor="comment">Your message</FormLabel>
                  <Textarea
                    id="comment"
                    name="comment"
                    height={250}
                    {...formik.getFieldProps("comment")}
                  />
                  <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </FullScreenSection>
    </Box>
  );
};

export default ContactMeSection;
