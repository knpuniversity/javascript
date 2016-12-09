# Extending the Prototype

From now on, we'll pretty much be adding *everything* to the `prototype` key. But,
it *does* get a little bit annoying to always need to say `Helper.prototype.something =`
for every method.

We can shorten this with a shortcut that's similar to PHP's `array_merge()` function.
Use `$.extend()` and pass it `Helper.prototype` and then a second object containing
all of the properties you want to merge into that object. In other words, move our
`calculateTotalWeight()` function into this and update it to be
`calculateTotalWeight: function`. At the bottom, we don't need the semicolon anymore.
If we had more properties, we'd add them right below `calculateTotalWeight`: no need
to worry about writing `prototype` every time.

There's nothing special about `$.extend`, it's just a handy `array_merge`-esque
function that we have available. You may see other functions from other libraries
used to do the exact same thing.

## Making RepLogApp an Instantiatable Object

With this trick, it's *so* easy to make `RepLogApp` and instantiatable object.
First, set `RepLogApp` itself to the former `initialize()` function. Constructor
done! Then, I'll un-indent everything and finish it with a semicolon.

Next, add `$.extend()` with `window.RepLogApp.prototype` with `{`. The existing keys
fit right into this perfectly! Winning! At the end, add an extra `)`.

Yay! In our template, we *won't* use `RepLogApp` like this anymore. Instead, say
`var repLogApp = new RepLogApp($table)`. We won't call any methods on that new
`repLogApp` variable, but we could if we wanted to. We could also create *multiple*
`RepLogApp` objects if we had multiple tables on this page, or loaded a table via
AJAX. Our JavaScript is starting to be controlled!
