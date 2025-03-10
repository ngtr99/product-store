import {Container} from '@chakra-ui/react'
import {Flex} from '@chakra-ui/react'
import {Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {HStack} from '@chakra-ui/react'
import {Button} from '@chakra-ui/react'
import { CiSquarePlus } from "react-icons/ci"
import React from 'react'
import {useColorMode} from "./color-mode"
// import { useProductsStore } from '../../stores/products'

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    // const {products} = useProductsStore()
    return (
        <Container maxW="1140px" px={4}>
            <Flex 
                h={16}
                alignItems={'center'}
                justifyContent={'space-between'}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}>
                <Text
                    fontSize={{ base: "2xl", sm: "3xl" }}
                    fontWeight="bold"
                    bgGradient={'to-r'}
                    gradientFrom={'cyan.400'}
                    gradientTo={'blue.500'}
                    bgClip={'text'}
                    >
                    <Link to="/">Product Store</Link>
                </Text>
                <HStack spacing={8} alignItems={'center'}>
                    <Link to="/create">   
                        <Button>
                            <CiSquarePlus />
                        </Button>
                    </Link> 
                    <Button onClick={toggleColorMode}>
                        {colorMode === "Light" ? "Dark" : "Light"}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar