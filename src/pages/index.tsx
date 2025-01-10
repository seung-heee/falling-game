import Apple from '@/components/Apple';
import Image from 'next/image';
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

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
    config: { tension: 50 },
    onChange: (result) => {
      const currentTop = result.value.top; // 사과의 현재 위치
      setDistanceToGround(groundTop - (currentTop + METRIC.APPLE_HEIGHT));

      window.scrollTo(0, currentTop - appleStartTop);
    },
  }));

  // 사과 낙하 시작
  const startFalling = () => {
    setGameState('falling');
    api.start({ top: groundTop - METRIC.APPLE_HEIGHT });
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
      console.log('Setting showModal to true'); // 디버깅 로그
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

        {gameState === 'ready' && (
          <button
            className="absolute top-[550px] text-lg left-1/2 transform -translate-x-1/2 px-8 py-1 bg-[#5434f2] rounded-full border-[4px]"
            onClick={() => setGameState('start')}
          >
            게임 시작
          </button>
        )}

        <animated.button
          className="absolute right-16"
          style={{
            top: fallAnimation.top.to((value) => value + 100), // 사과 위치 + 100px에 버튼 위치
          }}
          onMouseDown={startFalling}
          onMouseUp={stopFalling}
          onTouchStart={startFalling}
          onTouchEnd={stopFalling}
        >
          <Image src="/click-please.png" alt="꾹 눌러주세요~" width={110} height={100} />
        </animated.button>
      </div>

      {showModal && (
        <div className="px-20 text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold">{gameState === 'success' ? '성공했습니다' : '실패했습니다'}</h2>
          <p className="mt-2">기록: {Math.max(0, Math.floor(distanceToGround))}m</p>
          <button className="mt-4 px-10 py-2 bg-[#5434f2] text-white rounded-full" onClick={restartGame}>
            재시도
          </button>
        </div>
      )}
    </>
  );
}
