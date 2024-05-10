const findLargestString = (str) => {
    let arrayStr = str.split(' ');
    let largestString = arrayStr.sort((a, b) => b.length - a.length)[0];
    let lengthString = largestString.length;
    return `${largestString}: ${lengthString} character`;
}

console.log(findLargestString("Saya sangat senang mengerjakan soal algoritma")) // mengerjakan: 11 character