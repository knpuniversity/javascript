# ES6 Import & Export

If you watched episode 2 of our JavaScript series, then you know that ECMAScript is
the official name of the JavaScript language standard and that ECMAScript version
6 - or ES6 - introduced the idea of *modules*. Modules are what we've been taking
advantage of this *entire* tutorial: exporting and requiring values from different
files.

But... surprise! In ECMAScript, the `require` function does *not* exist. Whaaaat?!
The `require` statement was basically invented by Node, back *before* ES6: Node
needed a way to require files, so they invented their *own* way. Later, ECMAScript
decided to make the *idea* of modules part of the standard language. But when they
did, they used a *different* keyword than require! Yep, there are *two* valid syntaxes
for working with modules! But... it's not a big deal: they work *exactly* the same,
except that the official syntax has *one* small advantage.

## Hello import & export

Let's use the *official* module syntax. Instead of saying
`const Helper = require()`, say `import Helper from`.

It's that simple! And it doesn't change *anything*. In `RepLogHelper`, we *also*
need to change our *export* to use the new syntax. Instead of
`module.exports = Helper`, use `export default Helper`.

We'll talk about what the `default` part means later. But for now, it's *always*
export *default* and then what you want to export.

You *can* mix the two syntaxes - `require` and `import` - to a certain point, but
you may run into some problems. Your best bet is to pick your favorite - mine is
`import` and `export` - and use it *everywhere*. So let's update everything:
`import $ from 'jquery'`, `import swal from 'sweetalert2'` and
`import Routing from './Routing'`.

At the bottom, use `export default RepLogApp`.

Cool! `RepLogHelper` is already ok, and in `Routing.js`, change this to:
`export default window.Routing`.

Keep going for the 3 entry files: `import $ from 'jquery'`. If you don't need a
return value, it's even easier: just `import 'bootstrap'`. Repeat that for the CSS
files.

In `login.js`, import jQuery again, then import the CSS file.

And *one* more time in `rep_log.js`: import jQuery and `import RepLogApp`.

And... assuming I didn't mess anything up, our build *should* still be happy! Check
out the terminal: yes! No errors. Move over to your browser and check it! Looks great!

## Importing Named Modules

And... yea! That's it! Just two nearly-identical syntaxes... because... more is
better?! The *biggest* reason I want you to know about `import` and `export` is so
that you know what it *means* when you see it in code or documentation.

But, there is *one* small advantage to `import` and `export`, and it relates
to this `default` keyword. Usually, you'll want to export just *one* value from a
module. In that case, you say export `default` and then you receive this value when
using `import`.

But... technically... you can export *multiple* things from a module, as long as
you give each of them a *name*. For example, instead of `export default Helper`,
we could export an object with a `Helper` key and a `foo` key. Then, the import
has a slightly different syntax where you say explicitly *which* of those keys
you want to import.

I don't usually do this in my code, but there *is* one case where it can be helpful.
Imagine you're using a huge external library - like `lodash` - which is really just
a collection of independent functions. *If* that library exports its values correctly,
you could import *just* the functions you need, instead of importing the *entire*
exported value.

Then, at least in theory, thanks to a feature called "tree shaking", Webpack would
*realize* that you're only using a *few* parts of that library, and *only* include
those in the final, compiled file. In reality, this *still* seems a bit buggy: the
unused code doesn't always get removed. But, the point is this: `import` and `export`
have a subtle advantage and are the ECMAScript standard. So, use them!

Ok, it's time to find out how we can create a crazy-fast production build!
