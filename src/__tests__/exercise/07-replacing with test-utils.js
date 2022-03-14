// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
//if you have configure it in jest config file you can import it
//as regular node module
import {render, screen} from 'test/test-utils';

// import {render, screen} from '@testing-library/react'
import EasyButton from '../../components/easy-button'



test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>);

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>,{theme:'dark'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    color: white;
    background-color: black;
  `)
});

/* eslint no-unused-vars:0 */
