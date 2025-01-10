import React from 'react';

interface GameModalProps {
  gameState: 'success' | 'failure' | 'ready' | 'start' | 'falling';
  distanceToGround: number; // 도착선과의 거리
  restartGame: () => void; // 게임 재시작 함수
}

export const GameModal: React.FC<GameModalProps> = ({ gameState, distanceToGround, restartGame }) => (
  <div className="px-20 text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg text-center">
    <h2 className="text-2xl font-bold">{gameState === 'success' ? '성공했습니다' : '실패했습니다'}</h2>
    <p className="mt-2">기록: {Math.max(0, Math.floor(distanceToGround))}m</p>
    <button className="mt-4 px-10 py-2 bg-[#5434f2] text-white rounded-full" onClick={restartGame}>
      재시도
    </button>
  </div>
);
