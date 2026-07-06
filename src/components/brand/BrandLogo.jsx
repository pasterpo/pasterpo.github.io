import logo32 from '../../assets/brand/clover-logo-32.png';
import logo64 from '../../assets/brand/clover-logo-64.png';
import logo192 from '../../assets/brand/clover-logo-192.png';

const SIZES = {
  sm: { box: 32, src: logo32 },
  md: { box: 40, src: logo64 },
  lg: { box: 48, src: logo192 },
};

export default function BrandLogo({
  size = 'md',
  showText = true,
  variant = 'default',
  className = '',
}) {
  const { box, src } = SIZES[size] || SIZES.md;

  return (
    <div className={`brand-logo ${size} ${variant === 'on-dark' ? 'on-dark' : ''} ${className}`.trim()}>
      <img
        className="brand-logo-mark"
        src={src}
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
