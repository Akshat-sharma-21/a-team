import { Fragment } from "react";

import {
  FlameIcon,
  IssueOpenedIcon,
  KeyIcon,
  RocketIcon,
  SmileyIcon,
  ThumbsdownIcon,
  ThumbsupIcon,
} from "@primer/octicons-react";

let iconSize = 20;

if (window.innerHeight < 750) iconSize = 18;

export const IconMap = {
  IssueOpenedIcon: <IssueOpenedIcon size={iconSize} />,
  ThumbsupIcon: <ThumbsupIcon size={iconSize} />,
  ThumbsdownIcon: <ThumbsdownIcon size={iconSize} />,
  SmileyIcon: <SmileyIcon size={iconSize} />,
  RocketIcon: <RocketIcon size={iconSize} />,
  FlameIcon: <FlameIcon size={iconSize} />,
  KeyIcon: <KeyIcon size={iconSize} />,
};

export const getIcon = (iconName) => {
  if (Object.keys(IconMap).includes(iconName)) {
    return IconMap[iconName];
  }

  return <Fragment />;
};
