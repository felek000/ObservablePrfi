import ObservablePrfi from '../src/ObservablePrfi'
import {defaultOptions} from "../src/delautOptions";

describe('tests ObservablePrfi', () => {
    it('should be object', function () {
        const o = new ObservablePrfi();
        expect(typeof o).toBe('object');
    });

    it('deflaut params', function () {
        const o = new ObservablePrfi();
        console.log(o.value);
        expect(o.getValue()).toBe(defaultOptions.value);
        expect(o.eventName).toBe(defaultOptions.eventName);
        expect(o.saveHistory).toBe(defaultOptions.saveHistory);
        expect(o.type).toBe(defaultOptions.type);
        expect(o.selector).toBe(document.querySelector(defaultOptions.selector));
    });

    it('merge params', function () {
        const optionsTest = {
            value: 1,
            eventName: "event",
            selector: "body",
            saveHistory: true,
            type: "number"
        };
        const o = new ObservablePrfi(optionsTest);
        expect(o.getValue()).toBe(optionsTest.value);
        expect(o.eventName).toBe(optionsTest.eventName);
        expect(o.saveHistory).toBe(optionsTest.saveHistory);
        expect(o.type).toBe(optionsTest.type);
        expect(o.selector).toBe(document.querySelector(optionsTest.selector));
    });


    it('should return 5', function () {

        const o = new ObservablePrfi();
        o.setValue(5);
        expect(o.getValue()).toBe(5);
    });

    it('should type error message', function () {
        const optionsTest = {
            value: 1,
            eventName: "event",
            selector: "body",
            saveHistory: true,
            type: "number"
        };
        const o = new ObservablePrfi(optionsTest);
        try{
            o.setValue('string')
        } catch (e) {
            expect(e.message).toBe('wrong type');
        }
        // console.log(o.setValue('string') === 'TypeError: wrong type');
    });

    it('should return array of element in history', function () {
        const optionsTest = {
            value: 1,
            eventName: "event",
            selector: "body",
            saveHistory: true,
            type: "number"
        };
        const o = new ObservablePrfi(optionsTest);
        o.setValue(2);
        o.setValue(3);
        const arrayElements = o.getHistoryFull();
        expect(arrayElements).toEqual([1, 2, 3]);
    });

    it('should return restore value from history 2', function () {
        const optionsTest = {
            value: 1,
            eventName: "event",
            selector: "body",
            saveHistory: true,
            type: "number"
        };
        const o = new ObservablePrfi(optionsTest);
        o.setValue(2);
        o.setValue(3);
        o.revFromHistory(1);
        const value = o.getValue();
        expect(value).toBe(2)
    });


    it('should trigger event', function async() {
        const o = new ObservablePrfi();
        const body = document.querySelector('body');
        body.addEventListener('event',(e)=>{
            expect(e.detail.value).toBe(2)
        });
        o.setValue(2);
    });


});
