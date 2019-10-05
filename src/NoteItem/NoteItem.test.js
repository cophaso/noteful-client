import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NoteItem from './NoteItem';

describe(`Note component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: new Date(2018, 12, 15),
  }

  it('renders a .Note by default', () => {
    const wrapper = shallow(<NoteItem />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Note given props', () => {
    const wrapper = shallow(<NoteItem {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})