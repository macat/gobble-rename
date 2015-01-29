gobble-rename
=============

Rename files using JS `.replace` method.

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm i -D gobble-rename
```

## Usage

**gobblefile.js**

```js
var gobble = require( 'gobble' );
module.exports = gobble('rename' ).transform('rename', {from: 'searchstring',
to: 'replacewith');
```

This will look for files with filename containing 'searchstring' and renames
them with 'replacewith'.

`a/b/c/searchstring.css > a/b/c/replacewith.css`

## License

MIT. Copyright 2015 Attila Maczak

Based on gobble's builtins/include.js.

MIT Licensed. Copyright 2014 Rich Harris.
