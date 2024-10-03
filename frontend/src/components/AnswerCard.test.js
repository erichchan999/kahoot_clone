import { shallow } from 'enzyme';
import AnswerCard from './AnswerCard';
import Button from './Button';
import React from 'react';
import TextField from './TextField';
import Typography from './Typography';

const noop = () => {}

describe('AnswerCard', () => {
  it('should render an answer card without crashing', () => {
    shallow(<AnswerCard getAnswer={noop} updateAnswer={noop} id='10' deleteAnswer={noop}/>);
  });

  it('should render the answer card with the correct elements', () => {
    const wrapper = shallow(<AnswerCard getAnswer={noop} updateAnswer={noop} id='10' deleteAnswer={noop}/>);
    const input = wrapper.find(TextField);
    expect(input).toHaveLength(1);
    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);
    const title = wrapper.find(Typography);
    expect(title).toHaveLength(1);
  });

  it('should have an turn correct button by default', () => {
    const wrapper = shallow(<AnswerCard getAnswer={noop} updateAnswer={noop} id='10' deleteAnswer={noop}/>);
    expect(wrapper.exists({ 'aria-label': 'Turn correct button' })).toBeTruthy();
  });

  it('should show turn incorrect button when the turn correct answer button is pressed', () => {
    const wrapper = shallow(<AnswerCard getAnswer={noop} updateAnswer={noop} id='10' deleteAnswer={noop}/>);
    wrapper.find({ 'aria-label': 'Turn correct button' }).simulate('click');
    expect(wrapper.exists({ 'aria-label': 'Turn incorrect button' })).toBeTruthy();
    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);
  });

  it('should show turn correct button when the turn incorrect answer button is pressed', () => {
    const wrapper = shallow(<AnswerCard getAnswer={noop} updateAnswer={noop} id='10' deleteAnswer={noop}/>);
    wrapper.find({ 'aria-label': 'Turn correct button' }).simulate('click');
    wrapper.find({ 'aria-label': 'Turn incorrect button' }).simulate('click');
    expect(wrapper.exists({ 'aria-label': 'Turn correct button' })).toBeTruthy();
    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);
  });

  it('should call deleteAnswer function when delete button is pressed', () => {
    const deleteAnswer = jest.fn();
    const wrapper = shallow(<AnswerCard getAnswer={noop} updateAnswer={noop} id='10' deleteAnswer={deleteAnswer}/>);
    wrapper.find({ children: 'Delete' }).simulate('click');
    expect(deleteAnswer).toHaveBeenCalledTimes(1);
  });
});
