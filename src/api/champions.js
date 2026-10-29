function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  
  return array;
}

async function fetchData() {
    const res = await fetch('https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion.json');
    if (!res.ok) throw new Error(`Data Dragon responded with ${res.status}`);
    const data = await res.json();
    return Object.values(data.data);
}

async function getChampions() {
    const champions = await fetchData();
    
    shuffle(champions);

    return champions.slice(0, 12).map(champ => ({
        id: champ.id,
        name: champ.name,
        title: champ.title,
        imageUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`,
    }));
}

export default class ChampionsManager {
    #champions;
    #chosen = [];
    #gameResult = 'in game';

    constructor(champions) {
        this.#champions = champions;
    }

    static async create() {
        const champions = await getChampions();
        return new ChampionsManager(champions);
    }

    get gameResult() {
        return this.#gameResult;
    }

    getRotation() {
        if (this.#gameResult !== 'in game') return;

        const notChosen = this.#champions.find(c => !this.#chosen.includes(c))
        if (!notChosen) {
            return [];
        }

        shuffle(this.#champions);

        const res = [];
        res.push(notChosen);
        for (let i = 0; i < 4; i++) {
            const c = this.#champions.find(ch => !res.includes(ch));
            res.push(c);
        }

        return shuffle(res);
    }

    play(cardId) {
        if (this.#gameResult !== 'in game') return;

        const chosenCard = this.#champions.find(c => c.id === cardId);

        // if a repeat card was chosen
        if (this.#chosen.includes(chosenCard)) {
            this.#gameResult = 'lose';
            return [];
        }

        this.#chosen.push(chosenCard);

        // if got all 12 correct
        if (this.#chosen.length === this.#champions.length) {
            this.#gameResult = 'win';
            return [];
        }

        return this.getRotation();
    }

    // start a new round with the same 12 champions
    reset() {
        this.#chosen = [];
        this.#gameResult = 'in game';
        return this.getRotation();
    }
}
