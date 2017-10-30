import Rule from '../abstract_rule';
import isSameDay from 'date-fns/is_same_day';

export class RuleSelection extends Rule{
    isMatch()  {
        const {fromDay, toDay} = {...this.params};
        return (fromDay || toDay);
    }

    calculate(date) {
        if(!date) return;

        const {fromDay, toDay} = {...this.params};
        if(isSameDay(date, fromDay)) return {from: true}
        if(isSameDay(date, toDay)) return {to: true}
    }
}