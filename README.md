# INI for Firebot

This is a [Firebot](https://github.com/crowbartools/Firebot) Startup Script that adds the ability to read from and write to INI files.

### Setup

- In Firebot, go to Settings > Scripts
  - Enable Custom Scripts if they are not currently enabled
  - Click Manage Startup Scripts
  - Click Add New Script
  - Click the "scripts folder" link to open the Scripts Folder and place `oceanityIni.js` there
  - Refresh the list of scripts and pick `oceanityIni.js` from the dropdown

### Updating

- Overwrite existing `oceanityIni.js` with new version
- Restart Firebot

### Features

This script adds the following features to Firebot

- **Effects**

  - Write to INI File
    - Adds or removes a value from either the built-in INI file the script creates (`firebot.ini` in the data folder) or a specified INI file

- **Variables**

  - $ini[`path?`, `section`, `key`]
    - Retrieves a value with the provided section and key from the provided INI file, or default if no path is provided
    - eg. `$ini[mySection, myKey]` will retrieve the value in [mySection] myKey from `firebot.ini`
    - eg. `$ini[C:/Users/Firebot/Documents/MyINI.ini, mySection, myKey]` will retrieve the value in [mySection] myKey from an INI file located at that path
