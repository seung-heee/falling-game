import Image from 'next/image';

type AppleProps = {
  top: number;
};

export default function Apple({ top }: AppleProps) {
  return (
    <Image src="/apple.png" alt="Apple" draggable={false} width={50} height={50} className="absolute left-1/2 transform -translate-x-1/2" style={{ top }} />
  );
}
