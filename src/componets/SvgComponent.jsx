import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const SvgComponent = () => {
  return (
    <View>
      <Svg width={25} height={25} viewBox="0 0 32 32">
        <Circle cx={15} cy={17} r={12.5} fill="#FFFFFF" />
        <Path
          d="M6.576 6.576c-5.205 5.205-5.205 13.643 0 18.849s13.643 5.205 18.849-0c5.206-5.206 5.206-13.643 0-18.849s-13.643-5.205-18.849 0zM24.67 24.67c-4.781 4.781-12.56 4.781-17.341 0s-4.781-12.56 0-17.341c4.781-4.781 12.56-4.781 17.341 0s4.78 12.56-0 17.341z"
          fill="#FF6C00"
        />

        <Path
          d="M10.722 9.969l-0.754 0.754 5.278 5.278-5.253 5.253 0.754 0.754 5.253-5.253 5.253 5.253 0.754-0.754-5.253-5.253 5.278-5.278-0.754-0.754-5.278 5.278z"
          fill="#FF6C00"
        />
      </Svg>
    </View>
  );
};

export default SvgComponent;
