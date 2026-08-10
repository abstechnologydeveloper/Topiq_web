import { CheckIcon } from "@/components/icons";

export default function RealBadge({
  style,
}: {
  style?: React.CSSProperties;
}) {
  return (
    <span className="real-badge" style={style}>
      <CheckIcon size={11} />
      Actual app screen
    </span>
  );
}