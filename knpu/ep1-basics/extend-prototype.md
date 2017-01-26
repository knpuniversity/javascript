# Extending the Prototype

From now on, we'll pretty much be adding *everything* to the `prototype` key. But,
it *does* get a little bit annoying to always need to say `Helper.prototype.something =`
for every method:

[[[ code('aa02659375') ]]]

No worries! We can shorten this with a shortcut that's similar to PHP's `array_merge()`
function. Use `$.extend()` and pass it `Helper.prototype` and then a second object
containing all of the properties you want to merge into that object. In other words,
move our `calculateTotalWeight()` function into this and update it to be
`calculateTotalWeight: function`:

[[[ code('c249b8b8cf') ]]]

At the bottom, we don't need the semicolon anymore. If we had more properties, we'd add
them right below `calculateTotalWeight`: no need to worry about writing `prototype`
every time.

There's nothing special about `$.extend`, it's just a handy `array_merge`-esque
function that we happen to have handy. You may see other functions from other libraries
that do the same thing.

## Making RepLogApp an Instantiatable Object

With this trick, it's *super* easy to make `RepLogApp` an instantiatable object.
First, set `RepLogApp` itself to the former `initialize()` function. I'll un-indent
everything and finish it with a semicolon:

[[[ code('ac23e4d800') ]]]

Constructor done!

Next, add `$.extend()` with `window.RepLogApp.prototype` and `{`. The existing keys
fit right into this perfectly! Winning! At the end, add an extra `)`:

[[[ code('7d1c57ed8b') ]]]

Yes! In our template, we *won't* use `RepLogApp` like this anymore. Instead, say
`var repLogApp = new RepLogApp($table)`:

[[[ code('6bd03f858a') ]]]

We won't call any methods on that new `repLogApp` variable, but we could if we wanted to.
We could also create *multiple* `RepLogApp` objects if we had multiple tables on the page,
or if we loaded a table via AJAX. Our JavaScript is starting to be awesome!
