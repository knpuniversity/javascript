# React Components

It works like this: we create React *element* objects and ask React to render
them. But, React has *another* important object: a Component. Ooooooooo.

It looks like this: create a class called `RepLogApp` and extend something called
`React.Component`. A component only needs to have one method `render()`. Inside,
return whatever element objects you want. In this case I'm going to copy my JSX
from above and, here, say `return` and paste.

[[[ code('0197a4db8a') ]]]

*This* is a React component. Below, I'm going to use `console.log()` and then
treat my `RepLogApp` as if it were an element: `<RepLogApp />`.

[[[ code('e46082cff9') ]]]

Finally, below, instead of rendering an *element*, we can render the *component*
with that same JSX syntax: `<RepLogApp />`.

[[[ code('e84f1dbf01') ]]]

Ok, go back and refresh! Awesome! We get the *exact* same thing as before! *And*,
check out the console! The component becomes a React element!

## The What & Why of Components

This React component concept is something we're going to use a *lot*. But, I don't
want to make it seem too important: because it's a *super* simple concept. In PHP,
we use classes as a way to group code together and give that code a name that makes
sense. If we organize 50 lines of code into a class called "Mailer", it becomes pretty
obvious what that code does... it spams people! I mean, it emails valued customers!

React components allow you to do the same thing for the UI: group elements together
and give them a name. In this case, we've organized our `h2` and `span` React elements
into a React component called `RepLogApp`. React components are sort of a named
*container* for elements.

By the way, React components do have one rule: their names must start with a capital
letter. Actually, this rule is there to help JSX: if we tried using a `<repLogApp />`
component with a lowercase "r", JSX would actually think we wanted to create some
new hipster `repLogApp` HTML element, just like how a `<div>` becomes a `<div>`.
By starting the component name with a capital letter, JSX realizes we're referring
to our *component* class, not some hipster HTML element with that name.

## Making our Imports more Hipster

*Anyways*, a few minor housekeeping things. Notice that `Component` is a property
on the `React` object. The way we have things now is fine. But, commonly, you'll see
React imported like this: `import React` then `{ Component }` from `react`. Thanks
to this, you can just extend `Component`.

[[[ code('b427ca5547') ]]]

This is pretty much just a style thing. And... honestly... it's one of the things
that can make React frustrating. What I mean is, React developers like to use
a *lot* of the newer, fancier ES6 syntaxes. In this case, the `react` module
exports an object that has a `Component` property. This syntax is "object
destructuring": it grabs the `Component` key from the object and assigns it to a
new `Component` variable. Really, this syntax is not *that* advanced, and actually,
we're going to use it *a lot*. But, this is one of the challenges with React:
you may not be confused by React, you may be confused by a fancy syntax used in
a React app. And we definitely don't want that!

We can do the same thing with `react-dom`. Because, notice, we're *only* using
the `render` key. So instead of importing *all* of `react-dom`, import
`{ render }` from `react-dom`. Below, use the `render()` function directly.

[[[ code('f27106f860') ]]]

This change is a *little* bit more important because Webpack should be smart enough
to perform something called "tree shaking". That's not because Webpack hates nature,
that's just a fancy way of saying that Webpack will realize that we only need the
`render()` function from `react-dom`: not the *whole* module. And so, it will only
include the code needed for `render` in our final JavaScript file.

*Anyways*, these are just fancier ways to import *exactly* what we already had.

Oh, but, notice: it *looks* like the `React` variable is now an *unused* import.
What I mean is, we don't ever *use* that variable. So, couldn't we just remove it
and only import `Components`?

Actually, no! Remember: the JSX code is *transformed* into `React.createElement()`.
So, strangely enough, we *are* still using the `React` variable, even though it
doesn't look like it. Sneaky React.

To make sure we haven't broken anything... yet, go back and refresh. All good.

## One Component Per File

Just like in PHP, we're going to follow a pattern where each React component class
lives in its own file. In the `assets/js` directory, create a new `RepLog` directory:
this will hold all of the code for our React app. Inside, create a new file called
`RepLogApp`. Copy our entire component class into that file.

[[[ code('c588ac8a4f') ]]]

Woh. Something weird just happened. Did you see it? We *only* copied the `RepLogApp`
class. But when we pasted, PhpStorm auto-magically added the import for us! Thanks
PhpStorm! Gold star!

But, check out this error:

> ESLint: React must be in scope when using JSX.

Oh, that's what we *just* talked about! This is one of those warnings that comes
from ESLint. Update the import to *also* import `React`.

Now, to make this class available to other files, use
`export default class RepLogApp`.

[[[ code('bd15a8e695') ]]]

Back in `rep_log_react.js`, delete the class and, instead, `import RepLogApp` from
`./RepLog/RepLogApp`. Oh, and it's not too important, but we're actually *not*
using the `Component` import anymore. So, trash it.

[[[ code('e9e1d3ef01') ]]]

Awesome! Our code is a bit more organized! And when we refresh, it's *not* broken,
which is always my favorite.

## The Entry - Component Structure

And actually, this is an important moment because we've just established a basic
structure for pretty much any React app. First, we have the entry file -
`rep_log_react.js` - and *it* has just one job: render our top level React component.
In this case, it renders `RepLogApp`. That's the *only* file that it needs to
render because eventually, the `RepLogApp` component will contain our *entire*
app.

So the structure is: the one entry file renders the one top-level React component,
and *it* returns all the elements we need from its `render()` method.

And, that's our next job: to build out the rest of the app in `RepLogApp`. But first,
we need to talk about a super-duper important concept called props.
