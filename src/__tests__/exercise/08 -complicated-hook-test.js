// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen,act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

//Ex-Cr-2 - refactor code with function setup
function setup({initialProps} = {}) {
  /*due to referential equality when we trigger rerender it gets reassigned
  result to a new obj .this mean we reassign new 
  value to this  var but not in test*/
  let result = {}
  function TestComponent() {
    result.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent/>);
  return result;
}

//Ex-Cr-1
test('exposes the count and increment/decrement functions', () => {
  const result = setup();

  expect(result.current.count).toBe(0);

  //in case of state update
  act(()=> {
    result.current.increment();
  })
  expect(result.current.count).toBe(1)

  act(()=>{
    result.current.decrement();
    
  })
  expect(result.current.count).toBe(0)

  // 🐨 render the component
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
})

test('allows customization of the initial count', () => {
  let result
  function TestComponent() {
    result = useCounter({initialCount:3})
    return null
  }
  render(<TestComponent/>);

  expect(result.count).toBe(3);

  //in case of state update
  act(()=> {
    result.increment();
  })
  expect(result.count).toBe(4)

  act(()=>{
    result.decrement();
    
  })
  expect(result.count).toBe(3)
});

test('allows customization of the step', () => {
  let result
  function TestComponent() {
    result = useCounter({step:2})
    return null
  }
  render(<TestComponent/>);

  expect(result.count).toBe(0);

  //in case of state update
  act(()=> {
    result.increment();
  })
  expect(result.count).toBe(2)

  act(()=>{
    result.decrement();
    
  })
  expect(result.count).toBe(0)
});

/* eslint no-unused-vars:0 */
