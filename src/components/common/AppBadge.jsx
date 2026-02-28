export const AppBadge = ({ children, variant = 'neutral', className = '' }) => {
  return <span className={['appBadge', `is-${variant}`, className].filter(Boolean).join(' ')}>{children}</span>;
};
