export default function StatCard({ label, value, delta }) {
  const positive = delta >= 0;

  return (
    <article className="card">
      <p className="card-label">{label}</p>
      <h3>{value}</h3>
      <p className={positive ? "delta positive" : "delta negative"}>
        {positive ? "▲" : "▼"} {Math.abs(delta)}%
      </p>
    </article>
  );
}
