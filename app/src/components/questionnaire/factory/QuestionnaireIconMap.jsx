import { Fragment } from 'react';

import {
  FlameIcon,
  IssueOpenedIcon,
  RocketIcon,
  SmileyIcon,
  ThumbsdownIcon,
  ThumbsupIcon
} from '@primer/octicons-react';

const iconSize = 20;

export const IconMap = {
  'IssueOpenedIcon': <IssueOpenedIcon size={iconSize} />,
  'ThumbsupIcon': <ThumbsupIcon size={iconSize} />,
  'ThumbsdownIcon': <ThumbsdownIcon size={iconSize} />,
  'SmileyIcon': <SmileyIcon size={iconSize} />,
  'RocketIcon': <RocketIcon size={iconSize} />,
  'FlameIcon': <FlameIcon size={iconSize} />,
};

/**
 * Returns an icon based on `iconName`.
 * 
 * @param {string?} iconName
 * @returns {JSX.Element}
 */
export const getIcon = (iconName) => {
  if (Object.keys(IconMap).includes(iconName)) {
    return IconMap[iconName];
  }

  return <Fragment />;
}
