import React from 'react';
import Image from 'next/image';

type UIInstructionsProps = {
  startFalling: () => void; // 게임 시작 함수 타입 정의
};

export default function UIInstructions({ startFalling }: UIInstructionsProps) {
  return (
    <button className="absolute top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-yellow-500 text-white rounded-lg" onClick={startFalling}>
      <Image src="/click-please.png" alt="Apple" width={80} height={40} />
    </button>
  );
}
