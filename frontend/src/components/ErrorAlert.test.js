import { shallow } from 'enzyme';
import ErrorAlert from './ErrorAlert';
import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle } from '@mui/material';
import Button from './Button';

const noop = () => {}

describe('ErrorAlert', () => {
  it('should render an error modal without crashing', () => {
    shallow(<ErrorAlert error={true} setError={noop} errorMessage=''/>);
  });

  it('should be a wrapper for Dialog component', () => {
    const wrapper = shallow(<ErrorAlert error={true} setError={noop} errorMessage=''/>);
    const dialog = wrapper.find(Dialog);
    expect(dialog).toHaveLength(1);
  });

  it('should render an error modal when the error prop is set to true', () => {
    const wrapper = shallow(<ErrorAlert error={true} setError={noop} errorMessage=''/>);
    const dialog = wrapper.find(Dialog);
    const open = dialog.prop('open');
    expect(open).toBe(true);
  });

  it('should not render an error modal when the error prop is set to false', () => {
    const wrapper = shallow(<ErrorAlert error={false} setError={noop} errorMessage=''/>);
    const dialog = wrapper.find(Dialog);
    const open = dialog.prop('open');
    expect(open).toBe(false);
  });

  it('should be formatted properly with the correct elements', () => {
    const wrapper = shallow(<ErrorAlert error={true} setError={noop} errorMessage=''/>);
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
    expect(button).toHaveLength(1);
  });

  it('should display the error message passed in as a prop', () => {
    const wrapper = shallow(<ErrorAlert error={true} setError={noop} errorMessage='custom error msg'/>);
    const dialog = wrapper.find(Dialog);
    expect(dialog).toHaveLength(1);
    const dialogContentText = wrapper.find(DialogContentText);
    expect(dialogContentText.prop('children')).toMatch('custom error msg');
  });
});
