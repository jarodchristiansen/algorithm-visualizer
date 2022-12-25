const fibonacciGenerator = (length: number) => {
    let fibs = [0,1];
    let fibCopy = [{key:0, classType:0}, {key:1, classType:0}]

    for (let i=1; i<length; i++) {
        // @ts-ignore: TODO
        fibCopy.push({key: parseInt(fibCopy[i]?.key + fibCopy[i - 1]?.key), classType: 0})
    }

    return fibCopy;
}

export default fibonacciGenerator;