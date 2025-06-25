import mySprite from '../../../assets/mainSvg.svg';
import { FC } from 'react';

export interface IconProps {
  name: string;
  fill?: string;
  stroke?: string;
  width?: number;
  height?: number;
  className?: string;
}

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
      name={name}
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
