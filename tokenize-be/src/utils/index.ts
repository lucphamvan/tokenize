export function getRandomArbitrary(min: number, max: number) {
    return Number((Math.random() * (max - min) + min).toFixed(8));
}
