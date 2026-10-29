import "../styles/Notice.css";

const icons = {
    error: (
        <>
            <path d="M12 3.5 22 20.5H2Z" />
            <path d="M12 10v4.5M12 17.5v.01" />
        </>
    ),
    win: <path d="M7 4h10v5a5 5 0 0 1-10 0ZM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9.5 18h5" />,
};

// Full-width panel that replaces the board: load errors and the end of a perfect round
export default function Notice({ kind, title, text, action, onAction }) {
    return (
        <section className={`notice ${kind}`} role={kind === "error" ? "alert" : undefined}>
            <svg className="notice-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                {icons[kind]}
            </svg>
            <h2>{title}</h2>
            <p>{text}</p>
            <button type="button" className="button" onClick={onAction}>{action}</button>
        </section>
    )
}
