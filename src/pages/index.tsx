import AppleComponent from '@/components/AppleComponent';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';

const METRIC = {
  BG_HEIGHT: 6000,
  APPLE_HEIGHT: 50,
  DISTANCE_INIT: 4000, // 초기 사과와 도착선 간 거리
};

export default function Home() {
  const backgroundRef = useRef<HTMLImageElement>(null);
  const [distance, setDistance] = useState<number>(METRIC.DISTANCE_INIT); // 거리 상태

  // 애니메이션 상태
  const [{ top }, api] = useSpring(() => ({
    top: 0, // 초기 위치
    config: { duration: 5000 }, // 애니메이션 속도: 5000ms (5초)
    onChange: (result: { value: { top: number } }) => {
      const currentTop = result.value?.top ?? 0; // 안전하게 값 추출
      const newDistance = METRIC.DISTANCE_INIT + currentTop; // 거리 계산
      setDistance(Math.floor(newDistance));

      console.log('currentTop:', currentTop, 'newDistance:', newDistance);
    },
  }));

  useEffect(() => {
    // 애니메이션 시작: 4200px 위로 이동
    api.start({ top: -4200 });
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

      {/* 거리계산 + 사과 */}
      <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 text-black text-center mb-0">
        <span className="text-lg font-bold">{distance}m</span>
        <AppleComponent top={300} />
      </div>
    </div>
  );
}
