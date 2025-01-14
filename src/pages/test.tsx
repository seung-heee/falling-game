import Apple from '@/components/Apple';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { GameStart } from '@/components/GameStart';
import { GameModal } from '@/components/GameModal';
import { ArrivalLine } from '@/components/ArrivalLine';
import { FallButton } from '@/components/FallButtom';

const METRIC = {
  BG_HEIGHT: 5000, // 배경 높이
  APPLE_HEIGHT: 50, // 사과 높이
  GROUND_HEIGHT: 30, // 도착선 높이
  INITIAL_DISTANCE: 4000,
};

export default function Home() {
  const groundTop = METRIC.BG_HEIGHT - 800; // 도착선 아랫면 위치
  const arrivalLineTop = groundTop - METRIC.GROUND_HEIGHT; // 도착선 윗면 위치
  const appleStartTop = arrivalLineTop - METRIC.INITIAL_DISTANCE - METRIC.APPLE_HEIGHT; // 사과 초기 위치
  let modalTimeout: NodeJS.Timeout;

  const [gameState, setGameState] = useState<'ready' | 'start' | 'falling' | 'success' | 'failure'>('ready');
  const [distanceToGround, setDistanceToGround] = useState(4000); // 초기 거리: 4000m
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  const calculateDistance = (backgroundTop: number): number => {
    const appleBottom = appleStartTop + METRIC.APPLE_HEIGHT + Math.abs(backgroundTop); // 사과의 아랫면 위치
    return arrivalLineTop - appleBottom; // 도착선 윗면과 사과 아랫면의 거리
  };

  const showGameModal = () => {
    if (showModal) return;
    if (modalTimeout) {
      clearTimeout(modalTimeout); // 이전 타이머 취소
    }
    modalTimeout = setTimeout(() => {
      setShowModal(true);
    }, 500);
  };

  const [fallAnimation, api] = useSpring(() => ({
    backgroundTop: 0, // 배경의 초기 위치
    config: { duration: 2500 },
    onChange: (result) => {
      const distance = calculateDistance(result.value.backgroundTop);
      setDistanceToGround(distance); // 거리 업데이트
    },
  }));

  const startFalling = () => {
    setGameState('falling');
    api.start({
      backgroundTop: -4000, // 배경이 이동하는 위치
      onRest: () => {
        stopFalling();
      },
    });
  };

  const stopFalling = () => {
    api.stop();
    const distance = calculateDistance(fallAnimation.backgroundTop.get());

    const isSuccess = distance <= 400 && distance >= 0;
    const isFailure = distance < -200 || distance > 400;

    const newState = isSuccess ? 'success' : isFailure ? 'failure' : gameState;

    if (gameState === 'success' || gameState === 'failure') return; // 중복 방지

    setGameState(newState);
    showGameModal();
  };

  const restartGame = () => {
    setGameState('ready');
    setShowModal(false); // 모달 숨기기
    api.set({ backgroundTop: 0 }); // 배경 위치 초기화
    setDistanceToGround(4000); // 거리 초기화
  };

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <animated.div
          style={{
            position: 'absolute',
            top: fallAnimation.backgroundTop,
            width: '100%',
            height: METRIC.BG_HEIGHT,
          }}
        >
          <Image src="/background.png" alt="Background" width={480} height={METRIC.BG_HEIGHT} draggable={false} />
          <ArrivalLine top={groundTop} />
        </animated.div>

        {/* 사과를 고정 */}
        <div
          style={{
            position: 'absolute',
            top: appleStartTop,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <Apple top={appleStartTop} distanceToGround={distanceToGround} />
        </div>

        {!showModal && (
          <FallButton
            top={appleStartTop + 200}
            onStart={startFalling}
            onStop={stopFalling}
            style={{
              opacity: gameState === 'start' ? 1 : 0,
            }}
          />
        )}
      </div>

      {gameState === 'ready' && <GameStart setGameState={setGameState} />}
      {showModal && <GameModal gameState={gameState} distanceToGround={distanceToGround} restartGame={restartGame} />}
    </>
  );
}
