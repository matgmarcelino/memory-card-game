import "../styles/Scoreboard.css";

export default function Scoreboard({ best, score }) {

    const spans = [];
    for (let i = 0; i < 12; i++) {
        spans.push(<span key={i} className={i < score ? 'on' : ''}></span>)
    }

    return (
        <section className="scoreboard" aria-label="Scoreboard">
            <div className="stats">
                <div className="stat">
                    <span className="stat-label">Score</span>
                    <span className="stat-value">{score} <span>/ 12</span></span>
                </div>
                <div className="stat">
                    <span className="stat-label">Best</span>
                    <span className="stat-value">{best}</span>
                </div>
            </div>
            <div className="pips" aria-hidden="true">
                {spans.map(s => s)}
            </div>
        </section>
    )
}