# ProvidePlugin & Global Vars

Delete the `window.jQuery` line. Instead, go to `webpack.js.org`. This time, skip
straight to the Documentation, Plugins, then find the [ProvidePlugin][provide_plugin].
This plugin is *crazy* cool: it's both *massively* useful and shows off the power
of the dark side... I mean Webpack.

At the top, it says:

> Automatically load modules instead of having to require them everywhere.

Let's see what that means. In `webpack.config.js`, there is a *new* key we can
put here called `plugins`, set to an array. Add `new webpack.ProvidePlugin()`
with `{}`. Inside, pass a key called `jQuery` set to the string `jquery` in all
lowercase... like the module's name:

[[[ code('6fc5413daf') ]]]

The `ProvidePlugin()` is *bananas*. Thanks to this line, *whenever* Webpack finds a
variable in *any* file named `jQuery` that has *not* been initialized - in other
words, some module like `bootstrap` where it's trying to use `jQuery` as a global
variable - it will automatically require the `jquery` module and set the `jQuery`
variable to that in the dumped file.

This is a game-changer: whenever we try to use *any* module that relies on jQuery
as a global variable, this plugin will rewrite that code to use a proper `require`
statement. Let's do the same thing for the `$` variable, which should also use the
`jquery` module:

[[[ code('f3887c53ce') ]]]

***TIP
There is also something called the `imports-loader`, where you can do something
similar to the ProvidePlugin on a module-by-module basis.
***

Oh, but PhpStorm says the `webpack` element "is not exported". At the top, add
`const webpack = require('webpack')`:

[[[ code('89110053cd') ]]]

The plugin comes from Webpack, which we need to require like anything else.
My editor still doesn't look super happy, but it will work, I promise!

Let's give it a shot! Go back and restart webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Then, find your browser and refresh. Ha! It's alive!!!

Take a look at the built `layout.js` file. These files are *not* meant to be easy
to read: Webpack adds a lot of magic to get things working. But, it can be *really*
interesting while learning. At the top, Webpack adds its bootstrap code. Next, search
for the word "bootstrap".

Woh, check out this "VAR INJECTION" stuff: Webpack wraps Bootstrap in a self-executing
function and *passes* jQuery as an argument. Inside, instead of Bootstrap using a
*global* jQuery variable, it's using whatever is being passed as `jQuery`.

And... what is that? If you follow the green line on the left to the bottom of the
self-executing function, it calls itself with `.call()` and passes a cryptic
`__webpack_require__(0)` as the first argument. Internally, *this* is the require
call to the `jquery` module. When it dumps the file, Webpack gives each module a
number, and if you did some digging, you'd find out that `0` means `jquery` in this
case.

Like I said... these files *aren't* meant to be read by humans, but it's *really*
amazing to see how Webpack manages to build this one, final file.


[provide_plugin]: https://webpack.js.org/plugins/provide-plugin/
