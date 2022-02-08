import { InputSelectType } from "@/types/addWanted.type";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const changeHandler = (
  e: ChangeEvent<HTMLSelectElement>,
  lists: InputSelectType[],
  setFn: Dispatch<SetStateAction<InputSelectType[]>>
) => {
  try {
    // uuid, value
    const targetValue = e.target.value;
    // [ [uuid, value] ... ]
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
