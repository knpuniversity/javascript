# Immutability / Don't Mutate my State!

Ok... so.... there's this annoying... but super important rule in React that
we're *totally* violating. The rule is: the *only* time you're allowed to set
or change the state property directly is when you're initializing it in the
`constructor`. *Everywhere* else, you *must* call `setState()` instead of changing
it directly.

Here's another way to say it: each piece of data on `this.state` should be *immutable*.
And *that* is the part we're violating. It was really subtle! First, unlike PHP,
in JavaScript arrays are *objects*. And so, like all objects, if you modify `repLogs`,
that also modifies `this.state.repLogs` because... they're the same object!

And that's *exactly* what we did when we called `repLogs.push`: this changed, or
*mutated*, the `repLogs` key on `this.state`! Yep! We *changed* the state before
calling `this.setState()`.

## Do I *really* need to Avoid Mutating State?

Now, is that *really* a problem? I mean, everything seems to work. Basically...
yes, but, honestly, it's subtle. There are two problems with mutating the state.
First, `setState()` is actually asynchronous: meaning, React doesn't handle your
state change immediately. For example, if two parts of your code called `setState()`
at almost the same moment, React would process the first state change, re-render
React, and *then* process the second state change. Because of this, if you mutate
the state accidentally, it's possible that it will get overwritten in a way you
didn't expect. It's unlikely, but we're trying to avoid a WTF moment.

The second reason is that if you mutate your state, it may prevent you from making
some performance optimizations in the future.

Honestly, when you're learning React, the reasons for "why" you shouldn't mutate
your state are hard to understand. The point is: you should *avoid* it, and we'll
learn how. Well, if you're updating a scalar value like `highlightedRowId`, it's
simple! But when your state is an object or an array, which, *is* an object, it's
harder.

If you need to "add" to an array without, updating it, here's how:
`const newRepLogs = `, create a *new* array, use `...this.state.repLogs` to put the
existing repLogs into it and then, add `newRep`. Yep, this is a *new* array: we did
*not* change state. This solves our problem.

[[[ code('192c8e498f') ]]]

## Using the setState() Callback

Except... there is *one* other tiny, annoying rule. Most of the time, when you
set state, you set it to some new, specific value. But, if the *new* state *depends*
on the old state - like our new `repLogs` depends on the current `repLogs` -
then you need to use `setState()` as a callback.

Check it out: call `this.setState()`, but instead of passing data, pass a callback
with a `prevState` argument. Inside, create the array:
`const newRepLogs = [...prevState.repLogs, newRep]`, and *return* the new state:
`repLogs` set to `newRepLogs`.

[[[ code('f7cef609a6') ]]]

Why the heck are we doing this? Remember how I said that `setState()` is asynchronous?
Because of that, if you call `setState()` now, React may not *use* that state
until a few milliseconds later. And, if something *else* added a new repLog between
now and then... well... with our previous code, our new state would override and
*remove* that new repLog!

I know, I know! Oof, again, it's subtle and probably won't bite you, and you'll
probably see people skip this. To keep it simple, just remember the rule: *if* setting
new state involves you *using* data on `this.state`, pass a callback instead. Then,
you'll *know* you're safe.

## Smarter Method & Prop Names

While we're here, something is bothering me. Our callback method is named
`handleNewItemSubmit()`. But... we purposely designed `RepLogApp` so that it
doesn't know or care that a form is being used to create rep logs. So let's
rename this method: `handleAddRepLog()`.

[[[ code('d2f8d5e87f') ]]]

Yea. Make sure to also update the `bind()` call in the constructor. Below, when
we pass the prop - update it here too. But... I think we should also rename the
prop: `onAddRepLog()`.

[[[ code('95f014eb33') ]]]

And, if we change that, we need to update a few other spots: in `RepLogs`, change
the `propType`. And, up where we destructure, PhpStorm is highlighting that this
prop doesn't exist anymore. Cool! Change it to `onAddRepLog`, scroll down, and
make the same change `onAddRepLog={onAddRepLog}`.

[[[ code('88d09951d7') ]]]

Repeat this process in `RepLogCreator`: rename the `propType`, update the variable name,
and use the new function.

[[[ code('f27a5fc6cd') ]]]

Oh, also, in `RepLogs`, the destructuring line is getting *crazy* long. To keep
me sane, let's move each variable onto its own line.

[[[ code('3ec47e8e28') ]]]

## Moving the "itemOptions" onto a Property

Finally, we need to make one other small change. In `RepLogCreator`, all of our
options are hardcoded. And, that's not necessarily a problem: we'll talk later
about whether or not we should load these dynamically from the server.

But, to help show off some features we're about to work on, we need to make these a
*little* bit more systematic. In the `constructor`, create a new property: `this.itemOptions`
set to a data structure that represents the 4 items.

[[[ code('9994d71fc1') ]]]

Notice, I'm not making this props or state: we don't need these options to actually
*change*. Nope, we're just taking advantage of the fact that we have a class, so,
if we want to, we can store some data on it.

Back in `render()`, delete the 4 options and replace it with one of our fancy `map`
structures: `this.itemOptions.map()` with an `item` argument. In the function,
return an `<option>` element with `value={option.id}`, `key={option.id}` - we need
that for any array of elements - and, for the text, use `{option.text}`. 

[[[ code('fbc3774161') ]]]

Nice! Let's make sure it works - refresh! It works and... yea - the options are
still there.

When we submit... woh! All our state disappears! This smells like a Ryan bug,
and it will be *something* wrong with how we're setting the state. Ah, yep! This
should be `prevState.repLogs`.

Ok, try it again. Refresh, fill out the form and... we're good! 

Let's talk about some validation!
