import { Feature } from "@/types/feature.type";
import { Framework } from "@/types/framework.type";
import { Language } from "@/types/language.type";
import { SectionItemType } from "@/types/sectionItem.type";
import { Dispatch, SetStateAction } from "react";
import AddSelectCard from "./card/AddSelectCard";
import { PeoplesCard } from "./card/PeoplesCard";
import ThumbnailCard from "./card/ThumbnailCard";

interface Props {
  thumbnailName: string;
  setThumbnailName: Dispatch<SetStateAction<string>>;
  peoples: string;
  setPeoples: Dispatch<SetStateAction<string>>;
  useLanguageList: SectionItemType[];
  setUseLanguageList: Dispatch<SetStateAction<SectionItemType[]>>;
  useFrameworkList: SectionItemType[];
  setUseFrameworkList: Dispatch<SetStateAction<SectionItemType[]>>;
  useFeatureList: SectionItemType[];
  setUseFeatureList: Dispatch<SetStateAction<SectionItemType[]>>;
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
        title="Language"
        placeholder="Select Language"
      />
      <AddSelectCard
        useLists={useFrameworkList}
        setFn={setUseFrameworkList}
        lists={frameworks}
        title="Framework"
        placeholder="Select Framework"
      />
      <AddSelectCard
        useLists={useFeatureList}
        setFn={setUseFeatureList}
        lists={features}
        title="Feature"
        placeholder="Select Feature"
      />
    </>
  );
};
