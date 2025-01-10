import Apple from '@/components/Apple';
import Image from 'next/image';
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { GameStart } from '@/components/GameStart';
import { GameModal } from '@/components/GameModal';
import { ArrivalLine } from '@/components/ArrivalLine';
import { FallButton } from '@/components/FallButtom';

const METRIC = {
  BG_HEIGHT: 5000,
  APPLE_HEIGHT: 50,
  GROUND_HEIGHT: 30, // 도착선 높이
};

export default function Home() {
  const groundTop = METRIC.BG_HEIGHT - 700; // 도착선 위치
  const appleStartTop = groundTop - 4000; // 사과 초기 위치

  const [gameState, setGameState] = useState<'ready' | 'start' | 'falling' | 'success' | 'failure'>('ready');
  const [distanceToGround, setDistanceToGround] = useState(groundTop - appleStartTop); // 사과와 도착선 간 거리 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  const [fallAnimation, api] = useSpring(() => ({
    top: appleStartTop, // 초기 위치
    config: { duration: 1800 },
    onChange: (result) => {
      const currentTop = result.value.top; // 사과의 현재
      const newDistance = groundTop - currentTop; // 도착선과 사과의 거리
      setDistanceToGround(newDistance); // 음수 값도 상태로 반영

      window.scrollTo(0, currentTop - appleStartTop);
    },
  }));

  // 사과 낙하 시작
  const startFalling = () => {
    setGameState('falling');
    api.start({ top: groundTop - METRIC.APPLE_HEIGHT + 200 });
  };

  // 사과 낙하 멈춤
  const stopFalling = () => {
    api.stop();
    const currentTop = fallAnimation.top.get(); // 현재 사과 위치
    const appleBottom = currentTop + METRIC.APPLE_HEIGHT; // 사과의 아랫면 위치
    const distance = groundTop - appleBottom; // 도착선과 사과의 거리

    // 게임 상태 판단
    if (distance <= 400 && distance >= -200) {
      setGameState('success'); // 성공
      console.log(distance, 'success');
    } else {
      setGameState('failure'); // 실패
      console.log(distance, 'failure');
    }

    // 0.5초 뒤에 모달 표시
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  };

  // 게임 재시작
  const restartGame = () => {
    setGameState('ready');
    setShowModal(false); // 모달 숨기기
    api.set({ top: appleStartTop }); // 사과 위치 초기화
    setDistanceToGround(groundTop - appleStartTop); // 거리 초기화
  };

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: METRIC.BG_HEIGHT }}>
        <Image src="/background.png" alt="Background" width={1920} height={METRIC.BG_HEIGHT} draggable={false} />

        <animated.div style={fallAnimation}>
          <Apple top={fallAnimation.top.get()} distanceToGround={distanceToGround} />
        </animated.div>

        <ArrivalLine top={groundTop} />

        {gameState === 'ready' && <GameStart setGameState={setGameState} />}

        <FallButton
          top={fallAnimation.top.to((value) => value + 100)}
          onStart={startFalling}
          onStop={stopFalling}
          style={{
            opacity: gameState === 'start' ? 1 : 0, // 시작 전일 때만 보이도록
          }}
        />
      </div>

      {showModal && <GameModal gameState={gameState} distanceToGround={distanceToGround} restartGame={restartGame} />}
    </>
  );
}
