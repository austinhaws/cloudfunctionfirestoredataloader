# cloud function firestore data loader
https://github.com/austinhaws/cloudfunctionfirestoredataloader.git

Loader for firestore data for easy importing of large sets of data

## Source Code
- NPM
- Parcel
- JavaScript (nodejs)
- firestore
- graphql
- express
- apollo

## GCP Cloud Function
- Trigger Type
    - HTTP
    - Unauthenticated endpoint
- Environment
    - NodeJS 12

# Technologies
- NodeJS12
- GCP cloud function
- apollo
- express
- firestore

## Getting started
Download the source code

### Installing
Application relies on cloud dependencies, so it easiest to push to git and view results in cloud, though a build takes a few minutes and after 120 minutes of building in a day, google starts charging. Plus waiting for builds all the time gets tedious and trying to debug through the Logs is slow. Debugging/running in cloud is a good option, but you can follow the steps below in the section titled `to run locally`.

To run locally:
1. Install Service Account Key
    1. `npm i` to install all dependencies
    1. go to GCP -> IAM & Admin -> Service Accounts -> click on name of fantasybracket-graphql-ws@ut-dts-fantasybracket-dev.iam.gserviceaccount.com  (graphql is the distinguisher)
    1. Click "Add Key" and choose "Create new key" and choose "JSON" and Create
    1. Place this json file in your project folder DO NOT COMMIT THIS FILE; Anything with this file has access to firestore, so keep this file safe and confidential and never commit it
    1. in db.js, set the name of the `keyFilename` to be the file just created (also set projectId in this file to bee the correct project)
1. Setup an `.env` file for the dotenv library to run in DEV mode
    1. create a file at the root of the project with the file name of `.env`
    1. Use the following as the contents of this file: `DEV=true`
    1. Note: Do not commit the `.env` file as it is for local development only
1. Build app by running `npm run watch`; This will create the index.js file in the dist folder and watch for changes
1. Run app by running `npm run serve`
1. You can navigate to `http://localhost:9001/` to play in graphiql (port is set in server.js)

Note: The dotenv library looks for the .env file which has a DEV attribute set. Without the .env file the DEV attribute is not set, so it runs without a service account key file. If configured for DEV then it will use the credentials key file (see db.js).

Note: in server.js, the server continues listenting if in DEV mode. As a cloud function, the server runs once and shuts down so it doesn't need to listen.

## Versioning
We use [SemVer](http://semver.org/) for versioning.
For the versions available, see the [tags on this repository](https://git.dts.utah.gov/sixthfloor-east/goed-covid-masks/covid-masks-ws/-/tags).

see [package.json](https://git.dts.utah.gov/sixthfloor-east/goed-covid-masks/covid-masks-ws/-/blob/dev/package.json)

## Deployment
- Merges to the master branch will kick off a Cloud Build trigger that deploys code to the PROD environment.

## Authors
* Austin Haws
