import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const SvgSprite = ({ name }) => {
  switch (name) {
    case 'grid':
      return (
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 3H10V10H3V3Z"
            stroke="#212121"
            strokOpacity="0.8"
            strokLinecap="round"
            strokLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 3H21V10H14V3Z"
            stroke="#212121"
            strokOpacity="0.8"
            strokLinecap="round"
            strokLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 14H21V21H14V14Z"
            stroke="#212121"
            strokOpacity="0.8"
            strokLinecap="round"
            strokLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 14H10V21H3V14Z"
            stroke="#212121"
            strokOpacity="0.8"
            strokLinecap="round"
            strokLinejoin="round"
          />
        </Svg>
      );
    case 'new':
      return (
        <Svg
          width="70"
          height="40"
          viewBox="0 0 70 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <G ClipPath="url(#clip0_12_109)">
            <Rect width="70" height="40" rx="20" fill="#FF6C00" />
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M35.5 13.5H34.5V19.5H28.5V20.5H34.5V26.5H35.5V20.5H41.5V19.5H35.5V13.5Z"
              fill="white"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_12_109">
              <Rect width="70" height="40" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      );
    case 'user':
      return (
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
            stroke="#212121"
            strokeOpacity="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke="#212121"
            strokeOpacity="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'reviews':
      return (
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 11.5C2.99656 12.8199 3.30493 14.1219 3.9 15.3C5.33904 18.1793 8.28109 19.9988 11.5 20C12.8199 20.0034 14.1219 19.6951 15.3 19.1L21 21L19.1 15.3C19.6951 14.1219 20.0034 12.8199 20 11.5C19.9988 8.28109 18.1793 5.33904 15.3 3.9C14.1219 3.30493 12.8199 2.99656 11.5 3H11C6.68419 3.2381 3.2381 6.68419 3 11V11.5V11.5Z"
            stroke="#BDBDBD"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'location':
      return (
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <G id="feather-icon / map-pin">
            <Path
              id="Shape"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 10.3636C20 16.0909 12 21 12 21C12 21 4 16.0909 4 10.3636C4 6.29681 7.58172 3 12 3C16.4183 3 20 6.29681 20 10.3636V10.3636Z"
              stroke="#BDBDBD"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              id="Oval"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
              stroke="#BDBDBD"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
        </Svg>
      );
    default:
      return null;
  }
};

export default SvgSprite;
