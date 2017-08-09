# Modularize our Code

In the last tutorial, when we created `RepLogApp`, we put all of our code into
a self-executing function: It starts up here... then all the way at the bottom,
we call that function and pass in our dependencies which, before a recent change,
included jQuery and SweetAlert:

[[[ code('e271236a87') ]]]

Why did we do this? Well, it gave our code a little bit of isolation: any variables
we created inside the function are *not* available outside of it. And also, if we
did something silly like saying `$ = null`, well, it wouldn't *actually* set the
global `$` variable to null everywhere, it would only do it inside the function.

Now that I've told you about the amazing benefits of the self-executing function...
I want you to delete it! What!? Inside a module system, each module is executed in
*isolation*. Basically, you can imagine that Webpack wraps a self-executing function
*around* our module for us. Actually, in the built file... that's *exactly* what happens!
Sure, we can still *use* global variables - like this `Routing` global variable -
but we don't need to worry about any non-exported values leaking out of our module.

So get rid of the self-executing function! Woo! I'll un-indent everything to the root:

[[[ code('4258f84d64') ]]]

This has *no* effect on our app... except looking a bit cleaner. Hmm, nice.

## Exporting RepLogApp

But at the bottom, huh, we still have `window.RepLogApp = RepLogApp`:

[[[ code('a7280379d3') ]]]

In other words, we're using the global `window` variable that our browser makes available to create
a global `RepLogApp` variable. We *need* that because - in `index.html.twig` - we're
relying on `RepLogApp` to be available globally:

[[[ code('8765be8cc6') ]]]

Listen: we do *not* want to deal with global variables anymore. We can do better.

Since `RepLogApp` is being loaded by webpack. it's already a module. So instead of
using `window.RepLogApp`, let's export a value properly: `module.exports = RepLogApp`:

[[[ code('10ee5ca39e') ]]]

Now, if anything requires this file, they will get the `RepLogApp` class. *And*,
we are *no longer* modifying anything in the global scope.

And as *soon* as we try that, our app is super broken! Thanks Ryan!

> `RepLogApp` is not defined

Yes! This makes sense: in our template, we're *still* trying to reference the now,
- non-existent - global variable `RepLogApp`:

[[[ code('592bc34dbe') ]]]

## Creating a new Entry File

How do we fix this? By *fully* modularizing our code and removing *all* JavaScript
from our templates.

First, in the `js/` directory, create a new file called `rep_log.js`. This will be
our new *entry* file. In fact, open `webpack.config.js` right now and change the
entry to this file: `rep_log.js`:

[[[ code('b7158ee3a6') ]]]

This file will be the "entry point" for all the JavaScript that needs to run on
this page. In other words, remove all of the JavaScript code from the template:

[[[ code('7e7525d402') ]]]

And paste it here:

[[[ code('9a5e8437a8') ]]]

Now, when `index.html.twig` includes the new built `rep_log.js` file, it will hold
*all* of the code that's needed to run this page.

Back in that file, if you look closely, we have two dependencies: `$` and `RepLogApp`.
Add `const $ = require('jquery')`. And then - thanks to the new `module.exports`
we added - `const RepLogApp = require('./RepLogApp')`:

[[[ code('0474329006') ]]]

So cool! If you look at the watch output in our terminal... it looks happy! But...
remember.. we need to restart Webpack! Webpack's watch does not take into account changes
to `webpack.config.js` until we restart it. Hit `Control`+`C` and then re-run the command:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Finally, let's try it! Refresh! Ha! Everything still works! Guys... this is big!
We have *zero* code inside our template. This is a really common pattern: include
*one* script tag to your entry file. And from that file, write *just* a little bit
of code to require and boot up the rest of your application. This file is kind of
like a *controller* in PHP: it's a thin layer of code that calls out to other layers.

By the way, to help keep my code clean, the entry file is the *only* file where I
allow myself to reference the `document` or `window` objects that come from my browser.
For all my *true* modules, I try to not rely on *any* global objects. If I need to
use jQuery to find an element on the *entire* page, I do it here and *pass* that
into my other modules.

## Moving into Components

If you look at our `js/` directory now, `rep_log.js` is our entry point. `RepLogApp`
and `RepLogHelper`? Well, they're really *components*: independent modules that are
meant to be used by *other* code. That's really cool!

To make that distinction a bit more clear, let's create a new directory called
`Components/` - that name isn't important. Then, drag those two files inside.

Oh, I like this: our entry file lives at the root, and the *true* modules live inside
this new directory. To get this all working, all we need to do is update the path
to `./Components/RepLogApp`:

[[[ code('2d6cb16645') ]]]

The `require` statement in `RepLogApp` to `RepLogHelper` still works, because they
live in the same directory.

Try it! Wow, we just *can't* seem to break our app! It still works, and our setup
is starting to look pretty awesome.

Next! We need to talk about how we can have *multiple* entries... because right
now, we can only create Webpacked JavaScript for the rep log page. But, what about
the JavaScript on our login page? Or... any JavaScript in our layout? We need a way
to handle all of that.
