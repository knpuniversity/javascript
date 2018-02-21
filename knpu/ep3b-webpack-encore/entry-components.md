# Component Organization

With our new-found super-power to require files, we can really start to clean things
up! First, remove the self-executing function that's around everything. We
*originally* added this because it gave our code a little bit of isolation. It helped
us to, for example, avoid accidentally overriding global variables.

But... now that `RepLogApp` is being processed by Webpack, it is *itself* a module!
And Webpack automatically wraps it - behind the scenes - so that it's isolated.
Basically, we don't need to worry about silly things like self-executing functions.

## Creating a Skinny "entry" File

Next, look in the template: `index.html.twig`. We include the `rep_log.js` file...
but we *also* have a *little* bit of JavaScript that is responsible for using that
object and initializing it.

This is.... kind of a bummer: it relies on the `RepLogApp` variable to be *global*...
and that only works because, at the bottom, we're purposely creating a global
variable with `window.RepLogApp = RepLogApp`.

Also, to *fully* Webpackify our app, we will eventually want to remove *all*
JavaScript from our templates. Yep, you'll just include the one JS file and... that's
it!

## Skinny Entries

And this brings us to an important point about organization. Usually, the *entry*
file - so the file that we list in `webpack.config.js` - should contain a small
amount of logic that calls out to *other* modules. It's kind of like a controller
in Symfony: it's *supposed* to have just a *few* lines of code that call out to
*other* parts of our app.

Actually, the code in `index.html.twig` is a pretty good example of what I'd expect
in an entry file. Let me show you what I mean: in the `js/` directory, create a new
file: called `rep_log.js`.

Next, open `webpack.config.js`: let's use *this* as the entry file instead. And
since I just made a change, find your terminal and restart Encore:

```terminal-silent
./node_modules/.bin/encore dev --watch
```

Copy the code from `index.html.twig`, remove it, and paste it here. Perfect!

And now that we are *responsible* JavaScript developers... finally... we need to
require any dependencies. Oh, but first, add `'use strict';` on top - that's optional,
but I like it.

*Now* add `const $ = require('jquery')` and, to get `RepLogApp`,
`const RepLogApp = require('./RepLogApp');`.

I love it! Does it work? Move of and... refresh! Bah!

> RepLogApp is not a constructor

Ooof. This is a technical way of saying:

> Hey! You're using RepLogApp like a class... but it's not!

Open `RepLogApp.js`, and scroll to the bottom. Aha! We forgot to *export* a value
from this module. Replace the global variable with `module.exports = RepLogApp`.

Try it again! It works!

You can start to see the pattern: create a small entry file and organize everything
*else* into reusable classes or functions.

## Moving into a Components Directory

Let's take this a step further and organize into directories. Create a new directory
in `js/` called `Components/`. Let's move our re-usable stuff here: `RepLogApp` and
`RepLogHelper`.

Build failure! Of course! In `rep_log.js`, update the path: `./Components/RepLogApp`.
Build successful! Make sure it still works... it does!

Next! This is great! But can Encore handle apps that are *not* single-page apps?
Like, what if I need a *different* JavaScript file for my login page? Encore has
you covered.
