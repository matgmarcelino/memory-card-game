import { useEffect, useRef, useState } from "react";
import ChampionsManager from "./api/champions";
import Board from "./components/Board.jsx";
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Notice from "./components/Notice.jsx";
import Toast from "./components/Toast.jsx";

const TOTAL = 12;
const FLASH_MS = 900;
const TOAST_MS = 3500;
const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven"];

export default function App() {

    const [manager, setManager] = useState(null);
    const [loadError, setLoadError] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [wrongId, setWrongId] = useState(null);
    const [toast, setToast] = useState(null);

    // best score when the current round started, to detect a new best mid-round
    const roundStartBest = useRef(0);
    const flashTimer = useRef(null);
    const toastTimer = useRef(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: `attempt` changes to refetch after "Try again"
    useEffect(() => {
        let ignore = false;
        ChampionsManager.create()
            .then(m => {
                if (ignore) return;
                setManager(m);
                setCards(m.getRotation());
            })
            .catch(() => {
                if (!ignore) setLoadError(true);
            });
        return () => { ignore = true; };
    }, [attempt]);

    useEffect(() => () => {
        clearTimeout(flashTimer.current);
        clearTimeout(toastTimer.current);
    }, []);

    const showToast = (kind, title, text, persist = false) => {
        clearTimeout(toastTimer.current);
        setToast({ id: Date.now(), kind, title, text });
        if (!persist) toastTimer.current = setTimeout(() => setToast(null), TOAST_MS);
    };

    const retry = () => {
        setLoadError(false);
        setAttempt(a => a + 1);
    };

    const restart = () => {
        clearTimeout(flashTimer.current);
        roundStartBest.current = best;
        setWrongId(null);
        setScore(0);
        setCards(manager.reset());
    };

    const handleClick = id => {
        // ignore clicks while the wrong pick is flashing
        if (wrongId) return;

        const next = manager.play(id);

        if (manager.gameResult === 'lose') {
            setWrongId(id);
            const verdict = score > roundStartBest.current ? "That's a new best!" : `Your best is still ${best}.`;
            showToast('lose', `Already picked! Round over at ${score}.`, `Cards reshuffled. ${verdict}`);
            flashTimer.current = setTimeout(restart, FLASH_MS);
            return;
        }

        const newScore = score + 1;
        setScore(newScore);
        setBest(b => Math.max(b, newScore));

        if (manager.gameResult === 'win') {
            showToast('win', `Perfect round! ${TOTAL} / ${TOTAL}`, 'Every champion picked exactly once.', true);
        } else if (roundStartBest.current > 0 && newScore === roundStartBest.current + 1) {
            const left = TOTAL - newScore;
            showToast('best', `New best: ${newScore}`, `${NUMBER_WORDS[left]} champion${left === 1 ? '' : 's'} left this round.`);
        }

        setCards(next ?? []);
    };

    const playAgain = () => {
        clearTimeout(toastTimer.current);
        setToast(null);
        restart();
    };

    let content;
    if (loadError) {
        content = <Notice kind="error" title="Couldn't load the champions" text="Data Dragon didn't respond. Check your connection and try again." action="Try again" onAction={retry} />;
    } else if (!manager) {
        content = <Board loading />;
    } else if (score === TOTAL) {
        content = <Notice kind="win" title="You remembered them all" text={`All ${TOTAL} champions, no repeats. Ready for another round?`} action="Play again" onAction={playAgain} />;
    } else {
        content = <Board handleClick={handleClick} cards={cards} wrongId={wrongId} />;
    }

    return (
        <div className="app">
            <Header score={score} best={best} />
            {content}
            <Footer />
            <Toast toast={toast} />
        </div>
    );
}
