import AppleComponent from '@/components/AppleComponent';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';

const METRIC = {
  BG_HEIGHT: 6000,
  APPLE_HEIGHT: 50,
};

export default function Home() {
  const backgroundRef = useRef<HTMLImageElement>(null);

  // 애니메이션 상태
  const [{ top }, api] = useSpring(() => ({
    top: 0, // 초기 위치
    config: { duration: 5000 }, // 애니메이션 속도: 5000ms (5초)
  }));

  useEffect(() => {
    // 애니메이션 시작: 4230px 위로 이동
    api.start({ top: -4230 });
  }, [api]);

  return (
    <div className="relative w-full" style={{ height: METRIC.BG_HEIGHT }}>
      {/* 배경 */}
      <animated.div
        className="absolute w-full"
        style={{
          height: METRIC.BG_HEIGHT,
          transform: top.to((t) => `translateY(${t}px)`),
        }}
      >
        <Image ref={backgroundRef} src="/background.png" alt="Background" width={480} height={METRIC.BG_HEIGHT} draggable={false} />
      </animated.div>

      {/* 도착선 */}
      <animated.div
        className="absolute left-0 right-0 h-[30px] bg-[#EC083F]"
        style={{
          top: 4350, // 도착선의 초기 위치
          transform: top.to((t) => `translateY(${t}px)`),
        }}
      />

      {/* 사과 */}
      <AppleComponent top={300} />
    </div>
  );
}
