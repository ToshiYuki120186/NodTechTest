This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn lint`

Runs typescript project files through a linter.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Folder Structure


```
src/
┣ components/            # Collection of UI components like button, custom input field, modal, etc that will be shared and used across files in the project.
┣ features/              # Each folder exports and handles it's own routes. Can be nested and have it's own components folder to be used by child routes.
┃ ┗ formPage/
┗ index.tsx

```

## Technolgies and resources
- Typescript support
- Styling Framework
  https://github.com/mui-org/material-ui

