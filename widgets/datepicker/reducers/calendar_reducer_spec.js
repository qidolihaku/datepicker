import * as ActionType from "../actions";
import CalendarReducer, { isExcludeDate } from "./index";
import expect from "expect.js";
import update from "immutability-helper";

describe("CalendarReducer reducer test", () => {
    let initState = {
        isVisible: false,
        currentMonth: new Date(),
        selection: [null,null],
        config: {
            calendarPages: 2
        }
    };

    describe("test OPEN_CALENDAR and CLOSE_CALENDAR", () => {

        it("should change the state isVisible to true", () => {
            const state = CalendarReducer(initState, {
                type: ActionType.OPEN_CALENDAR
            });

            expect(state).to.have.property("isVisible", true);
        });

        it("should change the state isVisible to false", () => {
            const state = CalendarReducer(initState, {
                type: ActionType.CLOSE_CALENDAR
            });

            expect(state).to.have.property("isVisible", false);
        });
    });


    describe("test SET_SELECTION", () => {
        it("should change selection value", () => {
            const state = CalendarReducer(initState, {
                type: ActionType.SET_SELECTION,
                selection: [ null, null ]
            });

            expect(state).to.have.property("selection");
            expect(state.selection).to.be.an("array");
            expect(state.selection).to.eql([ null, null ]);
        });
    });


    describe("test UPDATE_CALENDAR", () => {
    });


    describe("test PREV_MONTH", () => {
        let initState = {
            isVisible: false,
            selection: [null, null],
            config: {
                calendarPages: 1,
                calendarStartDate: new Date(2000, 0, 1),
                calendarEndDate: new Date(2020, 0, 1)
            },
            currentMonth: new Date(2010, 1, 1)
        };

        it("should change current date to previous month", () => {
            const date = new Date(2010, 1, 1);
            let state = CalendarReducer(initState, {
                type: ActionType.PREV_MONTH
            });

            expect(state).to.have.property("currentMonth");
            let modifiedDate = state.currentMonth;
            const yearDiff = modifiedDate.getYear() - date.getYear();
            const monthDiff = modifiedDate.getMonth() - date.getMonth();
            expect(yearDiff * 12 + monthDiff).to.be(-1);
        });

        it("should do nothing when date is out of range", () => {
            let state = CalendarReducer(
                update(initState, {
                    currentMonth: {
                        $set: new Date(1999, 1, 1)
                    }
                }),
                {
                    type: ActionType.PREV_MONTH
                }
            );
        });
    });

    describe("test NEXT_MONTH", () => {
        let initState = {
            isVisible: false,
            selection: [null, null],
            config: {
                calendarPages: 1,
                calendarStartDate: new Date(2000, 0, 1),
                calendarEndDate: new Date(2020, 0, 1)
            },
            currentMonth: new Date(2010, 1, 1)
        };

        it("should change currentMonth to  next month", () => {
            const date = new Date(2010, 1, 1);
            let state = CalendarReducer(initState, {
                type: ActionType.PREV_MONTH
            });

            expect(state).to.have.property("currentMonth");
            let modifiedDate = state.currentMonth;
            const yearDiff = modifiedDate.getYear() - date.getYear();
            const monthDiff = modifiedDate.getMonth() - date.getMonth();
            expect(yearDiff * 12 + monthDiff).to.be(-1);
        });
    });

    describe("test RANGE_SELECT", () => {
    });

    describe("test UPDATE_STYLING", () => {
    });


    describe("test SWITCH_INPUT", () => {
    });


    describe("test MOVE_CURSOR", () => {

    });


});
