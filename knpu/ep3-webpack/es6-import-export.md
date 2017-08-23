# ES6 import & export

When it comes to using `require`, or `module.exports` to export a value from a module,
well, we *rock*. So now... let's completely change things!

To simplify the history of things, `require` and `module.exports` basically come
from Node.js. They're not part of ECMAScript - so not officially part of the JavaScript
language - but you know that if you're in Node, these are available to use.

Node did this because... well... there was *no* module system in ECMAScript. So they
invented `require` and `module.exports` to fit their needs. But, guess what!? In
ES6... there *is* a module system in JavaScript! It uses two new keywords: `import`
and `export`.

## Hello import

Webpack supports both... but `import` and `export` have a few subtle advantages...
other than being the newer, shinier thing.

But mostly, they work the same. Instead of `const _ = require()`, we can say
`import _ from 'lodash'`.

When we do, Webpack is still happy... *and* our app still works!

## Named Imports

So `import` and `require` basically do the same thing. But `import` has one special
power: the ability to import just *one* part of a module. We know that `lodash`
actually exports an object with many keys on it... `random` is one of them, which
is why we can say `_.random()`.

Instead of importing *everything*, you can instead say `import { random } from 'lodash'`.
This uses something called *destructuring* - a little ES6 feature we talked about
in the previous tutorial. Since `lodash` returns an object with a `random` key on
it, this syntax sets a new variable called `random` to that value.

Of course, we're *not* importing an `_` variable anymore. So, search for `_.random`
and replace this with just `random()`.

Great! And yea... this is *really* still the same thing we were doing with `require`
before: importing one part of a library. But... stay tuned!

Our app still works... but we have a problem: our file size! It was 1.32 mb before,
but with import, it's much bigger! This makes some sense: `import` loads *everything*
from `lodash`... even if we only *use* the `random` key on it.

## Tree Shaking, import & require

But, dream with me for a moment. What if Webpack were *so* smart that it *knew*
were were only using this *one* key... and just removed the rest of the code from
the built file. That would be awesome! Oh, and I have a great name for this imaginary
feature: tree shaking! Yea, because it would be like Webpack was "shaking" our JS
and allowing all unused modules to "fall off"!

Wait what? It does exist? And it *is* called tree shaking? Wow! So, I've just been
informed that Webpack *can* do this! And this is where `import` starts to get really
interesting. 

When you `require` something, that entire module is included. However, if you `import`
something and you only use one piece of it, in theory WebPack should perform tree
shaking to figure out which parts you are using, and remove the rest. But... you'll
notice that... well, it's not actually doing that!

At the time of this recording, the latest Webpack - version 3.5 - seems to not
do tree shaking perfectly. It works in some cases, but not others - and there's
a lot of conflicting info about this. But, I expect it to work better in the future,
and so I *do* want to use `import` instead of `require` so we can take advantage
of this.

But for now, I need my smaller file size... and tree sharking isn't helping. So,
update our line to `import random from 'lodash/random`. That's effectively the same
thing we had before with `require`.

## Using import Everywhere!

Let's change the rest of our code to use `import`! Since this is a chore, I'll
speed through part of this. For the CSS, we don't actually need that value it imports.
So in this case, just say `import` then the filename.

Keep going inside `rep_log.js`: change `require` to `import`. And then in `login.js`,
and finally `layout.js`.

After *all* that... Webpack is still happy. Amazing! The page still works... and
our code is trendier and more hipster than ever!

## Using export

What about *exporting* values? Well, at the bottom of `RepLogApp`, change `module.exports`
to `export default RepLogApp`. Usually, you will only export one value from a module,
whether that's a class, function or something else. Use `export default` in these
cases. Let's repeat this in `RepLogAppHelper`: `export default Helper`. And in
`Routing.js`: `export default window.Routing`.

In some cases, you might have a module that exports *multiple* things, like two
functions. In that case, you could say `export function foo() {}` and also
`export function bar() {}`. Instead of exporting a `default`, you're using *named*
exports: you're exporting `foo` and `bar`.

When you do this, the `import` changes a bit to `import {foo, bar} from`: we use
destructuring to grab whatever *named* exports we want.

It can look a little confusing at first. Fortunately, most of the time, you'll
probably export a single, `default` value and import it like we are. But keep
this in mind.

Next! Let's fix a *big* problem we've been ignoring... the fact that jQuery is packaged
inside *every* individual built file. Oof, wasteful!
