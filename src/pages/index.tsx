import AppleComponent from '@/components/AppleComponent';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';
import { GameStart } from '@/components/GameStart';
import { FallButton } from '@/components/FallButtom';
import { GameModal } from '@/components/GameModal';

const METRIC = {
  BG_HEIGHT: 6000,
  APPLE_HEIGHT: 50,
  DISTANCE_INIT: 4000,
};

export default function Home() {
  const [gameState, setGameState] = useState<'ready' | 'start' | 'falling' | 'success' | 'failure'>('ready');
  const [distance, setDistance] = useState<number>(METRIC.DISTANCE_INIT);
  const distanceRef = useRef<number>(METRIC.DISTANCE_INIT);
  const [showModal, setShowModal] = useState(false);

  // 애니메이션 상태
  const [{ top }, api] = useSpring(() => ({
    top: 0,
    config: { duration: 2500 },
    onChange: (result: { value: { top: number } }) => {
      const currentTop = result.value?.top ?? 0;
      const newDistance = METRIC.DISTANCE_INIT + currentTop;
      setDistance(Math.floor(newDistance));
      distanceRef.current = Math.floor(newDistance);
    },
  }));

  // 낙하 시작
  const startFalling = () => {
    setGameState('falling');
    api.start({
      top: -4200,
      onRest: () => {
        const finalDistance = distanceRef.current;
        setGameState(finalDistance >= 0 && finalDistance <= 400 ? 'success' : 'failure');
        showGameModal();
      },
    });
  };

  // 게임 종료 후 모달창
  const showGameModal = () => {
    if (showModal) return;
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  };

  // 게임 재시작
  const restartGame = () => {
    setGameState('ready');
    setShowModal(false);
    api.set({ top: 0 });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  }, []);

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
        <Image src="/background.png" alt="Background" width={480} height={METRIC.BG_HEIGHT} draggable={false} />
      </animated.div>

      {/* 도착선 */}
      <animated.div
        className="absolute left-0 right-0 h-[30px] bg-[#EC083F]"
        style={{
          top: 4350,
          transform: top.to((t) => `translateY(${t}px)`),
        }}
      />

      {/* 거리계산 + 사과 */}
      <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 text-black text-center mb-0">
        <span className="text-xl font-bold">{distance}m</span>
        <AppleComponent top={300} />
      </div>

      {!showModal && (
        <FallButton
          top={400}
          onStart={startFalling}
          onStop={() => api.stop()}
          style={{
            opacity: gameState === 'start' ? 1 : 0,
          }}
        />
      )}

      {gameState === 'ready' && <GameStart setGameState={setGameState} />}
      {showModal && <GameModal gameState={gameState} distance={distance} restartGame={restartGame} />}
    </div>
  );
}
