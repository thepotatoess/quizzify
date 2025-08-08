export default function FeatureCard({ icon, title, desc }) {
  return (
    <article className="card feature">
      <div className="icon" aria-hidden>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
}