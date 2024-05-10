const reverseString = (str) => {
    let newString = "";
    for (let i = 0; i < str.length - 1; i++) {
        newString = str[i] + newString;
    }
    return newString + str.slice(-1);
}

console.log(reverseString("NEGIE1")) // 'EIGEN1'