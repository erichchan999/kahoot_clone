import { shallow } from 'enzyme';
import SessionEndPrompt from './SessionEndPrompt';
import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle } from '@mui/material';
import Button from './Button';
import { Link } from 'react-router-dom'

const noop = () => {}

describe('SessionEndPrompt', () => {
  it('should render a modal without crashing', () => {
    shallow(<SessionEndPrompt endPrompt={true} setEndPrompt={noop} checkStatusAndLoadPage={noop}/>);
  });

  it('should be a wrapper for Dialog component', () => {
    const wrapper = shallow(<SessionEndPrompt endPrompt={true} setEndPrompt={noop} checkStatusAndLoadPage={noop}/>);
    const dialog = wrapper.find(Dialog);
    expect(dialog).toHaveLength(1);
  });

  it('should render a modal when the endPrompt prop is set to true', () => {
    const wrapper = shallow(<SessionEndPrompt endPrompt={true} setEndPrompt={noop} checkStatusAndLoadPage={noop}/>);
    const dialog = wrapper.find(Dialog);
    const open = dialog.prop('open');
    expect(open).toBe(true);
  });

  it('should not render a modal when the endPrompt prop is set to false', () => {
    const wrapper = shallow(<SessionEndPrompt endPrompt={false} setEndPrompt={noop} checkStatusAndLoadPage={noop}/>);
    const dialog = wrapper.find(Dialog);
    const open = dialog.prop('open');
    expect(open).toBe(false);
  });

  it('should be formatted properly with the correct elements', () => {
    const wrapper = shallow(<SessionEndPrompt endPrompt={true} setEndPrompt={noop} checkStatusAndLoadPage={noop}/>);
    const dialog = wrapper.find(Dialog);
    expect(dialog).toHaveLength(1);
    const dialogTitle = wrapper.find(DialogTitle);
    expect(dialogTitle).toHaveLength(1);
    const dialogContent = wrapper.find(DialogContent);
    expect(dialogContent).toHaveLength(1);
    const dialogContentText = wrapper.find(DialogContentText);
    expect(dialogContentText).toHaveLength(1);
    const dialogActions = wrapper.find(DialogActions);
    expect(dialogActions).toHaveLength(1);
    const button = wrapper.find(Button);
    expect(button).toHaveLength(2);
  });

  it('should contain a button that is a react-router-dom link back to dashboard', () => {
    const wrapper = shallow(<SessionEndPrompt endPrompt={true} setEndPrompt={noop} checkStatusAndLoadPage={noop}/>);
    const button = wrapper.find({ 'aria-label': 'Return to dashboard button' });
    expect(button.prop('component')).toBe(Link);
    expect(button.prop('to')).toBe('/dashboard');
  });

  it('should contain a Yes button that when pressed should call checkStatusAndLoadPage', () => {
    const checkStatusAndLoadPage = jest.fn();
    const wrapper = shallow(<SessionEndPrompt endPrompt={true} setEndPrompt={noop} checkStatusAndLoadPage={checkStatusAndLoadPage}/>);
    wrapper.find({ 'aria-label': 'Yes go to results button' }).simulate('click');
    expect(checkStatusAndLoadPage).toHaveBeenCalledTimes(1);
  });
});
