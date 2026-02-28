export const AppButton = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  fullWidth = false,
  icon,
  iconRight = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={[
        'appBtn',
        `is-${variant}`,
        `is-${size}`,
        fullWidth ? 'is-full' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {icon && !iconRight ? <span className="appBtnIcon">{icon}</span> : null}
      <span>{children}</span>
      {icon && iconRight ? <span className="appBtnIcon">{icon}</span> : null}
    </button>
  );
};
