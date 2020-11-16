# Tasker SMS Link
A tasker profile to get info about links in text messages

When a text message is recieved that contains a URL, info about the URL is retreived from OpenGraph.io, and a notification is created with the title, description, and favicon of the site.

# How To Use

 * Get the profile and JS file from [Releases](https://github.com/Rayquaza01/tasker_sms_link/releases).
 * Import the profile to Tasker, and store the JS file as `/storage/emulated/0/tasker_projects/tasker_sms_link/index.js` on your device.
   * You can store the JS in a different location if you change the location referenced in the JavaScript action
 * Set your [OpenGraph.io API Key](https://opengraph.io) as the `%opengraphapi` task variable

Also requires: AutoNotification and AutoTools

# Building

To build the JS file, run:

```
npm install
npm run build:bundle`
```

For development, run:

```
npm run watch:bundle
```

to rebuild the JS file as you change it.
