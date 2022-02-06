import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
import Login from '../pages/LoginPage/Login';
describe('Login', () => {
    it('Rendering Login Page', () => {
        const component = shallow(<Login debug />);
        expect(component).toMatchSnapshot();
    });
});