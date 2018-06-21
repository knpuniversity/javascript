# JSX

This system of creating a "virtual DOM", or "tree" of React element objects and
rendering that to the page is a really cool idea. But, it's already a total pain:
imagine if we needed another `React.createElement()` inside of the `span`... then
another element inside of that. Woof.

Because the React element objects are *meant* to represent HTML elements... it would
be kinda cool if, instead, we could *actually* write HTML right here! Like, for
example, what if we could say `const el = ` then write an `h2` tag with `Lift Stuff!`
and add a `span` tag inside with a heart. I mean, that's *exactly* what we're
ultimately building with `React.createElement()`!

[[[ code('7b754f7699') ]]]

But, of course, this is *not* real JavaScript code: it's just me hacking HTML right
into the middle of my JavaScript file. So, no surprise: PhpStorm is *so* angry with
me. And, if you move back to the terminal tab that is running Webpack, oh, it's
*furious*: Unexpected Token.

## JSX & The Babel React Preset

Well... fun fact! This crazy HTML syntax *is* actually valid. Well, it's not official
JavaScript: it's something called JSX - an *extension* to JavaScript. To use it,
all *we* need to do is teach Babel how to parse it. Remember, Babel is the tool
that reads our JavaScript and "transpiles" it, or "rewrites" it, into older
JavaScript that all browsers can understand.

To teach it how to parse JSX, open your `webpack.config.js` file. In normal Webpack,
you need to install and enable a React Babel *preset*: a rule that understands
JSX. In Encore, you can do this by adding `.enableReactPreset()`.

[[[ code('d892a6d0e8') ]]]

To make this take affect, go stop Encore and restart it:

```terminal-silent
yarn run encore dev --watch
```

Oh, it fails! Ah, we need to install a new package: copy the command name. Then,
paste:

```terminal
yarn add babel-preset-react --dev
```

By the way, the next version of this package will be called `@babel/preset-react`.
So, if you see that package name in the future, don't worry, it's really the same
thing.

And... done! Try Encore again:

```terminal-silent
yarn run encore dev --watch
```

Bah! It fails again - but this is my fault: I forgot to remove my extra `el`
constant. After removing that, *yea*! Encore builds successfully! This means
that it *actually* understands our crazy JSX code! Try it - move to your browser
and refresh!

[[[ code('bc5c6ae0d6') ]]]

## JSX Vs React.createElement()

We get the *exact* same output as before! An `h2` with a `span` inside. Now, here's
the *really* important part. Just like before, we're using `console.log()` to print
this `el`. Check this out in the browser - woh! It's a React element object! It's
the *exact* same thing we had before!

This special syntax - JSX - allows you to write, what *looks like* HTML right
inside JavaScript. But in reality, Babel translates this into `React.createElement()`
calls: this JSX *generates* the `React.createElement()` code we had before!

Hey, we solved our problem! We found a *much* prettier and more convenient way to
use the React element system.

## Making PhpStorm *also* Love JSX

Except... PhpStorm still *hates* me for using this. But, you can already see on top
that it's asking us if we want to switch our language to support JSX. You can make
the change there, or go to PhpStorm -> Preferences and search for "JSX". Under
Languages & Frameworks, find JavaScript and change the language version to "React JSX".

Hit ok and... boom! PhpStorm is happy!

From now on, we will *exclusively* use JSX. But, don't forget what it really is!
Just a fancy way of creating React element objects. Remembering this fact will help
you understand React as things get more complex.

## Adding the ESLint React Plugin

A few minutes ago, we installed & setup the `eslint` package. And now that we're
using React, we can activate some *new* ESLint rules that will give us all kinds
of cool notices and warnings that are specific to developing in React.

To install these new ESLint rules, move over to your terminal, find your open tab
and run:

```terminal
yarn add eslint-plugin-react --dev
```

Once that finishes, open the `.eslintrc.js` file. To use the rules from this package,
update the `extends` option to have `plugin:react/recommended`.

You won't notice anything immediately, but as we keep developing in React, I'll
point out the warnings that come from this.

Ok, we've learned how to create & render React element objects. But to *really*
use React, we need to talk about React components.
