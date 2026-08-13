import Image from "next/image";

export default function DevicePhone({
  src,
  alt,
  width,
  height,
  frame,
  imgStyle,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  frame?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}) {
  return (
    <div className="shot-phone" style={frame}>
      <div className="notch"></div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        style={imgStyle}
      />
    </div>
  );
}