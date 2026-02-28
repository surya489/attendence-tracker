export const SurfaceCard = ({ children, className = '' }) => {
  return <article className={['surfaceCard', className].filter(Boolean).join(' ')}>{children}</article>;
};
