import {
  Icon,
  List,
  ListItem,
  Box,
  Text,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  chakra,
} from "@chakra-ui/react";
import { TechIcon } from "@/components/atoms/TechIcon";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { QuerySearch } from "@/types/querySearch";
import { BsCheck2 } from "react-icons/bs";
import { useCallback } from "react";
import { SectionItemType } from "@/types/sectionItem.type";
import { recruitUseSelectStateSelector } from "@/recoil/selector/recruitUseSelectState.selector";
import { useRecoilState } from "recoil";

interface Props {
  lists: SectionItemType[];
  title: string;
  icon: IconType;
  color: string;
  query: string;
}

export const IndexSideSection: React.FC<Props> = ({
  lists,
  title,
  icon,
  color,
  query,
}) => {
  const router = useRouter();
  const [selector, setSelector] = useRecoilState(recruitUseSelectStateSelector);

  const clickHandler = useCallback(
    (name: string) => {
      if (!router.query.language) router.query.language = [];
      if (!router.query.framework) router.query.framework = [];
      if (!router.query.feature) router.query.feature = [];

      const newQuery: QuerySearch = {
        language:
          typeof router.query.language === "string"
            ? [router.query.language]
            : router.query.language,
        framework:
          typeof router.query.framework === "string"
            ? [router.query.framework]
            : router.query.framework,
        feature:
          typeof router.query.feature === "string"
            ? [router.query.feature]
            : router.query.feature,
      };
      switch (query) {
        case "language":
          if (newQuery.language.includes(name)) {
            newQuery.language = newQuery.language.filter(
              (queryName) => queryName !== name
            );
            const select = selector.filter((select) => select !== name);
            setSelector(select);
            break;
          }
          newQuery.language.push(name);
          setSelector([...selector, name]);
          break;
        case "framework":
          if (newQuery.framework.includes(name)) {
            newQuery.framework = newQuery.framework.filter(
              (queryName) => queryName !== name
            );
            const select = selector.filter((select) => select !== name);
            setSelector(select);
            break;
          }
          newQuery.framework.push(name);
          setSelector([...selector, name]);
          break;
        case "feature":
          if (newQuery.feature.includes(name)) {
            newQuery.feature = newQuery.feature.filter(
              (queryName) => queryName !== name
            );
            const select = selector.filter((select) => select !== name);
            setSelector(select);
            break;
          }
          newQuery.feature.push(name);
          setSelector([...selector, name]);
          break;
      }

      router.push({
        query: newQuery as unknown as ParsedUrlQueryInput,
      });
    },
    [query, router]
  );

  return (
    <Box mb="8">
      <AccordionItem>
        <AccordionButton display="flex" flexDirection="row">
          <Icon as={icon} color={color} boxSize="6" />
          <Text ml="4" fontSize="xl">
            {title}
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <List spacing={3} pl="5" fontSize="xl" mt="3">
            {lists.map((list, idx) => (
              <ListItem display="flex" key={idx}>
                <chakra.button
                  onClick={() => clickHandler(list.name)}
                  display="flex"
                >
                  <Box>
                    <TechIcon svg={list.icon} setColor={list.color} />
                  </Box>
                  <Box ml="3">{list.name}</Box>
                  {selector.includes(list.name) && (
                    <Box m="1">
                      <Icon as={BsCheck2} color="green.600" />
                    </Box>
                  )}
                </chakra.button>
              </ListItem>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Box>
  );
};
