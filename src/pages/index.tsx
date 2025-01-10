import Image from 'next/image';
const METRIC = {
  BG_HEIGHT: 5000,
  APPLE_HEIGHT: 50,
};

export default function Home() {
  return (
    <>
      <div className="relative w-full" style={{ height: METRIC.BG_HEIGHT }}>
        <Image src="/background.png" alt="Background" draggable={false} width={1920} height={METRIC.BG_HEIGHT} className="w-full h-auto" />
        <div
          className="absolute left-0 right-0 h-[30px] bg-[#EC083F]"
          style={{
            // FIXME: top 값을 적절히 조절하여 도착선과 사과의 시작점 사이의 거리가 4000px 차이나게 해주세요
            // 현재는 도착선을 임의로 최하단에 붙여놨습니다
            top: 5000,
          }}
        />
      </div>
    </>
  );
}
