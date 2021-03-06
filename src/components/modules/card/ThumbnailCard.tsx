import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Emoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Dispatch, SetStateAction } from "react";
import { Card } from "@/components/atoms/Card";

interface Props {
  name: string;
  setFn: Dispatch<SetStateAction<string>>;
}

const ThumbnailCard: NextPage<Props> = ({ name, setFn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card title="Thumbnail">
      <Box width="100%" textAlign="center">
        <Emoji emoji={name} size={52} />
        <Box width="80%" mx="auto" mt="4">
          <Button width="100%" onClick={onOpen}>
            Select Thumbnail
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Thumbnail</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx="auto">
            <Picker
              title="Select Thumbnail"
              emojiTooltip={true}
              enableFrequentEmojiSort={true}
              showPreview={true}
              onClick={(emoji) => setFn(emoji.id!)}
              native
              i18n={{
                search: "検索",
                categories: {
                  search: "検索結果",
                  recent: "よく使う絵文字",
                  people: "顔 & 人",
                  nature: "動物 & 自然",
                  foods: "食べ物 & 飲み物",
                  activity: "アクティビティ",
                  places: "旅行 & 場所",
                  objects: "オブジェクト",
                  symbols: "記号",
                  flags: "旗",
                  custom: "カスタム",
                },
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button w="100%" colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ThumbnailCard;
