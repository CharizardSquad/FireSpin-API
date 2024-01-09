#Contributing to ART in the context of a group/small-medium term project

If you are considering contributing to ART in the context of a group small-medium term project you are at the right place! Here is a document that will give you more information regarding the state of the product and some considerations for future iteration.

---

## As a developer, what experience can you get out of contributing to ART
-TypeScript + JavaScript
-React
-Sass
-Node
-Express
-Webpack
-Testing
    -Unit Testing with Jest 
    -E2E Testing with Cypress
-Chart.js
-Sequilize



## How to download and test application locally

1. Fork and/or clone the repository into your local machine
2. In your terminal:
    - `npm install`, then
    - `npm run dev`
3. Wait for the application to start up

4. To run Cypress tests
    1. In your terminal:
        - `npm run cypress`
        - Wait for tests report
        - There is more work regarding configuration, needed for this to be fully implemented
5. To run Jest tests
    1. In your terminal: 
        - `npm run test-jest`
        - Wait for tests report
        - Requires more work to increase coverage.

## What is the current state of the application

-Consistent UI/UX styling and color palette
-Modular and lightweight codebase
-Able to ping various user inputted API's and record response time via a rendered chart from Chart.js


## What are some features that require future iteration?

## Continue implementing TS
Continue to integrate and improve correct usage of types on front & back end. Fill the types.ts file out more.

## Continue Styling Optimization

## Continue Testing coverage for Unit % E2E Testing
Currently testing coverage for unit and e2e is about 5% completed

## Ideas for new features

## Implement CI/CD w/Github Actions and AWS Cloud
Purshasing and maintain a domain to deploy to. Ensuring this application is available globally with automatic releases from the CI/CD workflows with Github Actions. 

## Implement Dynamic and Interactive Background
It would be pretty cool if the background could function as a typical GBA allowing users to navigate between input fields with the D-pad on the left hand side of the screen using keydown events and arrowkeys

Allowing users to select the submit button as the ("A") button on the background would improve the UI/UX immensly.

Last UI/UX design feature could be to mimic the process of loading up a GBA (GameBoy Advanced) with the start screen fixed onto the display of the background GBA, making the user interaction feel more akin to playing on a retro GameBoy Advanced.  


## Maintaining this document

This should serve as an entry point for any developers who wish to iterate on ART and therefore, should be kept as up-to-date as possible. **At the end of your iteration, you are strongly encouraged to update this document for future developers.**

Thank you for your consideration and let's work on making FireSpin-API one of the best open-source products to contribute!
