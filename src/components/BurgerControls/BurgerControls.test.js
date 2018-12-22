import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BurgerControls from './BurgerControls';
import BurgerControl from './BurgerControl/BurgerControl';

configure({adapter: new Adapter()});

describe("<BurgerControls />", () => {
    it("Number of <BurgerControl /> child elements should equal the number of ingredient types received as props", () => {
        const ing = {
            salad: 0,
            cheese: 1,
            qwerty: 100
        };
        const wrapper = shallow(<BurgerControls ingredients={ing} burgerPrice={4} purchase={() => {}} />);
        expect(wrapper.find(BurgerControl)).toHaveLength(Object.keys(ing).length);
    });
});