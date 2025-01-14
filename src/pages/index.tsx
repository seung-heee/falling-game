import AppleComponent from '@/components/AppleComponent';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const METRIC = {
  BG_HEIGHT: 6000,
  APPLE_HEIGHT: 50,
};

export default function Home() {
  const backgroundRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    console.log(backgroundRef.current?.naturalHeight);
    console.log(backgroundRef.current?.clientHeight);
  }, []);

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: METRIC.BG_HEIGHT }}>
        {/* 배경 */}
        <Image src="/background.png" alt="Background" width={480} height={METRIC.BG_HEIGHT} draggable={false} />
        {/* <img ref={backgroundRef} src={'/background.png'} width={'100%'} height={METRIC.BG_HEIGHT} draggable={false} /> */}

        {/* 도착선 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: '#EC083F',
            top: 4350,
          }}
        />

        {/* 사과 */}
        <AppleComponent top={300} />
      </div>
    </>
  );
}
