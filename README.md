# hapi-locale-i18n

An hapijs plugin to add i18n. i18n is also available outside hapijs

## requirements

- nodejs
- babel

## install

`$> npm install hapi-local-i18n`

## rebuild

If you want to rebuild the package, clone it and then

`$> npm build`

## usage

```
import { register } from 'hapi-locale-i18n'

Server.register({
  register: register,
  options: {
    directory: './locales'
  }
}, (err) => {
  // handle error
})
```

Plugin options are the same as `i18n` options.
https://www.npmjs.com/package/i18n

If you need to use i18n outside hapijs, in a model for instance:

```
import { i18n as Hapii18n } from 'hapi-locale-i18n'
...
const i18n = Hapii18n.i18n
...
console.log(i18n.__('Some text to translate'))
```


## Licensed under MIT

Copyright (c) 2016 Cyril Hagege <cyril@oyst.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
