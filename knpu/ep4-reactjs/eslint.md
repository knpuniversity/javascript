# The World of React + ESLint

Hey friends! And welcome! Oh, I am *so* excited to talk about React. Developing
in React *feels* great, and it's powerful! You can build *any* crazy frontend you
want. But, honestly, writing this tutorial was a *huge* pain. Technically speaking,
React is not hard. But, to *even* get started, you need to be comfortable with ES6
features *and* you need a build system, like Webpack Encore. That's why we covered
both of those topics in previous tutorials.

But even then! The best practices around React are basically non-existent, especially
for a backend developer, who instead of building a single page app, may just want
to use React to power part of their frontend.

So our goal in this tutorial is clear: to *master* React, but *also* learn
repeatable patterns you can follow to write high-quality code *while* getting your
wonderful new app finished, and out the door. We won't hide anything: we'll attack
the ugliest stuff and, as always, build something *real*.

Excited? Me too! And, a *huge* thanks to my co-author on this tutorial Frank de Jonge,
who helped me navigate many of these important topics.

## Project Setup

If you'd like free high-fives from Frank... *or* if you want to get the most out
of this tutorial, you should *totally* code along with me. Download the course
code from this page. When you unzip it, you'll find a `start/` directory inside
that holds the same code that you see here. Open up the `README.md` file for
winning lottery numbers and instructions on how to get the project setup.

The last steps will be to open a terminal, move into the project, and run:

```terminal
php bin/console server:run
```

to start the built-in web server. Our project already uses Webpack Encore to compile
its CSS and JS files. If you're new to Webpack or Encore, go watch our tutorial on
that first. 

To build those assets, pour some coffee, open a *second* terminal tab, and run:

```terminal
yarn install
```

to download our Node dependencies. And... once that finishes:

```terminal
yarn run encore dev --watch
```

That will *build* our assets, and *rebuild* when we change files.

Ok cool! Let's go check out the app: find your browser, go to http://localhost:8000
and say hello to the Lift Stuff App! Login with user `ron_furgandy` password
`pumpup`.

In our effort to stay in shape... while sitting down and coding all day... we've
built Lift Stuff: an app where we can record *all* the stuff we've lifted throughout
the day. For example, before I started recording, I lifted my big fat cat 10 times...
so let's totally log that!

In the previous tutorials, we built this JavaScript frontend using plain JavaScript
and jQuery. In this tutorial, we'll re-build it with React.

## Installing ESLint

But before we dive into React, I want to install another library that will make
life *much* more interesting. Move back to your terminal, open a *third* terminal
tab - we're getting greedy - and run:

```terminal
yarn add eslint --dev
```

ESLint is a library that can detect coding standard violations in your JavaScript.
We have similar tools in PHP, like PHP-CS-Fixer. To configure exactly *which* coding
standard rules we want to follow, back in our editor, create a new file at the
root of the project: `.eslintrc.js`.

I'll paste in some basic configuration here: you can copy this from the code block
on this page. We won't talk about ESLint in detail, but this basically imports the
ESLint recommended settings with a couple of tweaks. This `jsx` part is something
we'll see *very* soon in React.

[[[ code('92dfd50c94') ]]]

Thanks to this, we can now run a utility to check our code:

```terminal
./node_modules/.bin/eslint assets
```

where `assets/` is the directory that holds our existing JavaScript code. And...
aw, boring! It looks like *all* of our code already follows the rules.

This utility is nice... but there's a more important reason we installed it. In
PhpStorm, open the settings and search for `eslint` to find an ESLint section.
Click to Enable this and hit Ok. Yep, PhpStorm will now *instantly* tell us when
we've written code that violates our rules.

Check this out: open `assets/js/rep_log.js`: this is the file that runs our existing
LiftStuff frontend. Here, add `const foo = true` then `if (foo)`, but leave the
body of the `if` statement empty. See that little red error? That comes from
ESLint.

This may not *seem* very important, but it's going to be *super* helpful with React.

## Adding a new Entry

As I mentioned, our app is already built in normal JavaScript. Instead of deleting
our old code immediately, let's leave it here and build our React version right next
to it. In the same directory as `rep_log.js`, which holds the old code, create a
new file: `rep_log_react.js`. Log a top-secret, important message inside so that
we can see if it's working. Don't forget the Emoji!

[[[ code('ce3eb62184') ]]]

Now, open `webpack.config.js`: we're going to configure this as a new "entry".
Typically, you have one entry file per page, and that file holds *all* of the
JavaScript you need for that page. Use `addEntry('rep_log_react')` pointing to
that file: `./assets/js/rep_log_react.js`.

[[[ code('da952420e2') ]]]

To build this, go back to your terminal, find the tab that is running Webpack
Encore, press Ctrl+C to stop it, and run it again: you need to restart Webpack
whenever you change its config file.

Finally, to add the new JavaScript file to our page, open
`templates/lift/index.html.twig`, find the `javascripts` block, and add the
script tag for `rep_log_react.js`. You don't normally want *two* entry files
on the same page like this. But when we finish, I plan to delete the old `rep_log.js`
file.

And just like that, we can find our browser, open the dev tools, go to the console,
refresh and... Hello World!

Now, it's time to go say Hello to React!
