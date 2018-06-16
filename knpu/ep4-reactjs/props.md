# Props

So far, the component is 100% static. What I mean is, there are *no* variables
at all. No matter what, each time we render `RepLogApp`, we will get the *exact*
same result.

I said earlier that a React component is kind of like a PHP class. Well, when we
instantiate a class in PHP, we can pass in different arguments to make different
*instances* of the same class behave in different ways.

And... yea! We can do the exact same thing here: we can pass variables to a
component when it's rendered, and use those in the `render()` method.

## Components are Instantiated

But, first, a quick note: when you use the JSX syntax for a component, React
*instantiates* a new instance of our class. Yep, we can actually render multiple
`RepLogApp` components on the page, and each of them will be a separate object.
with separate data.

## Passing in a Prop

It turns out, that's hugely powerful. Suppose that we want to be able to render our
`RepLogApp` in multiple places on the page at the same time. But, sometimes we
want the heart Emoji, but sometimes we don't. To make that possible, we need to
be able to pass a flag to `RepLogApp` that tells it whether or not to render the
heart.

Inside `rep_log_react.js`, create a new `const shouldShowHeart = true`. I'll also
update the render code to use multiple lines, just to keep things clear.

So, how can we pass this variable into `RepLogApp`? By adding what *looks* like
an attribute: `withHeart` - I'm just making that name up - equals `{shouldShowHeart}`.

## The JSX {JavaScript} Syntax

Woh. Wait. Something crazy just happened. We are inside of JSX on this line.
And, because JSX is like HTML, we know that we could, of course, say something
like `withHeart="food"`. That's true, but whenever you're in JSX, if you write `{}`,
that puts you back into JavaScript mode! Once inside, You can write literally *any*
valid JavaScript: like reference the `shouldShowHeart` variable or even add expressions.
We'll do this *all* the time.

## Reading Props from Inside a Component

Now, I referred to `withHeart` as an "attribute". But, in React, this is actually
known as a `prop`, and its the way that you pass "arguments" or "data" into your
component. Inside `RepLogApp`, we can access any props that were passed to us via
a `this.props` property.

Check this out: in `render()` create a new variable called `heart` and set it to
empty quotes. Then, if `this.props.withHeart` - referencing the prop we passed
in - say `heart =`, copy the `span` JSX from below, and paste it here.

Oh, and notice that when we use `this.props.withHeart`, we have an error from ESLint
about some missing prop validation. That's just a warning, and we're going to talk
about it later. For now, *totally* ignore it.

Below, I want to break my `return` statement onto multiple lines. You *can* use
multiple lines to define JSX, as long as you surround it with parenthesis. I do
this a lot for readability.

Finally, instead of the span, we want to print the `heart` variable. How? Use
`{heart}`. Based on the value of the prop, this will print an empty string or a
React element.

Right now, `withHeart` is equal to true. So let's see if this work: find your browser
and refresh! Yes! We still see the heart! Change `shouldShowHeart` to false and
try it again. The heart is gone!

## Rendering a Component Multiple Times

To *really* show off, change that value back to true, but let's see if we can render
`RepLogApp` *multiple* times. Copy the JSX, paste, and set `withHeart` to `false`.

But, as *soon* as we do this, the Webpack build fails! Find your terminal to see
what it's complaining about:

> Syntax Error: Adjacent JSX elements must be wrapped in an enclosing tag

This is less scary than it sounds. It's not that you can't put components next to
each other like this, it just means that there must be just *one* element all the
way at the *top* of our JSX tree. Each *component* also needs to follow this rule.
And, `RepLogApp` already is: it has one top-level element: the `h2`.

To put just *one* element at the top of our element tree, there's a simple fix:
add a `div` and render both components inside. Oh, and I completely forgot to use
`{}` around my "false" - `false` is JavaScript.

Now that Webpack is happy again, go back and refresh! Sweet! Our component is
rendered *twice*: each is its own object with its own data.

Props are just about the *most* important concept in React, and they will be the
*key* to us creating killer UI's that update dynamically.

Back in `rep_log_react.js`, we don't *really* need two of these components: so go
back to just one. And, beautiful!

It's time to build out the rest of our app: first, by moving the table into
`RepLogApp`.
