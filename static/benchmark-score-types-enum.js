export default BenchmarkScoreTypesEnum = function (key) {
    switch (key) {
        case 0:
            return { label: 'Load', value: 'Kg' };
        case 1:
            return { label: 'Time', value: 'hh:mm:ss' };
        case 2:
            return { label: 'Reps', value: 'Reps' };
        case 3:
            return { label: 'Rounds', value: 'Rounds' };
    }
}