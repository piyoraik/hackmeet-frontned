import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { SectionItem } from "@/types/sectionItem.type";
import { Box } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import AddSelectCard from "./card/AddSelectCard";
import { PeoplesCard } from "./card/PeoplesCard";
import ThumbnailCard from "./card/ThumbnailCard";

interface Props {
  thumbnailName: string;
  setThumbnailName: Dispatch<SetStateAction<string>>;
  peoples: string;
  setPeoples: Dispatch<SetStateAction<string>>;
  useLanguageList: SectionItem[];
  setUseLanguageList: Dispatch<SetStateAction<SectionItem[]>>;
  useFrameworkList: SectionItem[];
  setUseFrameworkList: Dispatch<SetStateAction<SectionItem[]>>;
  useFeatureList: SectionItem[];
  setUseFeatureList: Dispatch<SetStateAction<SectionItem[]>>;
  languages: Language[];
  frameworks: Framework[];
  features: Feature[];
}

export const RecruitAddMenu: React.VFC<Props> = ({
  thumbnailName,
  setThumbnailName,
  peoples,
  setPeoples,
  useLanguageList,
  setUseLanguageList,
  useFrameworkList,
  setUseFrameworkList,
  useFeatureList,
  setUseFeatureList,
  languages,
  frameworks,
  features,
}) => {
  return (
    <>
      <ThumbnailCard name={thumbnailName} setFn={setThumbnailName} />
      <PeoplesCard peoples={peoples} setFn={setPeoples} />
      <AddSelectCard
        useLists={useLanguageList}
        setFn={setUseLanguageList}
        lists={languages}
      />
      <AddSelectCard
        useLists={useFrameworkList}
        setFn={setUseFrameworkList}
        lists={frameworks}
      />
      <AddSelectCard
        useLists={useFeatureList}
        setFn={setUseFeatureList}
        lists={features}
      />
    </>
  );
};
