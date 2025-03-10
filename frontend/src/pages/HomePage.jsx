import { Container, VStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom' 
import { useEffect } from 'react'
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ui/ProductCard'

const HomePage = () => {
  const {fetchProducts, products} = useProductsStore()
  useEffect(() => {fetchProducts()}, [fetchProducts])
  console.log("products",products)
  return (
    <Container maxW="container.lg" py={12}>
      <VStack>
      <Text fontSize={"xl"} fontWeight={"bold"} bgGradient={'to-r'} gradientFrom={'cyan.400'} gradientTo={'blue.900'} bgClip={'text'}>Current Products</Text>
        {products.length === 0 ? (
          <>
            <Text fontSize={"15"} textAlign={"center"} fontWeight={"bold"}>No Products Found</Text>
              <Link to={"/create"}>
                <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}>Create a product</Text>
              </Link>
          </>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"} gap={"10"}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product}/>
              ))}
            </SimpleGrid>
          </>
        )}
      </VStack>
    </Container>

  )
}

export default HomePage

