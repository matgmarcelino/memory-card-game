import "../styles/Board.css";
import Card, { SkeletonCard } from './Card.jsx';

const SKELETONS = ["a", "b", "c", "d", "e"];

export default function Board({ handleClick, cards, wrongId, loading }) {

    if (loading) {
        return (
            <main className="board" aria-label="cards" aria-busy="true">
                {SKELETONS.map(key => <SkeletonCard key={key} />)}
            </main>
        )
    }

    if (!handleClick || !cards) return <p>Error</p>

    return (
        <main className="board" aria-label="cards">
            {cards.map(card => <Card key={card.id} onClick={handleClick} id={card.id} name={card.name} title={card.title} imageUrl={card.imageUrl} wrong={card.id === wrongId} />)}
        </main>
    )
}
