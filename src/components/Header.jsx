import "../styles/Header.css";
import Scoreboard from './Scoreboard.jsx';

export default function Header({ score, best }) {

    return (
        <header className='header'>
            <div className="brand">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2 22 12 12 22 2 12Z" />
                    <path d="M12 7.5 16.5 12 12 16.5 7.5 12Z" />
                </svg>
                <h1>Champion Recall</h1>
                <p>Click on each champion exactly once.</p>
            </div>
            <Scoreboard score={score} best={best} />
        </header>
    )
}