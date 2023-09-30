import {
  useToast,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const navigate=useNavigate();
     const [name, setName] = useState();
     const [email, setEmail] = useState();
     const [password, setPassword] = useState();
     const [confirmpassword, setConfirmpassword] = useState();
     
     const [show, setShow] = useState(false);
     const [loading, setLoading] = useState(false);
     const toast = useToast();
     const handleClick = () => setShow(!show);
     const submitHandler = async () => {
       setLoading(true);
       if (!name || !email || !password || !confirmpassword) {
         toast({
           title: "Please fill all the fields",
           status: "warning",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
         setLoading(false);
         return;
       }
       if (password !== confirmpassword) {
         toast({
           title: "Passwords do not match",
           status: "warning",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
         setLoading(false)
         return;
       }
       
       try {
         const config = {
           headers: {
             "Content-type": "application/json",
           },
         };
         const { data } = await axios.post(
           "/api/user",
           {
             name,
             email,
             password,
           },
           config
         );
       
         toast({
           title: "Registration Successful",
           status: "success",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
         setLoading(false);
          localStorage.setItem("userDetails", JSON.stringify(data));
          navigate("/todo");
       } catch (error) {
         toast({
           title: "Error Occured!",
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
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75 rem " size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75 rem " size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
