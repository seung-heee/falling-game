import Image from 'next/image';
import { animated } from '@react-spring/web';

interface FallButtonProps {
  top: number;
  onStart: () => void;
  onStop: () => void;
  style?: React.CSSProperties;
}

export const FallButton = ({ top, onStart, onStop, style }: FallButtonProps) => {
  // 핸들러: 기본 동작 방지
  const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

  return (
    <animated.button
      draggable={false}
      className="absolute right-12 no-tap-highlight"
      style={{ top, ...style }}
      onMouseDown={onStart}
      onMouseUp={onStop}
      onTouchStart={onStart} // 모바일 대응
      onTouchEnd={onStop}
      onDragStart={preventDefault}
      onContextMenu={preventDefault}
    >
      <Image src="/click-please.png" alt="꾹 눌러주세요~" width={110} height={100} />
    </animated.button>
  );
};
