import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface GeneralPurpose {
  id: string;
  name: string;
}

export const changeHandler = <T extends GeneralPurpose[]>(
  e: ChangeEvent<HTMLSelectElement>,
  lists: T,
  setFn: Dispatch<SetStateAction<GeneralPurpose[]>>
) => {
  try {
    const targetValue = e.target.value;
    const targetValueArray = targetValue.split(",");
    if (lists.length >= 5) {
      throw Error("登録できるのは最大5個までです。");
    }
    const isValue = lists.some((list) => list.id === targetValueArray[0]);
    if (targetValue === "" || isValue) {
      throw Error("既に登録済みです。");
    }
    setFn([...lists, { id: targetValueArray[0], name: targetValueArray[1] }]);
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    throw err;
  }
};
