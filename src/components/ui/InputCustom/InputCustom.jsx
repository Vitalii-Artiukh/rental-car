import css from "./InputCustom.module.css";

export const InputCustomText = ({
  className,
  name,
  placeholder,
  labelText,
  localFilters,
  handleChange,
}) => {
  return (
    <label htmlFor={name} className={css.label}>
      <p className={css.labelText}>{labelText}</p>
      <input
        type="text"
        id={name}
        className={className}
        placeholder={placeholder}
        value={localFilters}
        onChange={(e) => handleChange(name, e.target.value)}
      />
    </label>
  );
};
