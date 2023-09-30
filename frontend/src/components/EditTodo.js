import React, { useState } from "react";
import axios from "axios";
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

const EditTodo = ({user,onOpen,isOpen,onClose,children,item}) => {
    const [title, setTitle] = useState("");
   
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [owner, setOwner] = useState(user._id);
    
    const toast = useToast();
    const handleCreate = async () => {
      setLoading(true);
      if (!title && !description) {
        toast({
          title: "Please Fill  to update",
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
        const { data } = await axios.put(
          `/api/do/todo/${item}`,
          { title, description ,completed:false},
          config
        );

        // console.log(data);
        toast({
          title: "Updation Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setDescription("")
        setTitle("")
        setLoading(false);
      } catch (error) {
        toast({
          title: "Field cannot be empty",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setDescription("");
        setTitle("");
        setLoading(false);
      }
    };
   
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update todo</ModalHeader>

          <ModalBody>
            <VStack spacing="5px" color="black">
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  placeholder="Enter your new Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <InputGroup>
                  <Textarea
                    placeholder="Enter your new description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreate}
              isLoading={loading}
            >
             Edit
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTodo;
