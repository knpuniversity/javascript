# Babel: Transpiling to Old JavaScript

Time to use Babel! How? At your terminal, type

```terminal
./node_modules/.bin/babel
```

***TIP
On some systems, you may need to type:

```terminal
node ./node_modules/.bin/babel
```
***

That is the path to the executable for Babel. Next, point to our source file:
`web/assets/js/RepLogApp.js` and then pass `-o` and the path to where the final,
compiled, output file should live: `web/assets/dist/RepLogApp.js`.

Before you run that, go into `web/assets`, and create that new `dist/` directory.
Now, hold your breath and... run that command!

```terminal
./node_modules/.bin/babel web/assets/js/RepLogApp.js -o web/assets/dist/RepLogApp.js
```

And boom! Suddenly, we have a new `RepLogApp.js` file.

Before we look at it, go into `index.html.twig` and update the `script` tag to
point to the new `dist` version of `RepLogApp.js` that Babel just created:

[[[ code('975981b427') ]]]

Ok, refresh! It still works!

So what did Babel do? What are the differences between those two files? Let's find out!
Open the new file:

[[[ code('2e7810d2ec') ]]]

Hmm, it actually doesn't look *any* different. And, that's right! To prove it, use the
`diff` utility to compare the files:

```terminal
diff -u web/assets/js/RepLogApp.js web/assets/dist/RepLogApp.js
```

Wait, so there are *some* differences... but they're superficial: just a few space
differences here and there. Babel did *not* actually convert the code to the *old*
JavaScript format! We can still see the arrow functions!

Here's the reason. As crazy as it sounds, by default, Babel does... nothing! Babel is
called a *transpiler*, which other than being a cool word, means that it reads source
code and converts it to other source code. In this case, it parses JavaScript, makes
some changes to it, and outputs JavaScript. Except that... out-of-the-box, Babel
doesn't actually make *any* changes!

## Adding babel-preset-env

We need a little bit of configuration to tell Babel to do the ES2015 to ES5 transformation.
In other words, to turn our new JavaScript into old JavaScript.

And they mention it right on the installation page! At the bottom, they tell you
that you probably need something called `babel-preset-env`. In Babel language, a
*preset* is a transformation. If we want Babel to make the ES2015 transformation,
we need to install a *preset* that does that. The `env` preset is one that does that.
And there are *other* presets, like CoffeeScript, ActionScript and one for ReactJS
that we'll cover in the future!

Let's install the preset with yarn:

```terminal
yarn add babel-preset-env --dev
```

Perfect! To tell Babel to use that preset, at the root of the project, create a
`.babelrc` file. Babel will automatically read this configuration file, as long
as we execute Babel from this directory. Inside, add `"presets": ["env"]`:

[[[ code('c93f265d49') ]]]

This comes straight from the docs. And... we're done!

Try the command again! Run that diff command now:

```terminal
./node_modules/.bin/babel web/assets/js/RepLogApp.js -o web/assets/dist/RepLogApp.js
diff -u web/assets/js/RepLogApp.js web/assets/dist/RepLogApp.js
```

Woh! Now there are *big* differences! In fact, it looks like almost *every* line
changed. Let's go look at the new `RepLogApp.js` file in `dist/` - it's really interesting.

Cool! First, Babel adds a few utility functions at the top:

[[[ code('0557bea223') ]]]

Below, instead of using the new class syntax, it calls one of those functions -
`_createClass()` - which helps to mimic that new functionality:

[[[ code('d19e7ca702') ]]]

Our arrow functions are also gone, replaced with classic anonymous functions.

There's a lot of cool, but complex stuff happening here. And fortunately, we don't
need to worry about any of this! It just works! Now, even an older browser can enjoy
our awesome, *new* code.

***TIP
The purpose of the `babel-preset-env` is for you to configure exactly *what* versions
of what browsers you need to support. It then takes care of converting everything
necessary for those browsers.
***

## Babel and the Polyfill

But wait... it did *not* change our `WeakMap`!

[[[ code('2ecc78e806') ]]]

But... isn't that only available in ES2015? Yep! Babel's job is to convert all
the new language constructs and syntaxes to the old version. But if there are
new objects or functions, it leaves those. Instead, you should use something called
a polyfill. Specifically, `babel-polyfill`. This is another JavaScript library that
adds missing functionality, like `WeakMap`, if it doesn't exist in whatever browser
is running our code.

We actually did something *just* like this in the first episode. Remember when we
were playing with the `Promise` object? Guess what? That object is only available
in ES2015. To prevent browser issues, we used a polyfill.

To use *this* Polyfill correctly, we need to go a little bit further and learn about
Webpack. That's the topic of our next tutorial... where we're going to take a *huge*
step forward with how we write JavaScript. With webpack, we'll be able to do cool
stuff like importing JavaScript files from inside of each other:

```js
// actually imports code from helper.js!
import myHelperFunctions from './helper';

myHelperFunctions.now();
```

Heck, you can even import CSS from inside of JavaScript. It's bananas.

Ok guys! I hope you learned tons about ES2015/ES6/Harmony/Larry! You can already
start using it by using Babel. Or, if your users all have brand-new browsers, then
lucky you!

All right guys, I'll seeya next time.
