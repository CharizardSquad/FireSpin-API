import {describe, expect, test} from '@jest/globals';
import NavBar from '../client/Components/NavBar';
import Home from '../client/Components/Home';
import LineGraph from '../client/Components/LineGraph';
import App from '../client/App'
import renderer from 'react-test-renderer'
import * as React from 'react'

const mockUsedNavigate = jest.fn();
const mockUsedLocation = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
  // useLocation: () => mockUsedLocation,
}));

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//  useLocation: () => mockUsedLocation
// }));


describe('Create Snapshots', () => {
  test('Check if NavBar snapshot matches', () => {
    const tree:any =  renderer
    .create(<NavBar/>)
    .toJSON()

    expect(tree).toMatchSnapshot()
  });

  // test('Check if Home snapshot matches', () => {
  //   const test:any =  renderer
  //   .create(<Home/>)
  //   .toJSON()

  //   expect(test).toMatchSnapshot()
  // });
  
});

// describe('Check Rendering', () => {
//   test('If our Line Graph Renders properly', () => {
//     let element;
//     beforeAll(()=> {
      
//     })
//   })
// });