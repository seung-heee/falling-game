import React from 'react';

interface GameStartProps {
  setGameState: (state: 'ready' | 'start' | 'falling' | 'success' | 'failure') => void;
}

export const GameStart = ({ setGameState }: GameStartProps) => {
  const handleGameStart = () => {
    setGameState('start');
  };

  return (
    <button
      className="absolute top-[550px] left-1/2 transform -translate-x-1/2 px-8 py-1 text-lg bg-[#5434f2] rounded-full border-[4px]"
      onClick={handleGameStart}
    >
      게임 시작
    </button>
  );
};
