// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// test('renders with the light styles for the light theme', () => {

//   /*the problem is with there is no initial value in create Context - 
//   so the value shared will be within provider n we need to render
//   within themeprovider */

//   const Wrapper = ({children}) =>{
//     return <ThemeProvider initialTheme='light'>{children}</ThemeProvider>
//   }

//   // 🐨 uncomment all of this code and your test will be busted on the next line:
//   render(<EasyButton>Easy</EasyButton>,{wrapper:Wrapper});

//   const button = screen.getByRole('button', {name: /easy/i})
//   expect(button).toHaveStyle(`
//     background-color: white;
//     color: black;
//   `)
//   //
//   // 🐨 update the `render` call above to use the wrapper option using the
//   // ThemeProvider
// })

// //ex-CR-1 - add a test for the dark theme
// test('renders with the light styles for the light theme', () => {
//   const Wrapper = ({children}) =>{
//     return <ThemeProvider initialTheme='dark'>{children}</ThemeProvider>
//   }

//   render(<EasyButton>Easy</EasyButton>,{wrapper:Wrapper});

//   const button = screen.getByRole('button', {name: /easy/i})
//   expect(button).toHaveStyle(`
//     color: white;
//     background-color: black;
//   `)
// });

//ex-Cr-2 - create a custom render method

function renderWithTheme(ui,{theme = 'light', ...Options} = {}){
  const Wrapper = ({children}) =>{
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }

  return render(ui,{wrapper:Wrapper,...Options});
 
}

test('renders with the light styles for the light theme', () => {
  renderWithTheme(<EasyButton>Easy</EasyButton>);

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the light styles for the light theme', () => {
  renderWithTheme(<EasyButton>Easy</EasyButton>,{theme:'dark'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    color: white;
    background-color: black;
  `)
});

/* eslint no-unused-vars:0 */
