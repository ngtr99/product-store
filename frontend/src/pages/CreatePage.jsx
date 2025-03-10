import { useState } from 'react'
import { Container, VStack, Heading, Box, Button } from '@chakra-ui/react'
import { useColorModeValue } from '../components/ui/color-mode'
import { Input } from "@chakra-ui/react";
import { useProductsStore } from '../stores/products'
import {Toaster, toaster} from '../components/ui/toaster'

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        item: '',
        price: '',
        image: ''
    })
 
    const {createProduct} = useProductsStore()
    const handleAddProduct = async () => {
        const {success,message } = await createProduct(newProduct)
        if (!success) {
            toaster.create({
            title: "Error",
            description: message,
            })
        } else {
            toaster.create({
            title: "Success",
            description: "Product created successfully",
            })
        }
    }

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                    <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
                        Create New Product
                    </Heading>
                    <Box w={"full"} bg={useColorModeValue("gray.100", "gray.700")} p={4} borderRadius={"md"}>
                        <VStack spacing={4}>
                            <Input
                                type="text"
                                placeholder="Item"
                                value={newProduct.item}
                                onChange={(e) => setNewProduct({...newProduct, item: e.target.value})}
                            />
                            <Input
                                type="number"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            />
                            <Input
                                type="text"
                                placeholder="Image"
                                value={newProduct.image}
                                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                            />
                            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>Create</Button>
                        </VStack>
                    </Box>
            </VStack>
            <Toaster />
        </Container>
    )
}

export default CreatePage

