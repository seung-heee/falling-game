import Image from 'next/image';
import { animated, Interpolation } from '@react-spring/web';

interface FallButtonProps {
  top: Interpolation<number, number>; // 정확한 타입 명시
  onStart: () => void;
  onStop: () => void;
  style?: React.CSSProperties; // style 속성 추가
}

export const FallButton: React.FC<FallButtonProps> = ({ top, onStart, onStop, style }) => (
  <animated.button
    draggable={false}
    className="absolute right-16"
    style={{ top, ...style }}
    onMouseDown={onStart}
    onMouseUp={onStop}
    onTouchStart={onStart} // 모바일 대응
    onTouchEnd={onStop}
  >
    <Image src="/click-please.png" alt="꾹 눌러주세요~" width={110} height={100} />
  </animated.button>
);
