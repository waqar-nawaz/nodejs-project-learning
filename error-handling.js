

const sum = (a, b) => {

    if (a && b) return a + b
    throw new Error('invalid argument')
}


try {
    console.log(sum(3));
} catch (error) {

    console.log('Error');
}

console.log('next part');
