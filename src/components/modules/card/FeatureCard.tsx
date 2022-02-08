import {
  Flex,
  List,
  ListItem,
  ListIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Select,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { MdCheckCircle } from "react-icons/md";
import { changeHandler } from "@/lib/newSelect";
import { Feature } from "@/types/feature.type";
import { Card } from "@/components/atoms/Card";
import { InputSelectType } from "@/types/addWanted.type";

interface Props {
  useFeatureList: InputSelectType[];
  setFn: Dispatch<SetStateAction<InputSelectType[]>>;
  features: Feature[];
}

const FeatureCard: NextPage<Props> = ({ useFeatureList, setFn, features }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card title="Feature">
      <Flex direction="column" width="100%">
        <Flex
          width="80%"
          mx="auto"
          boxShadow="md"
          rounded="xl"
          border="1px"
          borderColor="gray.50"
          justify="center"
          justifyItems="center"
          p="3"
        >
          <List spacing={3}>
            {useFeatureList.map((feature, idx) => (
              <ListItem key={idx}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {feature.name}
              </ListItem>
            ))}
          </List>
        </Flex>
        <Flex width="80%" mx="auto" mt="4">
          <Button width="100%" onClick={onOpen}>
            Select Feature
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Feature</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <List spacing={3}>
                {useFeatureList.map((feature, idx) => (
                  <ListItem key={idx}>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {feature.name}
                  </ListItem>
                ))}
              </List>
            </Box>
            <Select
              placeholder="Select Feature"
              size="md"
              onChange={(e) =>
                changeHandler(e, useFeatureList, setFn)
              }
            >
              {features.map((feature, idx) => (
                <option value={`${feature.id},${feature.name}`} key={idx}>
                  {feature.name}
                </option>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default FeatureCard;
