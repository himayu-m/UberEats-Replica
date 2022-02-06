import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
import AddDishItem from '../pages/Restaurant/AddDishItem';
describe('AddDishItem', () => {
    it('Rendering Login Page', () => {
        const component = shallow(<AddDishItem debug />);
        expect(component).toMatchSnapshot();
    });
});