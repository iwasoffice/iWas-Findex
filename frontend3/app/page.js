import StatCard from "../components/StatCard";

const sampleStats = [
  { label: "Market Breadth", value: "64.2", delta: 2.3 },
  { label: "AI Confidence", value: "0.81", delta: 1.2 },
  { label: "Volatility Index", value: "22.7", delta: -0.9 },
  { label: "Regional Score", value: "76.5", delta: 3.4 }
];

const sampleSignals = [
  { symbol: "NGX:ZENITHBANK", signal: "BUY", confidence: 0.83 },
  { symbol: "JSE:NPN", signal: "HOLD", confidence: 0.62 },
  { symbol: "EGX:COMI", signal: "SELL", confidence: 0.71 }
];

export default function HomePage() {
  return (
    <main className="container">
      <header className="hero">
        <h1>iWas Findex Dashboard</h1>
        <p>
          Real-time index intelligence for emerging markets, packaged in a
          Vercel-ready frontend.
        </p>
      </header>

      <section className="grid">
        {sampleStats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="panel">
        <div>
          <h2>Live AI Signals</h2>
          <p>
            Replace sample data with your backend API endpoint via
            NEXT_PUBLIC_API_BASE_URL.
          </p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Signal</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {sampleSignals.map((row) => (
              <tr key={row.symbol}>
                <td>{row.symbol}</td>
                <td>{row.signal}</td>
                <td>{Math.round(row.confidence * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
