# Reusable Components

React's entire architecture is centered around making that are reusable. This is
*especially* easy to see with the dumb, presentational components: all they do is
receive props and... render! It would be *very* easy to render those components
with *different* props in different places.

But, in reality, a lot of components aren't really meant to be reused: `RepLogCreator`,
`RepLogList` and `RepLogs`... yea, it's *pretty* unlikely we'll use those on other
parts of our site... except maybe fore `RepLogCreator`, which could be used to
*edit* rep logs.

But, there *are* a lot of nice use-cases for building truly, re-usable components,
basically, *tools*. For example, it's pretty simple, but, suppose we had a lot of
Bootstrap submit buttons and we want to turn the submit button into its own React
component. We can *totally* do that, and it's pretty awesome.

In the `assets/js` directory, create a new directory called `components/` and inside,
a new file called `Button.js`. I'm not putting this in `RepLog` because this could
be used on other parts of the site.

This will be a dumb, presentation component. So, copy the import lines from the
top of `RepLogCreator`, and then say `export default function Button` with the
normal `props` argument. Inside, return the markup for a button with `className="btn"`,
because every button at *least* has that class.

## Spreading the Props

Go back to `RepLogCreator` and scroll down. Ok, this button has `type="submit"`.
We *could* add that to our `Button` component, but not *all* buttons need this.
But, no worries: we can *allow* this to be passed in as a prop! In fact, we might
need to pass a *bunch* of different attributes as props.

To allow that, use the attribute spread operator `...props`. It's simple: any prop
passed to this component will be rendered as an attribute. And for the text, hmm:
how about a prop called `text`: `props.text`. Close the button tag. And the bottom,
add `Button.propTypes =` and define `text` as a string that's required.

Perfect!

Back in `RepLogCreator`, head up top and bring this in: `import Button` from
`./Components/Button`.

Then *all* the way down at the bottom, use `<Button type="submit" />` and also
the `text` prop. Copy the original text and paste it here.

We *are* going to temporarily lose the `btn-primary` class. That *is* a problem,
and we'll fix it soon. Delete the old button. This should work! Move over and
refresh! There it is! The button has the class, `type="submit"` and the text. Hmm,
but it also has a `text=` attribute... which makes perfect sense: we added that
as a prop! Of course, we don't *actually* want that attribute, so we'll need to
fix that.

## Using props.children

But first, we have a *bigger* problem! What if I wanted to add a Font Awesome icon
to the text? Normally we would add a `<span className="">` and then the classes.
But... this doesn't look right: I'm putting HTML inside of this string. And, actually,
this wouldn't even *work*, because React escapes HTML tags in strings.

New idea: what if we could remove this `text` prop and treat the `Button` like a
*true* HTML element by putting the t ext *inside*. That looks *awesome*. This is
not only possible, this is *ideal*! By doing it this way, we can include text,
HTML elements or even other React components! Woh!

If you pass something in the body of a Component, that is known as its *children*,
and you can access it automatically with `props.children`. It's that simple.

Oh, and ESLint is angry because we're missing props validation for `children`. I
won't do it, but yea, it's probably a good idea to add this as a prop type: that
will serve as documentation that your component accepts children.

Remove the propTypes for now. Let's try it! Move over and refresh! Looking good.
To prove that using children is awesome, add a new `<span>` with
`className="fa fa-plus-circle"`.

Go check that out. Nice!

## Merging Prop Values in your Component

Ok, we're still missing the `btn-primary` class. This is a bit trickier. We can't
just pass a `className` prop here, because, in the `Button`, we're *already*
passing a `className` prop. So, let's just be smarter! Enter JavaScript, add ticks,
then print `btn`, then `${props.className}`.

That should do it! We're not passing this prop yet, but try it: refresh. Oh man,
`undefined`! Of course! Let's go clean things up.

First, add `Button.propTypes` to advertise that we accept a `className` prop that's
a string. We *could* make this required... *or* we can allow it to be optional,
but fix that `undefined` problem. To do that, set `Button.defaultProps` to an
object with `className` set to empty quotes.

Problem solved! Try it again. Wait! What? Now the `class` attribute is empty?
How is that even possible? To see why, go back to `RepLogCreator` and pass a
`className` prop here: `btn-primary`.

Go refresh again. Huh, now it has *that* class... but not the `btn` class.
Here's the deal: sure, we have this `className` prop here. But, thanks to the
`...props`, the `className` prop we're passing *in* overrides the first one!
We *could* move the `...props` first, but, in general, we *do* want to allow
whoever uses this component to override its props.

So, hmm: we basically want to print *all* of the props here... *except* for
`className`. We *can* do that, and it's cool! Up top, let's destructure:
`const {} = props`, then get out `className`. Use that below.

*Then* - this is the cool part - destructure a second variable, `...otherProps`.
Use *that* below in the button.

Yep, the `...otherProps` will be *all* of the props, *except* for any that we
*specifically* destructured before it. It's an *awesome* little trick.

Ok, try it out: move over, refresh and... we got it! It looks perfect! I hope
this tiny component gets you excited about the possibilities of reusing code
with React.
