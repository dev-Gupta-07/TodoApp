import {
  Button,
  Card,
  CardBody,
  useToast,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  HStack,
  VStack,
  useDisclosure,

} from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import axios from "axios";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import EditTodo from "./EditTodo";


const ToDoPanel = ({ user }) => {
  const [list, setList] = useState([]);
  const [del, setDel] = useState(false);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const[item,setItem]=useState();
   const [item1, setItem1] = useState();
   const [item2, setItem2] = useState();
  const [checkDone, setCheckDone] = useState(false);

  const toast = useToast();
  
  function upDateStatus(itemId, isChecked) {
    if(isChecked===true)
    {  
        toast({
          title: "Already marked done",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const{ data}= axios.put(`/api/do/todo/${itemId}`, {
        completed: true,
      },config);
       setCheckDone(true);
      
        toast({
          title: "Update Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      
     
    } catch (error) {
      toast({
        title: "Error Occured",
         description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  const handleDelete = async (e) => {
    try {
       const config = {
         headers: {
           Authorization: `Bearer ${user.token}`,
         },
       };
      const key = e.target.value;
      const response = axios.delete(`/api/do/todo/${key}`,config);
      setDel(true);
      if (response) {
        toast({
          title: "Deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    const config={
            headers:{
                Authorization:`Bearer ${user.token}`,

            },
          }
    const data = axios.get(`/api/do/todos-all`,config);
    
    data.then((res) => {
      const list=res.data.todos;
      const newList=list.filter((item)=>item.owner==user._id)
      setList(newList);
    });
  }, [del, checkDone,list,item,item1,item2]);

  return (
    <>
      <SimpleGrid
        spacing={4}
        padding={10}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {user && list.length > 0 ? (
          list.map((item, ind) => (
            <>
              <Card key={ind}>
                <CardHeader>
                  <Heading size="sm">{item.title}</Heading>
                </CardHeader>
                <CardBody size="md">
                  <HStack>
                    <Text>
                      <b>Description</b>:{item.description}
                    </Text>
                    
                  </HStack>

                  <HStack>
                    <Text>
                      <b>Completion Status</b> :
                    </Text>
                    {item.completed ? <CheckIcon /> : <CloseIcon />}
                  </HStack>
                  <br></br>
                  <Text>
                    <b>Created on {item.createdAt.substr(0, 10)}</b>
                  </Text>
                </CardBody>
                <CardFooter>
                  <VStack spacing="5px" color="black" alignItems="center">
                    <Button
                      value={item._id}
                      colorScheme="blue"
                      width="100%"
                      style={{ marginTop: 15 }}
                      onClick={() => {
                        setItem(item._id);

                        onOpen();
                      }}
                    >
                      Edit Details
                    </Button>

                    <Button
                      value={item._id}
                      colorScheme="blue"
                      width="100%"
                      style={{ marginTop: 15 }}
                      onClick={() => upDateStatus(item._id, item.completed)}
                    >
                      Mark it done
                    </Button>
                    <Button
                      value={item._id}
                      colorScheme="blue"
                      width="100%"
                      style={{ marginTop: 15 }}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </VStack>
                </CardFooter>
              </Card>
            </>
          ))
        ) : (
          
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft:"700px"
              }}
            >
              <h1>Nothing!!</h1>
            </div>
        
        )}
      </SimpleGrid>
      {item && (
        <EditTodo
          user={user}
          item={item}
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
        ></EditTodo>
      )}
    </>
  );
};

export default ToDoPanel;
