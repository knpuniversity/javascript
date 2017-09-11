# ES6 import & export

When it comes to using `require()` and `module.exports`, well, we *rock*. So now...
let's completely change things! Woohoo!

Let me tell you a story of bravery, cunning and JavaScript... simplified to fit into
20 seconds. `require()` and `module.exports` basically come from Node.js. They're not
part of ECMAScript - so not officially part of the JavaScript language. But, if you're
in Node, you know that these are available to use.

Node did this because... well... there was *no* module system in ECMAScript. So they
invented `require()` and `module.exports` to fit their needs... and rescue the princess.
But, guess what!? In ES6... there now *is* a module system! It uses two new keywords:
`import` and `banana`, I mean `export`.

## Hello import

Webpack supports the original `require()` and `module.exports` and the ES6 syntax.
But, `import` and `export` have a few subtle advantages... other than being newer
and shinier.

But mostly, they work the same! Instead of `const _ = require()`, say
`import _ from 'lodash'`:

[[[ code('bb894700cd') ]]]

When we do, Webpack is still happy... *and* our app still works!

## Named Imports

Takeaway number 1 is: `import` and `require()` basically do the same thing. But `import`
has one special power: the ability to import just *one* part of a module. We know
that `lodash` actually exports an object with many keys on it... `random` is one
of them... which is why we can say `_.random()`.

Instead of importing *everything*, you can instead say `import { random } from 'lodash'`:

[[[ code('79062cf525') ]]]

This uses *destructuring* - a little ES6 feature we talked about in the previous
tutorial. Since `lodash` returns an object with a `random` key on it, this syntax
sets a new variable called `random` to that value.

Of course, we're *not* importing an `_` variable anymore. So, search for `_.random()`
and replace this with just `random()`:

[[[ code('874c05331c') ]]]

Great! And yea... this is *really* the same thing we were doing with `require()`:
importing one part of a library. But... stay tuned!

Our app still works... but we have a problem! Our file size! It was 1.3Mb before,
but with import, it's much bigger! This makes sense: `import` loads *everything*
from `lodash`... even if we only *use* the `random` key on it.

## Tree Shaking, import & require

But, dream with me for a moment. What if Webpack were *so* smart that it *knew*
we were only using this *one* key... and it removed the rest of the code from
the built file. That would be awesomesauce! Oh, and I have the perfect name for this
imaginary feature: tree shaking! Yea, because it would be like Webpack was "shaking"
our JS and allowing all unused modules to "fall off"!

Wait what? It does exist? It *is* called tree shaking? Ok, apparently Webpack can
do this tree shaking thing already! And this is where `import` starts to get really
interesting.

When you `require()` something, that entire module is included. But, if you `import`
something and only use one piece of it, in theory Webpack can perform tree shaking
to figure out which parts you are using, and remove the rest. But... you'll notice
that... well, this does not appear to be happening! The file size is too big!

At the time of this recording, the latest Webpack - version 3.5 - seems to not
do tree shaking perfectly. It works in some cases, but not others - and there's
a lot of conflicting info about this. But, I expect it to work better in the future.
And by using `import` instead of `require()`, we're opting into tree shaking... if
and when it works.

But for now, I *do* want a smaller file size. And since tree shaking isn't helping,
update the line to `import random from 'lodash/random`:

[[[ code('4696ed244d') ]]]

That's effectively the same thing we had before with `require()`.

## Using import Everywhere!

Let's change the rest of our code to use `import`! Since this is a chore, I'll
speed through part of this. For the CSS, we don't need the value it imports. So,
just say `import` then the filename:

[[[ code('9ada8439c3') ]]]

Keep going: inside `rep_log.js`, change `require()` to `import`:

[[[ code('22ccdc2016') ]]]

And then in `login.js`:

[[[ code('9edd077848') ]]]

And finally `layout.js`:

[[[ code('bc12b41e28') ]]]

After *all* that... Webpack is still happy! The page still works... and our code
is trendier than ever!

## Using export

What about *exporting* values? At the bottom of `RepLogApp`, change `module.exports`
to `export default RepLogApp`:

[[[ code('528ba9c3ac') ]]]

Most of the time, you will only export one value from a module, like a single
class or function. In these cases, use `export default`. Repeat this in
`RepLogAppHelper`: `export default Helper`:

[[[ code('d862c682d7') ]]]

And in `Routing.js`: `export default window.Routing`:

[[[ code('8e1950bf61') ]]]

In some cases, you might have a module that exports *multiple* things, like two
functions. In that case, you could say `export function foo() {}` and also
`export function bar() {}`:

```javascript
// ...
export function foo() {};
export function bar() {};
```

Instead of exporting a `default`, you're using *named* exports: you're exporting
`foo` and `bar`.

When you do this, the `import` changes a bit to `import { foo, bar } from`:

```javascript
import { foo, bar } from './cool_functions';
```

We use destructuring to grab whatever *named* exports we want.

It can look a little confusing at first. Fortunately, most of the time, you'll
probably export a single, `default` value and import it like we are. But keep
this in mind.

Next! Let's fix a *big* problem we've been ignoring... the fact that jQuery is packaged
inside *every* individual built file. Oof, wasteful!
