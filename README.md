Implements a way to pass text through the npm package [bad-words](https://www.npmjs.com/package/bad-words) and returns starts for words that match the packages bad word list. Returns the cleaned text to a custom user defined variable for use in the next stage of the effect or somewhere else entirely.

Built for use in my [Twitch Channel](https://twitch.tv/codehdn) this is completely open source and free to use and modify. If this helps you and you have ideas for other custom scripts feel free to reach out.

Discord: codehdn

_original readme from firebot script template_

# Starter Firebot Custom Script in Typescript

### Setup

1. Create a new repo based off this template (Click "Use this Template" above) or simply fork it
2. `npm install`

### Building

Dev:

1. `npm run build:dev`

- Automatically copies the compiled .js to Firebot's scripts folder.

Release:

1. `npm run build`

- Copy .js from `/dist`

### Note

- Keep the script definition object (that contains the `run`, `getScriptManifest`, and `getDefaultParameters` funcs) in the `main.ts` file as it's important those function names don't get minimized.
- Edit the `"scriptOutputName"` property in `package.json` to change the filename of the outputted script.
