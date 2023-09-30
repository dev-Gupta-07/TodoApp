import {React,useState} from 'react'
import { Avatar, Box, Menu,Button, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import {  ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import ProfileModel from './ProfileModel';
import CreateTodo from './CreateTodo';
const Navbar = ({user}) => {
    const navigate=useNavigate();
     const logoutHandler = () => {
       localStorage.removeItem("userDetails");
       navigate("/");
     }
const [isProfileModalOpen, setProfileModalOpen] = useState(true);
 const { isOpen, onOpen, onClose } = useDisclosure();
 


  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="grey"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Create a todo" hasArrow placement="bottom-end">
          <Button  colorScheme="teal" variant="solid" onClick={onOpen}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: "none", md: "flex" }} x="4">
              Create a todo
            </Text>
          </Button>
        </Tooltip>
        <CreateTodo
          user={user}
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
        ></CreateTodo>

        <Text paddingLeft="20px"fontSize="4x1" fontFamily="Work-sans">
          Welcome to the to-do-app manage your work by creating updating
          deleting to-do details
        </Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
            ></Avatar>
          </MenuButton>
          <MenuList>
            <ProfileModel user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModel>
            <MenuDivider></MenuDivider>
            <MenuItem onClick={logoutHandler}>Log-Out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </div>
  );
}

export default Navbar
