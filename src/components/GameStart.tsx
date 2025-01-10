import React from 'react';

interface GameStartProps {
  setGameState: (state: 'ready' | 'start' | 'falling' | 'success' | 'failure') => void;
}

export const GameStart: React.FC<GameStartProps> = ({ setGameState }) => (
  <button
    className="absolute top-[550px] text-lg left-1/2 transform -translate-x-1/2 px-8 py-1 bg-[#5434f2] rounded-full border-[4px]"
    onClick={() => setGameState('start')}
  >
    게임 시작
  </button>
);
