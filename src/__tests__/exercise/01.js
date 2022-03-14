// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

beforeEach(()=>{
  //this will initialise test mode n document also. s
  document.body.innerHTML = '';
});
test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const element = document.createElement('div');
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(element);
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter/>,element);

  const [decrement,increment] = element.querySelectorAll('button');
  const message = element.firstChild.querySelector('div');

  expect(message.textContent).toBe('Current count: 0');

  //.click workds on a dom node but if we fire a event that doesn't have a 
  //dedicated method like mouseover.rather than use button.click 
  //use button.dispatchEvent 
  
  const incrementClickEvent = new MouseEvent('click',{
    bubbles:true,
    cancelable:true,
    button:0
  });

  increment.dispatchEvent(incrementClickEvent);
  
  // console.log(document.body.innerHTML);
  expect(message.textContent).toBe('Current count: 1');

  const decrementClickEvent = new MouseEvent('click',{
    bubbles:true,
    cancelable:true,
    button:0
  });

  decrement.dispatchEvent(decrementClickEvent);
  expect(message.textContent).toBe('Current count: 0');
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  // 🐨 click the increment button (💰 increment.click())
  // 🐨 assert the message.textContent
  // 🐨 click the decrement button (💰 decrement.click())
  // 🐨 assert the message.textContent
  //
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
    
  //cleanup  - no need to use this after using beforeEach
    // element.remove();
})

/* eslint no-unused-vars:0 */
