const countInput = (input) => {
    let counts = {};
    for (const element of input) {
        counts[element] = (counts[element] || 0) + 1;
    }
    return counts;
}

const findQueryInArrayInput = (input, query) => {
    let counts = countInput(input);
    let result = [];
    for (const element of query) {
        result.push(counts[element] || 0);
    }
    return result;
}

const input = ['xc', 'dz', 'bbb', 'dz'];
const query = ['bbb', 'ac', 'dz'];

console.log(findQueryInArrayInput(input, query)) // [1, 0, 2]