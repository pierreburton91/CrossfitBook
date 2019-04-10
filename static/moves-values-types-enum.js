export default MovesValuesTypesEnum = function (key) {
    switch (key) {
        case 0:
            return [{ label: 'Weight', value: 'Kg' }, { label: 'Reps', value: 'Reps' }, { label: 'Time', value: 'ms' }];
        case 1:
            return [{ label: 'Distance', value: 'm' }, { label: 'Calories', value: 'Cal' }, { label: 'Time', value: 'ms' }];
        case 2:
            return [{ label: 'Reps', value: 'Reps' }, { label: 'Time', value: 'ms' }];
        case 3:
            return [{ label: 'Distance', value: 'm' }];
        case 4:
            return [{ label: 'Reps', value: 'Reps' }, { label: 'Time', value: 'ms' }, { label: 'Height', value: 'cm' }];
    }
}