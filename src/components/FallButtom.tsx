import Image from 'next/image';
import { animated } from '@react-spring/web';

interface FallButtonProps {
  top: number;
  onStart: () => void;
  onStop: () => void;
  style?: React.CSSProperties;
}

export const FallButton: React.FC<FallButtonProps> = ({ top, onStart, onStop, style }) => (
  <animated.button
    draggable={false}
    className="absolute right-12 no-tap-highlight"
    style={{ top, ...style }}
    onMouseDown={onStart}
    onMouseUp={onStop}
    onTouchStart={onStart} // 모바일 대응
    onTouchEnd={onStop}
    onDragStart={(e) => e.preventDefault()}
    onContextMenu={(e) => e.preventDefault()}
  >
    <Image src="/click-please.png" alt="꾹 눌러주세요~" width={110} height={100} />
  </animated.button>
);
