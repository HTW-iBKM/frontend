# Intelligentes Bilanzkreismanagement Dashboard
Dieses Projekt wird im Rahmen eines Praxis-Projektes an der HTW Berlin in Kooperation mit Exxeta durchgeführt.
Ziel ist es, prognostizierte Strom-Preis und -Verbrauchsmengen aufzubereiten und dem Nutzer visualisiert zur Verfügung zu stellen.
Die zugrundeliegenden Daten werden auf einer Amazon AWS Lambda serverless Architektur mittels Maschine Learning erzeugt. 

Die technische Grundlage des iBMK Dashboards stellt das Javascript Framework [React Js](https://reactjs.org/) (Typescript) dar.
Zudem kommt im Frontend [Tailwindcss](https://tailwindcss.com/) zum Einsatz. Für die Darstellung der Graphen wird die Library [Recharts](https://recharts.org/en-US/) genutzt

## Continuous integration und Continuous Deployment
Die CI Pipeline besteht aus drei Stages. Einen Überblick über die Stages liefert die folgende Tabelle:

Stage  | Beschreibung                                                           | Trigger
------ | ---------------------------------------------------------------------- | --------
Test   | Führt die Tests für das Projekt aus                                    | Push auf Dev-Branch
Build  | Baut das Projekt und stellt das Build-Verzeichnis als Artefakt bereit  | Push auf Main-Branch
Deploy | Push as Build-Verzeichnis in den entsprechenden AWS S3 Bucket          | Push auf Main-Branch

## Available Scripts

In the project directory, you can run:

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

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
