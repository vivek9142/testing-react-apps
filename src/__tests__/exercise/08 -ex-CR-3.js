// testing custom hooks
// http://localhost:3000/counter-hook

import {renderHook,act} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

//use Reacthooks in RTL

//Ex-Cr-1
test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter);

  expect(result.current.count).toBe(0);

  act(()=> {
    result.current.increment();
  })
  expect(result.current.count).toBe(1)

  act(()=>{
    result.current.decrement();
    
  })
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  let {result} =  renderHook(useCounter,{initialProps:{initialCount:3}});
  expect(result.current.count).toBe(3);
  
  act(()=> {
    result.current.increment();
  })
  expect(result.current.count).toBe(4)

  act(()=>{
    result.current.decrement();
    
  })
  expect(result.current.count).toBe(3)
});

test('allows customization of the step', () => {
  let {result} =  renderHook(useCounter,{initialProps:{step:2}});

  expect(result.current.count).toBe(0);

  act(()=> {
    result.current.increment();
  })
  expect(result.current.count).toBe(2)

  act(()=>{
    result.current.decrement();
    
  })
  expect(result.current.count).toBe(0)
});


test('the step can be changed', () => {
  let {result,rerender} =  renderHook(useCounter,{initialProps:{step:3}});

  expect(result.current.count).toBe(0);

  act(()=> {
    result.current.increment();
  })
  expect(result.current.count).toBe(3)

  //chnge value of step in hook n rerender
  rerender({step:2})

  act(()=>{
    result.current.decrement();
    
  })
  expect(result.current.count).toBe(1)
});

/* eslint no-unused-vars:0 */
