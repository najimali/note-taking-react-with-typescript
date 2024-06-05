import { MultiValue } from "react-select";
import { Tag } from "../types/Tag";

export const convertTagsToSelectOptions = (tags: Tag[]) => {
  return tags.map((tag) => {
    return {
      label: tag.label,
      value: tag.id,
    };
  });
};

export const convertSelectOptionsToTags = (
  options: MultiValue<{
    label: string;
    value: string;
  }>
): Tag[] => {
  return options.map((option) => {
    return {
      label: option.label,
      id: option.value,
    };
  });
};
