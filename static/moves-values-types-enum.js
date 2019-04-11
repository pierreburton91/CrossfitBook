export default MovesValuesTypesEnum = function (key) {
    switch (key) {
        case 0:
            return [{ label: 'Weight', value: 'Kg' }, { label: 'Reps', value: 'Reps' }, { label: 'Time', value: 'hh:mm:ss' }];
        case 1:
            return [{ label: 'Distance', value: 'm' }, { label: 'Calories', value: 'Cal' }, { label: 'Time', value: 'hh:mm:ss' }];
        case 2:
            return [{ label: 'Reps', value: 'Reps' }, { label: 'Time', value: 'hh:mm:ss' }];
        case 3:
            return [{ label: 'Distance', value: 'm' }, { label: 'Time', value: 'hh:mm:ss' }];
        case 4:
            return [{ label: 'Reps', value: 'Reps' }, { label: 'Time', value: 'hh:mm:ss' }, { label: 'Height', value: 'cm' }];
    }
}