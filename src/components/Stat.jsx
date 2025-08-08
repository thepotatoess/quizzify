import './Stat.css'

export default function Stat({ kValue, text }) {
  return (
    <div className="stat">
      <div className="k">{kValue}</div>
      <div className="t">{text}</div>
    </div>
  );
}