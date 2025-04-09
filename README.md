## SassDoc Plugin Localization for Ignite UI
[![npm version](https://badge.fury.io/js/sassdoc-plugin-localization.svg)](https://badge.fury.io/js/sassdoc-plugin-localization)

A localization plugin for [Sassdoc](http://sassdoc.com/) specifically designed to work with the Ignite UI SassDoc Theme.

This plugin enables you to generate multilingual documentation for your Sass codebase by:
1. Exporting all sass declarations that need localization into JSON files
2. Giving you the option to translate the content in these JSON files
3. Importing the translated content to build documentation in different languages

### Installing

```sh
npm install sassdoc-plugin-localization --save-dev
```

### Configuration

The plugin must be configured in your SassDoc configuration file. Here's an example configuration:

```json
{
  "theme": "./node_modules/igniteui-sassdoc-theme",
  "dest": "./site",
  "autofill": ["throw", "content"],
  "display": {
    "alias": true,
    "access": ["public", "private"]
  },
  "plugins": [
    {
      "name": "sassdoc-plugin-localization",
      "path": "./node_modules/sassdoc-plugin-localization/dist/index.js",
      "options": {
        "dir": "extras",
        "mode": "export"
      }
    }
  ]
}
```

#### Plugin Options

- **dir**: The directory where JSON files will be exported to or imported from
- **mode**: Determines the plugin's operation mode
  - `export`: Only exports the JSON files for translation
  - `import`: Only imports and applies translations from JSON files
  - `both`: Performs both export and import operations. Useful for pass-through builds.

### Usage

> [!IMPORTANT]
> This plugin is specifically designed to work with the Ignite UI SassDoc Theme.

#### Step 1: Export Sass Declarations to JSON

When running SassDoc with the plugin configured in `export` mode, the plugin will generate JSON files containing all the text that can be localized.

For example, given this Sass definition:

```scss
////
/// @group bem
////

/// Converts a passed selector value into plain string.
/// @access private
/// @param {String} $s - The selector to be converted.
/// @returns {String}
@function bem--selector-to-string($s) {
    @if not($s) {
        @return '';
    }

    @return string.slice(meta.inspect($s), 2, -3);
}
```

The plugin will generate a JSON file at `./your-path/bem/function.json` with the following structure:

```json
{
    "bem--selector-to-string": {
        "description": [
            "Converts a passed selector value into plain string."
        ],
        "parameters": {
            "s": {
                "description": [
                    "The selector to be converted."
                ]
            }
        }
    },
    ...
}
```

#### Step 2: Translate the JSON Files

Translate the content in the generated JSON files to your target language(s). You can do this manually or use translation services.

#### Step 3: Generate Documentation with Translations

Run SassDoc with the plugin configured in `import` mode to generate documentation using your translated JSON files.

> [!TIP]
> If you want to see this plugin in action take a look at [igniteui-angular](https://github.com/IgniteUI/igniteui-angular)
