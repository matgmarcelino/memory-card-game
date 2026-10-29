import "../styles/Card.css";

export default function Card({ onClick, id, name, title, imageUrl, wrong }) {
    return (
        <button type="button" className={wrong ? "card wrong" : "card"} id={id} onClick={() => onClick(id)}>
            <img src={imageUrl} alt="" />
            <span className="card-text">
                <span className="card-name">{name}</span>
                <span className="card-title">{title}</span>
            </span>
            {wrong && (
                <span className="card-badge">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M7 7 17 17M17 7 7 17" />
                    </svg>
                </span>
            )}
        </button>
    )
}

export function SkeletonCard() {
    return (
        <div className="card skeleton" aria-hidden="true">
            <span className="card-text">
                <span className="skeleton-bar" />
                <span className="skeleton-bar" />
            </span>
        </div>
    )
}
