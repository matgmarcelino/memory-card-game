import "../styles/Toast.css";

const icons = {
    lose: <path d="M7 7 17 17M17 7 7 17" />,
    best: <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8Z" />,
    win: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

export default function Toast({ toast }) {
    return (
        <div className="toast-region" role="status" aria-live="polite">
            {toast && (
                <div key={toast.id} className={`toast ${toast.kind}`}>
                    <span className="toast-icon">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {icons[toast.kind]}
                        </svg>
                    </span>
                    <span className="toast-text">
                        <strong>{toast.title}</strong>
                        <span>{toast.text}</span>
                    </span>
                </div>
            )}
        </div>
    )
}
