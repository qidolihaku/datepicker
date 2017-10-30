import Rule from '../abstract_rule';

export class RuleEmpty extends Rule {
    calculate(date) {
       return {
           empty: date === null
       }
    }

    isMatch() {
        return true;
    }
}