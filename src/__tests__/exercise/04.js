// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'


// for diff username n password
// import faker from 'faker';

// sometimes the obj factory for test can be little too complicated
//this library helps out in this case
import {build,fake} from '@jackfranklin/test-data-bot';

const buildLoginForm = build({
  fields:{
    // fake is called with func calling with faker module
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password())
  }
})
// function buildLoginForm(overrides){
//   return {
//     username:faker.internet.userName(),
//     password:faker.internet.password(),
//     ...overrides
//   }
// }

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData;
  // const handleSubmit = (data) => submittedData = data
  //it accepts a func so used jest func
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit}/>);
  // screen.debug();

  const {username,password} = buildLoginForm({username:'check'});

  userEvent.type(screen.getByLabelText(/username/i),username);
  userEvent.type(screen.getByLabelText(/password/i),password);
  userEvent.click(screen.getByRole('button',{name:/submit/i}));
  
  //jest func passed
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  // expect(submittedData).toEqual({
  //   username,
  //   password
  // })

  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  //
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  //
  // 🐨 click on the button with the text "Submit"
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
