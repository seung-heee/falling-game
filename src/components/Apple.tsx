import Image from 'next/image';

type AppleProps = {
  top: number;
  distanceToGround: number;
};

export default function Apple({ top, distanceToGround }: AppleProps) {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top }}>
      <span className="text-black font-bold text-2xl">{Math.floor(distanceToGround)}m</span>
      <Image src="/apple.png" alt="Apple" draggable={false} width={50} height={50} className="mx-auto" />
    </div>
  );
}
