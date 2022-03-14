// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
// 🐨 add `screen` to the import here:
import {render,screen} from '@testing-library/react'
//fireEvent is only applicable for click events but userEvent is applicable for
//all user events. userEvent is build on top of Testing Lib fireEvent so 
//it has bunch of methods build on top of them.
import userEvent from '@testing-library/user-event';
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  // const incBtn =  screen.getByText('Increment');
  // const decBtn =  screen.getByText('Decrement');
  // const message = container.firstChild.querySelector('div')
  const increment = screen.getByRole('button',{name:/increment/i});
  const decrement = screen.getByRole('button',{name:/decrement/i});

  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0')
})
