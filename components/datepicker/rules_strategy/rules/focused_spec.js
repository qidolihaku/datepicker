import {RuleFocus} from './focused';

describe.only('Test Rules focused day', () => {
    it('should returns {focused: true}', ()=>{
        let rule = new RuleFocus({focusedDate: new Date('2000/10/10')});
        expect(rule).to.have.property('focusedDate');
        expect(rule.isMatch()).to.be.true;
        expect(rule.calculate(new Date('2000/10/10'))).to.have.property('focused', true);
    })
});