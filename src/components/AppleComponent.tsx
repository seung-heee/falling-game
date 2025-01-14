import Image from 'next/image';

type AppleComponentProps = {
  top: number;
};

export default function AppleComponent({ top }: AppleComponentProps) {
  return (
    <div className="w-[50px] h-[50px] mx-auto" style={{ top }}>
      <Image src="/apple.png" alt="Apple" draggable={false} width={50} height={50} className="w-full h-full object-contain mx-auto" />
    </div>
  );
}
