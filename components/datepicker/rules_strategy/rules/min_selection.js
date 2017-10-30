import Rule from '../abstract_rule';
import isWithinRange from 'date-fns/is_within_range';
import addDays from 'date-fns/add_days';

export class RuleMinSelection extends Rule {
    isMatch() {
        const {minSelectRange, fromDay, isFocusOnFromDay} = this.params;
        return minSelectRange && fromDay && !isFocusOnFromDay;
    }

    calculate(date) {
        const {minSelectRange, fromDay} = this.params;
        if(date && isWithinRange(date, fromDay, addDays(fromDay, minSelectRange))) {
            return {disabled: true}
        }
    }
}