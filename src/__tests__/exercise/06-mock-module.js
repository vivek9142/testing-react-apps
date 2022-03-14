// mocking Browser APIs and modules - not supported in jest dom
// http://localhost:3000/location

/*When you have a module or third-party module and you dont want its code  
to run in test enviroment you can use jest mock api to mock out that 
particular component , mock implementation of func to do what 
you want them to do -  be careful you are poking holes in reality that reduces 
the amount of confidence test can give you*/

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation';

/*Sometimes, a module is doing something you don't want
 to actually do in tests.Jest makes it relatively simple to mock a module:
 
 now all the function exports from the "react-use-geolocation" module 
 are jest mock functions so we can call .mockImplementation(...) on them
 and make assertions like .toHaveBeenCalledTimes(...)

 so now we dont need deferred utility
*/
jest.mock('react-use-geolocation');


// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
beforeAll(()=>{

  window.navigator.geolocation = {
    getCurrentPosition : jest.fn()
  }
})
// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.

//not needed after adding mock module
// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return {promise, resolve, reject}
// }


test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude:35,
      longitude:139
    }
  };

  //not needed after adding mock module
  // const {promise,resolve} = deferred();
  // window.navigator.geolocation.getCurrentPosition.mockImplementation(
  //   callback => {
  //     //this will run when the promise resolves.
  //     promise.then(()=> callback(fakePosition))
  //   },
  // )

  let setReturnValue;
  function useMockCurrentPosition(){
    const state = React.useState([]);
    setReturnValue = state[1];
    return state[0];
  }

  
  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location/>);
  //if useCurrentPosition is called with some args so use assertion
  // expect(useCurrentPosition).toBeCalledWith('args');

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  //this time it is not async so removing it
  await act(()=> {
    //this will trigger re-render n this position will be that fake position

    //this needs to be wrapped in act since we're calling state updater func
    // n we want to make sure react flushes all of the side effects that 
    // are going to be triggered as a result of state update before we
    //continue with rest of our tests
    setReturnValue([fakePosition]);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`
  );

  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`
  );

  // screen.debug();
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  //
  // 🐨 create a deferred promise here
  //
  // 🐨 Now we need to mock the geolocation's getCurrentPosition function
  // To mock something you need to know its API and simulate that in your mock:
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  //
  // here's an example of the API:
  // function success(position) {}
  // function error(error) {}
  // navigator.geolocation.getCurrentPosition(success, error)
  //
  // 🐨 so call mockImplementation on getCurrentPosition
  // 🐨 the first argument of your mock should accept a callback
  // 🐨 you'll call the callback when the deferred promise resolves
  // 💰 promise.then(() => {/* call the callback with the fake position */})
  //
  // 🐨 now that setup is done, render the Location component itself
  //
  // 🐨 verify the loading spinner is showing up
  // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
  //
  // 🐨 resolve the deferred promise
  // 🐨 wait for the promise to resolve
  // 💰 right around here, you'll probably notice you get an error log in the
  // test output. You can ignore that for now and just add this next line:
  // act(() => {})
  //
  // If you'd like, learn about what this means and see if you can figure out
  // how to make the warning go away (tip, you'll need to use async act)
  // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  //
  // 🐨 verify the loading spinner is no longer in the document
  //    (💰 use queryByLabelText instead of getByLabelText)
  // 🐨 verify the latitude and longitude appear correctly
})

/*
eslint
  no-unused-vars: "off",
*/
