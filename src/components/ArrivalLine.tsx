interface ArrivalLineProps {
  top: number;
}

export const ArrivalLine: React.FC<ArrivalLineProps> = ({ top }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      height: 30,
      backgroundColor: '#EC083F',
      top,
    }}
  />
);
