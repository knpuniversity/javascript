# Polyfills: fetch & Promise

The `fetch()` function is built into all modern browsers... which is cool because
we didn't need to install *any* outside libraries to make AJAX requests. Yay! Except...
what about older browsers? I'm looking at you IE! Google for "caniuse fetch". 

The *good* news is that `fetch()` is *almost* universal... ahem, IE 11. So... you
might be ok to do nothing! But, for the rest of us that *do* have a few users on
IE, yea, using `fetch()` will be a problem. But, a problem we can fix!

When we use new JavaScript syntaxes - like the arrow function - behind the scenes,
Babel *transpiles* - basically *rewrites* - that code into old, boring syntax that
all browsers support. So, that's already handled. But, when there is a totally
new *feature*, like `fetch()`, Babel doesn't handle that. Instead, you need a
polyfill: a fancy word for a library that *adds* a feature if it's missing.

## The fetch Polyfill

Google for "fetch polyfill" to find a library from GitHub. Scroll down to find
the library name: `whatwg-fetch`. Copy that, find your open terminal and:

```terminal
yarn add whatwg-fetch --dev
```

To use a JavaScript polyfill, all *we* need to do is import the file. Internally,
*it* will figure out whether or not the current browser has the feature, like
the global `fetch()` function. If it does *not*, it will add it.

Super easy! To make sure `fetch()` is available everywhere, we can import it from
our entry file: `rep_log_react.js`. Then, it will *definitely* be available in
`rep_log_api.js`. But... I like to get *even* crazier! Open `layout.js`. Then
look inside `webpack.config.js`. `layout` is configured as my "shared" entry...
which is a fancy way of saying that `layout.js` is included on *every* page and
so its code will *always* run. Inside that file, `import 'whatwg-fetch'`.

[[[ code('a0156b7dc8') ]]]

*Every* part of my app can now safely rely on the fact that the global `fetch()`
function will be available.

Oh, and because I *love* digging in to see how things work, let's go check out the
polyfill code! Open `node_modules`, search for `whatwg`, expand its directory and open
`fetch.js`. *This* is the file we just imported.

Look *all* the way at the bottom: it's a self-executing function. It passes `this`
into the function, which in a browser environment, is the global `window` object.
Then, on top, that `window` object is passed as a `self`. And because all global
variables & functions are actually *properties* on the `window` object, it's able
to ask:

> Hey! Does the window variable have the global `fetch()` function on it?

If it does, it just returns. If it does not, the rest of this code works to define
and add it. There it is: `self.fetch =`. This is a polyfill in action - kinda cool.

## The Promise Polyfill

Go back to the `fetch` polyfill docs. Ah, it says that we *also* need to use a
`Promise` polyfill for older browsers. We can *literally* see this inside of the
`fetch` polyfill: it assumes that a `Promise` class is available.

Let's polyfill it to be safe: click into the library they recommend. Cool: copy the
name, move over, and:

```terminal
yarn add promise-polyfill --dev
```

When it finishes, head back to the docs. Interesting: this shows two different
import options. You can use the *second* one to *import* a `Promise` object, but
*without* adding a new global variable. Because we *do* want to guarantee that a
global `Promise` variable exists, copy the first one. In `layout.js`, paste!

[[[ code('2a93188a94') ]]]

To make sure we didn't break anything, go back to the tab that's running encore
and restart it:

```terminal-silent
yarn run encore dev-server
```

Perfect! We now support older browsers... ahem, IE.
