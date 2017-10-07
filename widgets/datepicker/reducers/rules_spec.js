import expect from 'expect.js'
import update from 'immutability-helper';

import Rules, {applyRules, DayStatus} from './rules'

describe('test CalendarReducer Rules', () => {
    let state = {
        config: {
            exclusiveDays: [],
            isRangeSelect: true,
            advancedDays: 1,
            calendarStartDate: new Date('2012/01/01'),
            calendarEndDate: new Date('2012/03/30'),
            minSelectRange: 1,
            maxSelectRange: 10,
        },
        selection: [null, null],
        calendarTables: {
            months: [new Date()],
            dates: [
                {date: null},
                {date: new Date('2011/12/23')},
                {date: new Date('2012/2/23')},
            ],
        }
    };

    describe('test preProcessor(general rules)', () => {
        it('should return empty when date is null', () => {
            let day = Rules.preProcessor(state).calendarTables.dates[0];
            expect(day.status).to.have.property(DayStatus.EMPTY, true);
        });

        it('should return disabled when date is outside of claendar range', () => {
            let day = Rules.preProcessor(state).calendarTables.dates[1];
            expect(day.status).to.have.property(DayStatus.DISABLED, true);
        });

        it('available days should not contains disable nor empty', () => {
            let day = Rules.preProcessor(state).calendarTables.dates[2];
            expect(day.status).to.only.have.keys('day');
        });

        it('selected start day should contains from status', () => {
            state.selection = [new Date('2012/2/23'), null];
            let day = Rules.preProcessor(state).calendarTables.dates[2];
            expect(day.status).to.have.property('from', true);
        });

        it('selected end day should contains "to" status', () => {
            state.selection = [null, new Date('2012/2/23')];
            let day = Rules.preProcessor(state).calendarTables.dates[2];
            expect(day.status).to.have.property('to', true);
        });

        describe('advanced days setting', () => {
            it('dates before (today + advanced days) should be disabled');
        });

    });

    describe('range select rules test', ()=>{
        describe('select range test', () => {
            it('should be disabled when dates range less than the minimum range');
            it('should be disabled when date range over the maximum range');
        })
    });







});