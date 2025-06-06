import mySprite from '../../../assets/mainSvg.svg';
// import { TbCarGarage } from 'react-icons/tb';
// import { GiHamburgerMenu } from 'react-icons/gi';
import { IconProps } from '../../../types.ts';
import { FC } from 'react';

const Icon: FC<IconProps> = ({
  name,
  fill,
  stroke,
  width = 16,
  height = 16,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      className={className}
    >
      <use href={`${mySprite}#${name}`}></use>
    </svg>
  );
};

export default Icon;

// export const IconsReact = () => {
//   return (
//     <div>
//       <TbCarGarage />
//       <GiHamburgerMenu />
//     </div>
//   );
// };
