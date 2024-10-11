const fs = require("fs")

class Automaton {
    constructor() {
        this.initialState = 0;
        this.transitions = new Map();
        this.finalStates = new Set();
    }

    addTransition(state, symbol, nextState) {
        const key = `${state}-${symbol}`;
        this.transitions.set(key, nextState);
    }

    addFinalState(state) {
        this.finalStates.add(state);
    }

    delta(state, symbol) {
        const key = `${state}-${symbol}`;
        if (this.transitions.has(key)) {
            return this.transitions.get(key);
        }
        return -1;
    }

    extendedTransition(state, input) {
        if (input.length === 0) {
            return state;
        }

        const symbol = input[0];
        const remainingInput = input.slice(1);
        const nextState = this.delta(state, symbol);
        if (nextState === -1) {
            return -1;
        }
        return this.extendedTransition(nextState, remainingInput);
    }

    run(input) {
        const finalState = this.extendedTransition(this.initialState, input);
        return this.finalStates.has(finalState);
    }
}

const automatoFileName = process.argv[2];
const testFileName = process.argv[3];
const outputFileName = process.argv[4] || './arquivo_de_saida.out';

if (!automatoFileName || !testFileName) {
    console.log("Por favor, forneça os nomes dos arquivos de autômato e teste.");
    process.exit(1);
}

const input = JSON.parse(fs.readFileSync(automatoFileName));
const tests = fs.readFileSync(testFileName);

const automaton = new Automaton();
automaton.initialState = input.initial;

for (const transition of input.transitions) {
    automaton.addTransition(parseInt(transition.from), transition.read, parseInt(transition.to));
}

for (const final of input.final) {
    automaton.addFinalState(final);
}

const inputString = tests.toString().trim().split("\r\n");

const values = [];

for (const test of inputString) {
    const [input, expected] = test.split(";");

    const currentTime = Date.now();
    const result = automaton.run(input);
    const laterTime = Date.now();
    const timeTaken = (laterTime - currentTime).toFixed(3);

    const resultInt = result ? "1" : "0";
    values.push(`${input};${expected};${resultInt};${timeTaken}`);
}

fs.writeFileSync(outputFileName, values.join("\n"));

console.log(`Resultado salvo em: ${outputFileName}`);
