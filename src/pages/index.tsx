import Apple from '@/components/Apple';
import Image from 'next/image';
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { GameStart } from '@/components/GameStart';
import { GameModal } from '@/components/GameModal';
import { ArrivalLine } from '@/components/ArrivalLine';
import { FallButton } from '@/components/FallButtom';

const METRIC = {
  BG_HEIGHT: 5000, // 배경 높이
  APPLE_HEIGHT: 50, // 사과 높이
  GROUND_HEIGHT: 30, // 도착선 높이
};

export default function Home() {
  const groundTop = METRIC.BG_HEIGHT - 700; // 도착선 아랫면 위치
  const arrivalLineTop = groundTop - METRIC.GROUND_HEIGHT; // 도착선 윗면 위치
  const appleStartTop = arrivalLineTop - 4000 - METRIC.APPLE_HEIGHT; // 사과 초기 위치 = 도착선 윗면 - 4000 - 사과 높이

  const [gameState, setGameState] = useState<'ready' | 'start' | 'falling' | 'success' | 'failure'>('ready');
  const [distanceToGround, setDistanceToGround] = useState(4000); // 초기 거리: 4000m
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  const calculateDistance = (currentTop: number) => {
    const appleBottom = currentTop + METRIC.APPLE_HEIGHT;
    return arrivalLineTop - appleBottom;
  };

  const showGameModal = () => {
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  };

  const [fallAnimation, api] = useSpring(() => ({
    top: appleStartTop, // 사과 초기 위치
    config: { duration: 1800 },
    onChange: (result) => {
      const newDistance = calculateDistance(result.value.top);
      setDistanceToGround(newDistance);
      window.scrollTo(0, result.value.top - appleStartTop);
    },
  }));

  const startFalling = () => {
    setGameState('falling');
    api.start({
      top: arrivalLineTop - METRIC.APPLE_HEIGHT + 200, // 낙하 종료 위치
      onRest: () => {
        stopFalling();
      },
    });
  };

  const stopFalling = () => {
    api.stop();
    const distance = calculateDistance(fallAnimation.top.get());
    setGameState(distance <= 400 && distance >= 0 ? 'success' : 'failure');
    showGameModal();
  };

  const restartGame = () => {
    setGameState('ready');
    setShowModal(false); // 모달 숨기기
    api.set({ top: appleStartTop }); // 사과 위치 초기화
    setDistanceToGround(4000); // 거리 초기화
  };

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: METRIC.BG_HEIGHT }}>
        <Image src="/background.png" alt="Background" width={480} height={METRIC.BG_HEIGHT} draggable={false} />
        <ArrivalLine top={groundTop} />

        <animated.div style={fallAnimation}>
          <Apple top={fallAnimation.top.get()} distanceToGround={distanceToGround} />
        </animated.div>

        <FallButton
          top={fallAnimation.top.to((value) => value + 200)}
          onStart={startFalling}
          onStop={stopFalling}
          style={{
            opacity: gameState === 'start' ? 1 : 0,
            display: gameState === 'success' || gameState === 'failure' ? 'none' : 'block',
          }}
        />
      </div>

      {gameState === 'ready' && <GameStart setGameState={setGameState} />}
      {showModal && <GameModal gameState={gameState} distanceToGround={distanceToGround} restartGame={restartGame} />}
    </>
  );
}
