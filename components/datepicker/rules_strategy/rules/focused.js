import Rule from '../abstract_rule';
import isSameDay from 'date-fns/is_same_day';

export class RuleFocus extends Rule {
    constructor(params) {
        super(params);
        this.focusedDate = params.focusedDate;
    }

    calculate(date) {
        if(isSameDay(date, this.focusedDate)) {
            return {
               focused : true
            }
        }
    }

    isMatch() {
        return !!this.focusedDate;
    }
}