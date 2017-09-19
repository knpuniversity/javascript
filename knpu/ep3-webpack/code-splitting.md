# Code Splitting

Go to the login page. If you type a *really* long username, we yell at you! Yes,
we value brevity!

Look at the code behind this: `assets/js/login.js`. If the length is longer than
20, we add the warning:

[[[ code('94de2a0f33') ]]]

## Code Splitting?

Guess what? Webpack comes with an absolutely *killer* feature... and I've been
keeping it a secret! No more! For this to make sense, I want you to pretend that
the code that adds the long username warning is really, really big. I literally
mean, imagine the code inside the `if` statement is *many* lines... instead of just
two.

In this situation, it's *really* wasteful to force the user to download all that
extra JavaScript... just in *case* they *ever* type a long username! 

In my perfect world, these two lines - or these *many* lines, in our imaginary
situation - would *only* be downloaded by the user if and when they type a long
username. Yes, I want to *lazily* load parts of our JavaScript!

With Webpack, this is possible! It's called "code splitting".

## Refactoring to a Module

To use code splitting, you first need to move the conditional code to a new module.
In the `Components/` directory, create a new file called `username_validation_error.js`.
Export a default function with a `$usernameInput` argument:

[[[ code('e3b0301dc9') ]]]

I'll move the two lines from `login.js` over to this new function. And I'll change
`$(this)` to `$usernameInput`:

[[[ code('7b77813409') ]]]

To use the new module, back in `login.js`, add `import username_validation_error`
from `./Components/username_validation_error`:

[[[ code('34ba8cd05d') ]]]

And below, just, `username_validation_error($(this))`:

[[[ code('7c2aef2f19') ]]]

Let's also log the imported module... which should be a function:

[[[ code('136b46812a') ]]]

Oh, and make sure you have `Components` in your import!

[[[ code('55c86780ea') ]]]

Over in my Webpack tab, once I finished, Webpack was happy. Refresh the login page
and... yep! It still works. Code refactoring complete!

## Using the delayed import()

To add code splitting, Webpack has two syntaxes... and both work the same. The
first is called `require.ensure()`:

```javascript
require.ensure(['./lazy_module'], function (require) {
    const lazyModule = require('./lazy_module');
});
```

The second - the one I want to show you - uses `import`:

```javascript
import('./lazy_module').then(lazyModule => {
    // ...
});
```

Down in the `if` statement, this is the moment when I actually need to load my
`username_validation_error` module. Add `import()` here... but use it like a function.
I'll copy the `./Components/username_validation_error` module path, delete that
import line entirely:

[[[ code('b95a17df9a') ]]]

And pass that as the first argument. When you use `import` like this, it returns
a `Promise`. Hey, we know about those! It means that we can say `.then()` and pass
a callback. The argument will be the imported module. So, `username_validation_error`:

[[[ code('239268839b') ]]]

Move the code inside of the callback:

[[[ code('b8764a97f4') ]]]

Yea... I like this! It feels like... and well.. *is* an AJAX call! We're saying:

> Good afternoon Webpack! Could you please download the `username_validation_error`
> module via AJAX and then execute my callback when it's ready. Thank you!

It should work... but go look at the Webpack terminal. Ah! It's SO angry!

> Module build failed. Syntax error: `import` and `export` may only appear at the
> top level.

## The dynamic import Proposal

Hmm. It's very unhappy about the `import`: it says that this is only allowed to live
at the *top* of the file!

Here's the story: when you use `import` at the top of the file - like we've been
doing until now - we're using a real, official ECMAScript feature - it's in ES6.
But when you use `import()` like a function... well... that's *not* part of ECMAScript!
Well, not yet. That functionality is just a *proposal* called "dynamic import".

The parse error comes from Babel: it tries to parse our code, but sees this code
as invalid. And technically, it's right! 

## Making Babel like dynamic imports

So here's the plan: we need to *teach* Babel that this syntax is valid... but not
to do anything with it. I mean, it should *not* have an error, and it should leave
the `import()` function there so *Webpack* can parse it.

Doing this is *easy*: Babel is *super* configurable. In our open terminal, run:

```terminal
yarn add babel-plugin-syntax-dynamic-import --dev
```

This is a plugin for Babel that makes it understand the dynamic import syntax.

Once it's installed, to activate it, open your `.babelrc` file. In addition to
`presets`, the other common thing you'll add here is `plugins`. Pass it one:
`syntax-dynamic-import`:

[[[ code('cae1a7e221') ]]]

Now, Babel will at least understand this as a valid syntax.

Go back to the terminal that's running Webpack and restart it... just to be safe:

```terminal
yarn watch
```

Yes! It's happy! Back in the browser, bring up the network tab and refresh. Ok, I'll
clear this out. Now, type a really long username.

Woh! Check it out! I don't see the error message... but it *did* make an AJAX request
for a script tag! And look inside! Yea! This is our code-split module!

## Using the .default Key

Great! Except... for the fact that it didn't work! Check out the console. Above the
errors, remember, we logged the module. But... it's not a function! What!? It's an
object... with a key called `default`... and *that* is the function!

This is a gotcha with code splitting. When you export things as `default`, the module
will *actually* live on a `default` key! No big deal: to get things to work, say
`username_validation_error.default()`:

[[[ code('f546be14d2') ]]]

Refresh again! Type a long username... and... woohoo! There's our warning! And
it was loaded via an AJAX call. Hello code splitting. And though it looks really
fast, in a real app, you may want to add a loading animation... like with any other
AJAX call.

## Code Splitting CSS

And, I have more good news! You can *also* code split CSS! Open `login.css`. At the
bottom, yep, this *last* CSS rule only exists to style the warning box:

[[[ code('e1acdfc266') ]]]

Just like with our JavaScript, it's wasteful to make the user download this...
when they might not need it!

Remove that CSS and create a new file: `css/login-username-error.css`. Paste
it here:

[[[ code('5751731a6c') ]]]

Now, inside `username_validation_error.js`, that CSS is really a dependency of *this*
module. So, add `import '../../css/login-username-error.css`:

[[[ code('c22c3cbafb') ]]]

When we refresh now, `login.css` does *not* contain that extra code. Yep, we've made
that file slightly smaller. But when we try a really long username... it works! Look
at the downloaded JavaScript file. Yes! It *contains* the CSS, down at the bottom.

When the JS file loads, the CSS is being injected onto the page via a traditional
style tag. Well, it's a weird blob actually... but conceptually, this is a `style`
tag with that CSS.

Oh, remember the `extract-text-webpack-plugin`?

[[[ code('afce0052da') ]]]

Well, by default, it does *not* extract any CSS that has been code split. Nope,
any code-split CSS is instead passed to the `fallback` loader: `style-loader`.
In other words, code-split CSS is packaged into JavaScript and added to the page
when that JavaScript file is downloaded.

So next time you have some conditional code... think about code splitting: you could
drastically reduce the size of your assets!

Speaking of that, let's use a *visualizer* to make our assets even *more* efficient.
