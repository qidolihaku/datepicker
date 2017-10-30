import Rule from '../abstract_rule';
import isWithinRange from 'date-fns/is_within_range';

export class RuleAvailableRange extends Rule {
    constructor(params) {
        super(params);
        this.params = params;
    }

    isMatch() {
        const {startDate, endDate} = this.params;
        return startDate && endDate;
    }

    calculate(date) {
        if(date) {
            const {startDate, endDate} = this.params;
            const available = isWithinRange(date, startDate, endDate);
            return {
                disabled: !available
            }
        }
    }
}
