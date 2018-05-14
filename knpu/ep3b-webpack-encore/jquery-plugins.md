# jQuery Plugins / Bootstrap

Now that Webpack is handling `layout.js`, let's simplify it! Remove the self-executing
function. And, of course, add `const $ = require('jquery')`:

[[[ code('410e7007dd') ]]]

Perfect, right? Well... we're in for a surprise! Go back to the main page and...
refresh! Bah!

> `tooltip` is not a function

Uh oh! The `tooltip` function comes from Bootstrap... and if you look in our base
layout, yea! We *are* including jQuery and then Bootstrap:

[[[ code('66fb67a3b5') ]]]

Which *should* add this function to jQuery!

## Trouble with jQuery Plugins

But be careful: this is where Webpack can get tricky! Internally, the Bootstrap
JavaScript *expects* there to be a *global* `jQuery` variable that it can add the
`tooltip()` function to. And there *is* a global jQuery variable! It's *this* jQuery
that's included in the layout. So, Bootstrap adds `.tooltip()` to *that* jQuery object.

But, in `layout.js`, when we `require('jquery')`:

[[[ code('09508c659c') ]]]

This imports an entirely *different* jQuery object... and this one does *not* have
the tooltip function!

To say this in a different way, if you look at *just* this file, we are *not* requiring
bootstrap... so it should be no surprise that bootstrap hasn't been able to add
its `tooltip()` function! What's the fix? Require Bootstrap!

Find your open terminal and run:

```terminal
yarn add bootstrap@3 --dev
```

Bootstrap 4 just came out, but our app is built on Bootstrap 3. Now that it's
installed, go back and add: `require('bootstrap')`:

[[[ code('1f5475d872') ]]]

And... that's it! Well, there *is* one strange thing... and it's really common
for jQuery plugins: when you require bootstrap, it doesn't *return* anything. Nope,
its whole job is to *modify* jQuery... not return something.

Now that it's fixed, go back and... refresh! What! The *same* error!!! *This*
is where things get *really* interesting.

At this point, we're no longer using the global jQuery variable or Bootstrap
JavaScript anywhere: *all* of our code *now* uses proper require statements. To
celebrate, remove the two script tags from the base layout:

[[[ code('8fab73a2a3') ]]]

And now... refresh!

Fascinating! 

> `jQuery` is not defined

And it's coming from inside of Bootstrap!

Ah, ha! When we require `bootstrap`, internally in that file, *it* looks for a
*global* variable called `jQuery` and then modifies it. But when you *require*
`jquery`, it does *not* create a global variable: it just returns a value. And
now that there is *no* global `jQuery` variable available, it fails! This is a
*really* common situation for jQuery plugins... and there's a great fix. Actually,
there are *two* ways to fix it... but only one good one.

The *ugly* fix is to say `window.jQuery = $`:

[[[ code('1b5ae89121') ]]]

Try it! Go back and refresh! All better. Yep, we just *made* a global variable...
so that when we require `bootstrap`, it uses it. But... come on! We're trying to
*remove* global variables from our code - not re-add them!

[[[ code('dd96e5ce71') ]]]

So here's the better solution: go to `webpack.config.js` and add `autoProvidejQuery()`:

[[[ code('bafaebee27') ]]]

That's it. Find your terminal and restart Webpack:

```terminal-silent
yarn run encore dev --watch
```

And... refresh! Yes! It *works*! But... what the heck just happened? You've just
experienced a *crazy* super power of Webpack. Thanks to `autoProvidejQuery()`,
whenever Webpack finds a module that references an uninitialized global `jQuery`
variable - yep, Webpack is *smart* enough to know this:

```javascript
// node_modules/bootstrap/.../bootstrap.js

function ($) {
	// ...
} (jQuery)
```

It *rewrites* that code to `require('jquery')`:

```javascript
// node_modules/bootstrap/.../bootstrap.js

function ($) {
	// ...
} (require('jquery'))
```

Yea... it basically *rewrites* the code so that it's written correctly! And so suddenly,
Bootstrap requires the *same* `jquery` instance that *we're* using! This makes jQuery
plugins work beautifully.

***TIP
Not *all* jQuery plugins have this problem: some *do* behave properly out-fo-the-box.
***

## Handling Legacy Template Code

Oh, but there's one other jQuery legacy situation I want to mention. If you're upgrading
an existing app to Webpack, then you might not be able to move all of your JavaScript
out of your templates at once. And that JavaScript *probably* needs jQuery. Here's
my recommendation: remove jQuery from the base layout like we've already done. But
then, in your `layout.js` file, require `jquery` and add: `global.$ = $`.

```javascript
// ...
const $ = require('jquery');
global.$ = $;
require('bootstrap');
// ...
```

This `global` variable is special to Webpack - well... it's technically a Node
thing, but that's not important. The point is, when you do this, it creates a
*global* `$` variable, which means that any JavaScript in your templates will be
able to use it - as long as you make sure your code is included *after* your
`layout.js` script tag.

Later, you should *totally* remove this when your code is refactored. But, it's
a nice helper for upgrading.

Next, let's talk about how CSS fits into all of this!
