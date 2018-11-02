## Inspired and used by [igniteui-angular](https://github.com/IgniteUI/igniteui-angular)

Localizer for [Sassdoc](http://sassdoc.com/)

When using [Sassdoc](http://sassdoc.com/) for API docs generation you may want to generate documentation with different languages.

By using the [package](https://www.npmjs.com/package/sassdoc-plugin-localization) you will be able to:
 1. Merge all sass declarations that needs localization in a couple of json files.
 2. Translate them.
 3. Use the updated files to build a documentation for an entire project in the desired language.

### Installing

```
npm install sassdoc-plugin-localization --save-dev
```

### Usage

#### Important notes
> Please take in mind that you are running your local npm packages by `npx` right before the command execution.
> <br />
> The alternative would be to install the plugin globally with `-g` at the end of the command.
> <br />
> Then you won't need to use `npx`.

#### Step 1
In order to generate the json representations of each sass decalaration you will have to use one of the exposed functions which is [convert](https://github.com/IgniteUI/sassdoc-plugin-localization/blob/master/src/converter/convert.ts). 
<br />
The function accepts:
 1. The retrieved data which comes from the context of [Sassdoc](http://sassdoc.com/)
 2. The directory where you would like to export your jsons.

> As you can see the function is using [sassdoc-extras](https://www.npmjs.com/package/sassdoc-extras) in order to group the data so that the structure of the jsons to be grouped and sorted by types.

More precisely let's say we have the following sass definition:

```scss
////
/// @group bem
////

/// Converts a passed selector value into plain string.
/// @access private
/// @param {String} $s - The selector to be converted.
/// @returns {String}
///
@function bem--selector-to-string($s) {
    @if $s == null {
        @return '';
    }
    //cast to string
    $s: inspect($s);
    @if str-index($s, '(') {
        // ruby sass => "(selector,)"
        @return str-slice($s, 2, -3);
    } @else {
        // libsass => "selector"
        @return str-slice($s, 1, -1);
    }
}
```
Which says us that we have a sass definition with name **bem--selector-to-string** type **function** and group **bem**. So when we pass the processed data 
from the [Sassdoc](http://sassdoc.com/) and group it we would have the following directory structure:
<br />
**./your-path/bem/function.json** 
<br />
and this file would contains the following **JSON** structure:
```json
{
    "bem--selector-to-string": {
        "description": [
            "<p>Converts a passed selector value into plain string.</p>",
            ""
        ],
        "parameters": {
            "s": {
                "description": [
                    "<p>The selector to be converted.</p>",
                    ""
                ]
            }
        }
    },
    ...
}
```

#### Step 2
Do the translations and update the text within the jsons.

#### Step 3
To apply the changes that you have applied in those json files you will have to use the second exported function which is [render](https://github.com/IgniteUI/sassdoc-plugin-localization/blob/master/src/renderer/render.ts) 
<br />
The function accepts the same arguments as the [convert](https://github.com/IgniteUI/sassdoc-plugin-localization/blob/master/src/converter/convert.ts) function:
 1. The retrieved data which comes from the context of [Sassdoc](http://sassdoc.com/)
 2. The directory where your json file lives.

The function would compare and replace the generated data from the [Sassdoc](http://sassdoc.com/) with the translated data from the **JSONS**.