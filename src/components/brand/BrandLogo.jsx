import logo32 from '../../assets/brand/clover-logo-32.png';

const SIZES = {
  sm: 32,
  md: 40,
  lg: 48,
};

export default function BrandLogo({
  size = 'md',
  showText = true,
  variant = 'default',
  className = '',
}) {
  const box = SIZES[size] || SIZES.md;

  return (
    <div className={`brand-logo ${size} ${variant === 'on-dark' ? 'on-dark' : ''} ${className}`.trim()}>
      <img
        className="brand-logo-mark"
        src={logo32}
        alt="Clover Leaf"
        width={box}
        height={box}
        draggable={false}
      />
      {showText && (
        <span className="brand-logo-text">
          <span className="brand-logo-word">Clover</span>
          <span className="brand-logo-word accent">Leaf</span>
        </span>
      )}
    </div>
  );
}
