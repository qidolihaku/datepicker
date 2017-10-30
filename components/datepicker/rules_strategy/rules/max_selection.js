import Rule from '../abstract_rule';
import isWithinRange from 'date-fns/is_within_range';
import addDays from 'date-fns/add_days';

export class RuleMaxSelection extends Rule {
    isMatch() {
        const {maxSelectRange, fromDay} = this.params;
        return maxSelectRange && fromDay;
    }

    calculate(date) {
        const {maxSelectRange, fromDay} = this.params;
        if(date && !isWithinRange(date, fromDay, addDays(fromDay, maxSelectRange))) {
            return {disabled: true}
        }
    }
}