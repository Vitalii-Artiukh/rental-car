const Icon = ({
  name,
  fill = "transparent",
  stroke,
  width = 16,
  height = 16,
}) => {
  return (
    <svg width={width} height={height} fill={fill} stroke={stroke}>
      <use href={`/public/symbol-defs.svg#${name}`}></use>
    </svg>
  );
};

export default Icon;
