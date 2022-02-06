import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
import CustomerAllOrders from '../pages/CustomerOrders/CustomerAllOrders';
describe('CustomerAllOrders', () => {
    it('Rendering Login Page', () => {
        const component = shallow(<CustomerAllOrders debug />);
        expect(component).toMatchSnapshot();
    });
});