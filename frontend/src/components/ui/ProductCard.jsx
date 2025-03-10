import React, { useState } from "react";
import { Box, Field, Fieldset, Heading, Image, Input, Text } from "@chakra-ui/react";
import { IconButton, HStack } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useColorModeValue } from "./color-mode";
import { useProductsStore } from "../../stores/products";
import { Toaster, toaster } from "./toaster";
import { Button, Dialog, Portal } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  // Delete product
  const textColor = useColorModeValue("gray.800", "white");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct } = useProductsStore();
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
    });
  };

  // Update product
  const [open, setOpen] = useState(false);
  const onOpenChange = (e) => {
    setOpen(e.open);
  };
  const { updateProduct } = useProductsStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const handleUpdateProduct = async (id, updatedProduct) => {
    await updateProduct(id, updatedProduct);
    setOpen(false);
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.item}
        h={48}
        w="full"
        fit="contain"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.item}
        </Heading>
        <Text fontWeight="bold" fontSize="lg" color={textColor}>
          ${product.price}
        </Text>
      </Box>
      <HStack spacing={2} m={4}>
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => onOpenChange(e)}>
          <Dialog.Trigger asChild>
            <IconButton colorPalette="blue">
              <CiEdit />
            </IconButton>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Update Product</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <Field.Root>
                        <Field.Label>Item</Field.Label>
                        <Input
                          placeholder="Item"
                          value={updatedProduct.item}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              item: e.target.value,
                            })
                          }
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Price</Field.Label>
                        <Input
                          placeholder="Price"
                          value={updatedProduct.price}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              price: e.target.value,
                            })
                          }
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Image</Field.Label>
                        <Input
                          placeholder="Image"
                          value={updatedProduct.image}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              image: e.target.value,
                            })
                          }
                        />
                      </Field.Root>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Save</Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        <IconButton
          colorPalette="red"
          onClick={() => handleDeleteProduct(product._id)}
        >
          <MdDeleteForever />
        </IconButton>
        <Toaster />
      </HStack>
    </Box>
  );
};

export default ProductCard;