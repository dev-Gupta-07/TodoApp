import React, { useState } from 'react'
import axios from 'axios';
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Image,
  Text,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
const CreateTodo = ({user,onOpen,isOpen,onClose,children}) => {
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[loading,setLoading]=useState(false);
    const[owner,setOwner]=useState(user._id);
    
    const toast=useToast();
    const handleCreate=async()=>{
         setLoading(true);
         if (!title || !description) {
           toast({
             title: "Please Fill all the Fields",
             status: "warning",
             duration: 5000,
             isClosable: true,
             position: "bottom",
           });
           setLoading(false);
           return;
         }
          try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        };
          const { data } = await axios.post(
            "/api/do/todo/new",
            {owner, title, description },
            config
          );

        toast({
          title: "To do creation Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setTitle("")
        setDescription("")
        setLoading(false)
      } catch (error) {
        toast({
          title: "Error Occured",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        
      }

    };
   
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a to do</ModalHeader>
          
          <ModalBody>
            <VStack spacing="5px" color="black">
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  placeholder="Enter your Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <InputGroup>
                  <Textarea
                    placeholder="Enter your description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreate}
            isLoading={loading}
            >
              Create
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTodo
