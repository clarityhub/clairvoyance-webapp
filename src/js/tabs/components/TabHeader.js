import React from 'react';
import MinutesSince from 'theme-claire/src/atoms/DateTime/MinutesSince';
import { tabHeaderContainer, tabHeaderText, tabHeaderIcon } from './TabHeader.scss';

export default ({
  icon,
  title,
  createdAt,
}) => (
  <div className={tabHeaderContainer}>
    <div>
      { icon
        ? <div className={tabHeaderIcon}>
          {icon}
        </div>
        : null
      }
      <div className={tabHeaderText}>
        <h2>{title}</h2>
        <p>
          {
            createdAt
              ? <MinutesSince>{createdAt}</MinutesSince>
              : null
          }
        </p>
      </div>
    </div>
  </div>
);
