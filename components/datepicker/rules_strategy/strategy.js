import addDays from "date-fns/add_days";
import Rule from './abstract_rule';
import _ from 'lodash';

export class Strategy {
    constructor(state) {
        this.state = state;
        this.rules = [];
        this.params = state && this.mapStateToParams(state);
    }

    addRule(rule) {
        if (rule &&  Rule.isPrototypeOf(rule) || Rule === rule) {
            this.rules.push(new rule(this.params));
        } else {
            throw new TypeError("The parameter rule must be a subclass of Rules");
        }

        return this;
    }

    mapStateToParams(params) {
        return {
            startDate: addDays(params.config.calendarStartDate, params.config.advancedDays - 1),
            endDate: addDays(params.config.calendarEndDate, 1),
            focusedDate: params.focusedDate,
            minSelectRange: params.config.minSelectRange,
            maxSelectRange: params.config.maxSelectRange,
            fromDay: params.selection[0],
            toDay: params.selection[1],
            isFocusOnFromDay: params.inputIndex === 0,
        };
    }

    execute() {
        const datesTable = this.state.calendarTables.dates.slice();
        this.state = null;

        const rules = this.rules.filter((rule) => {
            return rule.isMatch(this.params);
        });

        datesTable.forEach((day, i, days) => {
            let status = {};
            rules.forEach((rule) => {
                let result = rule.calculate(day.date);
                if(result) status = _.assign(status, result)
            });

            days[i] = {...day, status}
        });

        return datesTable;
    }
}

