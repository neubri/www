export default function Button(props) {
  const {
    variant = "primary",
    type = "button",
    text,
    onClick,
    className = "",
    size,
    children,
    ...rest
  } = props;

  let buttonClassName = `btn btn-${variant}`;

  // Add size if provided
  if (size) {
    buttonClassName += ` btn-${size}`;
  }

  // Add additional className if provided
  if (className) {
    buttonClassName += ` ${className}`;
  }

  return (
    <button
      className={buttonClassName}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children || text}
    </button>
  );
}
