# The Power of require

Yo friends! I am *ecstatic* about this tutorial on Webpack... because *we've*
packed a *ton* of great stuff into it. But it's more than that! Webpack is going
to *change* the way you develop front-end code, big time. And that's the *real*
reason I'm so pumped!

But... Webpack is tough! And sometimes, it's weird and it mis-behaves and it's frustrating.
Huh, it's kind of a like baby - super great and all... but with a mind of its own.

Anyways, that's why we're here: to unpack this beast from beginner to pro. In just
a little while, you're going to have new super-powers that you never dreamed of.

Oh, what does Webpack actually do? Did I not mention that? I'll show you soon.

## Grab the Code!

Like always, JavaScript is best written together, so download the course code from
this page to code along with me. When you unzip the file, you'll find a `start/`
directory inside that has the same code you see here. Oh, and if you've been coding
along with the first two [JavaScript tutorials][modern_javascript] - you're amazing!
But also, make sure to download the new code: I've made a few tweaks since the last
tutorial to make things more interesting.

Then, open the `README.md` file for *fascinating* instructions on how to get the
project setup. The last step will be to find your favorite terminal, move into the
app, and run:

```terminal
php bin/console server:run
```

to start the built-in PHP web server.

Pull up the site in your browser: `http://localhost:8000`. Welcome to Lift Stuff!
Log in as `ron_furgandy`, password `pumpup`. Over the past 2 courses, we've lovingly
built this activity-tracker-for-programmers into a nice, JavaScript-powered front-end.
Now, we're going to revolutionize the way that code is organized.

## Node and require

What am I talking about? Well, in the last tutorial, in addition to running JavaScript
in the browser, we actually wrote a bit of Node.js - aka JavaScript that runs right
on your server. Open up `play.js`:

[[[ code('b9c9542188') ]]]

We used this as a simple way to test out new ES6 features.

To execute this, open a new terminal tab and run:

```terminal
node play.js
```

Awesome! If you look at most `Node.js` code, one thing will jump out *immediately*:
the `require()` function. On the surface, it's a lot like PHP's `require` statement:
it allows you to separate code into multiple files.

Try it out: at the root of our project, create a new `foods.js` file. Then, copy
the old foods code from `play.js`, delete it, and paste it in `foods.js`:

[[[ code('6d9b928d12') ]]]

## Modules & module.exports

Now, as you're probably expecting, we're going to `require` `foods.js` from `play.js`.
But there is one *really* important difference between the way `require`
works in PHP versus Node. In PHP, when you require a file, you magically have access
to all functions, classes or variables inside. But in Node, that's not true: you
need to explicitly export a value from the required file.

How? By saying `module.exports = foods`:

[[[ code('54619df8a2') ]]]

By the way, in JavaScript, each file is known as a *module* and is executed in
isolation. Nothing is returned from this file *other* than what we export.

Ok! Back in `play.js`, we can *now* say, `const foods = require('./foods')`:

[[[ code('94c7e23d85') ]]]

Before I say more, try it! Head back to your terminal and re-run the code:

```terminal-silent
node play.js
```

It still works! Back in the code, notice that we do *not* need the `.js` on the end
of the filename:

[[[ code('e74007956e') ]]]

We *can* add it - that would totally work. But if it's not there, Node knows to look
for `foods.js`.

Also, that `./` before `foods` is no accident: that's *super* important. When a path
starts with a `.`, Node knows to look for that file relative to *this* file. If we
just said `foods` *without* the `./`, well, that means something very different.
More on that later.

## Using require in the Browser

So the `require()` function is an *awesome* feature. The question is: can we use this
in the browser JavaScript world? Because if we could, just *imagine* how easy it
would be to organize our JavaScript!

And yes! We can totally get it working... otherwise this would be a really short
tutorial.

But first, a little bit of cleanup: open `app/Resources/views/lift/index.html.twig`:

[[[ code('09420d7b25') ]]]

This is the template for the main page. And at the end of the last tutorial, we
used a library called Babel to "transpile" our source `RepLogApp.js` into a `dist/RepLogApp.js`
file. We *are* going to use Babel again, but for now, delete the `dist` file. Then,
point our page back to the source `RepLogApp.js`:

[[[ code('68c760619c') ]]]

This file contains two classes: `RepLogApp` and, near the bottom, another called
`Helper`:

[[[ code('3aa5998b63') ]]]

Hey! For organization, let's move this class into its own file. In that
same directory, create a new `RepLogAppHelper.js` file. I'll add the `'use strict';`
on top and then paste the class:

[[[ code('288fae20a3') ]]]

At the bottom, add `module.exports = Helper`:

[[[ code('1976cc9357') ]]]

You can export anything you want from a module - a value, like we did earlier -
a class, a function, an object - whatever!

Back in `RepLogApp.js`, now that the `Helper` class is gone... well, we're not
going to have a good time. On line 10, PhpStorm is giving me a cryptic error:
element is not exported... a funny way of saying "Variable undefined"!

Fix this: at the top, add `const Helper = require('./RepLogAppHelper')`:

[[[ code('abdc01eb32') ]]]

My editor is happy!

Based on what we saw in Node... this should just work! Back in my browser, I'll
open the console and then, refresh. Yep, we somehow *knew* life wouldn't be so simple.
We get an error:

> require is not defined

Here's the deal: the `require()` function does not work in any browser. And it's not
that browsers are behind... it's just not *possible* to make it work!

Think about it: in PHP, when we use the `require` statement, we're reading a file
from our file system... which is basically instant. But on the web, a browser would
need to go *download* that file. Imagine if we waited while it downloaded this file...
then this file required 5 other files.... so we waited for those... then those files
required 10 *other* files... so we finally decide to go have lunch while the web page
loads. It just doesn't work!

Enter Webpack.


[modern_javascript]: https://knpuniversity.com/tracks/javascript#modern-javascript
