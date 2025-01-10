import Apple from '@/components/Apple';
import Image from 'next/image';
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const METRIC = {
  BG_HEIGHT: 5000,
  APPLE_HEIGHT: 50,
};

export default function Home() {
  const groundTop = METRIC.BG_HEIGHT - 700; // 도착선 위치
  const appleStartTop = groundTop - 4000; // 사과 초기 위치

  const [gameState, setGameState] = useState<'ready' | 'start' | 'falling' | 'success' | 'failure'>('ready');
  const [distanceToGround, setDistanceToGround] = useState(groundTop - appleStartTop); // 사과와 도착선 간 거리 상태

  const [fallAnimation, api] = useSpring(() => ({
    top: appleStartTop, // 초기 위치
    config: { tension: 5 },
    onChange: (result) => {
      const currentTop = result.value.top;
      setDistanceToGround(groundTop - currentTop);
    },
  }));

  // 사과 낙하 시작
  const startFalling = () => {
    setGameState('falling');
    api.start({ top: groundTop - METRIC.APPLE_HEIGHT });
  };

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: METRIC.BG_HEIGHT }}>
        <Image src="/background.png" alt="Background" width={1920} height={METRIC.BG_HEIGHT} draggable={false} />

        <animated.div style={fallAnimation}>
          <Apple top={fallAnimation.top.get()} />
        </animated.div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: '#EC083F',
            top: groundTop,
          }}
        />

        {/* 사과와 도착선 간 거리 표시 */}
        <div className="absolute top-20 left-10 text-black font-bold text-2xl">{Math.max(0, Math.floor(distanceToGround))}px</div>

        {gameState === 'ready' && (
          <button
            className="absolute top-[550px] text-lg left-1/2 transform -translate-x-1/2 px-8 py-1 bg-[#5434f2] rounded-full border-[4px]"
            onClick={() => setGameState('start')}
          >
            게임 시작
          </button>
        )}

        {gameState === 'start' && (
          <button className="absolute top-[550px] right-16" onMouseDown={startFalling}>
            <Image src="/click-please.png" alt="꾹 눌러주세요~" width={110} height={100} />
          </button>
        )}
      </div>
    </>
  );
}
