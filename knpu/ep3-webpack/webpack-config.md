# webpack.config.js

Since we programmers are *famously* lazy, we don't usually run Webpack with all
these cumbersome command-line options. Nope, we put them into a configuration file.
At the root of your project, create a new `webpack.config.js` file. If you make a
file with exactly this name, Webpack will automatically find it.

And what does this file look like? Oh, you're going to love this: we use, yep `module.exports`
to *export* a configuration object!

[[[ code('b0483ae6f7') ]]]

***TIP
If you're using Webpack 4 or higher, add `mode` key:

```javascript
// webpack.config.js

module.exports = {
    mode: 'development',
    //...
};
```

This will tell Webpack you're building in "development" mode. We'll talk about 
production builds later.
***

Inside, that config needs two major things. First, an `entry` key set to
`./web/assets/js/RepLogApp.js`:

[[[ code('a61cfb5d4a') ]]]

Entry is Webpack's name for your input file: the *one* file it will load. Second,
of course, we need to tell Webpack *where* to create the `output`. Set this to a
hash with `path` set to the directory: `__dirname` plus `/web/build`:

[[[ code('f4e3630197') ]]]

That `__dirname` is a special variable available inside of Node that points to the
directory of *this* file. Then, add a `filename` key set to `rep_log.js`:

[[[ code('d36134c613') ]]]

*Now*, running Webpack is *truly* a *lazy* experience... we should probably lift
our cat a few times for exercise. Just run:

```terminal
./node_modules/.bin/webpack
```

And it works *exactly* like before.

## Using the path module

Before we celebrate too much, head to `webpack.js.org`. Make sure you're here, and
*not* on `webpack.github.io` - that's the old website for the *old* version 1 of
Webpack. We're using the hipster version *3*... and new versions of Webpack tend
to come out *fast*. If there is already a *new* version when you're going through
this tutorial, don't worry too much: there's a good chance the changes are minimal.
And we'll add notes otherwise.

Under the main [Concepts][concepts] page, they talk about this configuration file.
But check it out: for the output path, they use some `path.resolve()` thing.

This is a minor detail in Node that I want you guys to see. In Node, you never
see path strings concatenated together like this. Nope, to keep things portable
between Unix and Windows, you're supposed to call `path.resolve()` - or a similar
function `path.join()` - to concatenate the path for you.

No big deal! Add `path.resolve()` passing it `__dirname`, then `web` then `build`:

[[[ code('7bd304aea5') ]]]

You can pass as many arguments as you want: the args are built into one big path
string.

Simple! But... does it work!? Try it:

```terminal-silent
./node_modules/.bin/webpack
```

Ah! An error!

> path is not defined

Listen up! This is important: `webpack.config.js` is executed by Node... and this
code will never run in our browser. So since this is a pure Node script, we can use
*any* of the core libraries that you normally have access to, like the path module. 

But to *get* access to it, you need to *require* it. At the top, add
`const path = require('path')`:

[[[ code('a3c2bc4e74') ]]]

*Now*, everything is happy again!

## Requiring Core or Vendor Modules

But notice, this is *not* `./path`! The `./` would tell Node to look for a file relative
to *this* file. But when we *just* say `path`, Node looks for either a *core* module
inside the language itself called `path` - which is what happens in this case - *or*
for a module called path inside `node_modules`. We'll see that very soon.

## Making PhpStorm work with Node

Ok, but my editor isn't very happy: when I hover over `path`, it looks like there's
an error:

> Node.js coding assistance is disabled

Ok, that sounds like something we can improve! Open up the PhpStorm Preferences,
which is `Command`+`,` on a Mac. Then, search for `Node.js`. Ah, there's a section
called "Node.js and NPM". Find that "Enable" box and click it! Then hit Ok to exit.

And in a moment, yep! PhpStorm is happy again. And *now*, we will have auto-complete
on core Node features.

Ok, next, we'll teach Webpack to *watch* for changes... *and* start installing and
requiring vendor libraries - like jQuery - via Yarn.


[concepts]: https://webpack.js.org/concepts/
