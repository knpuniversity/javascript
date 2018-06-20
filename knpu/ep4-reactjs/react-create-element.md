# React.createElement()

Time to install React! Find your open terminal: `yarn add react` - and we also
need a second package called `react-dom`:

```terminal-silent
yarn add react react-dom --dev
```

`react` is... um... React. `react-dom` is the library we'll use to render our
React app onto the page, the DOM. These are separate libraries because you can
actually use React to render things in a *non-browser* environment.

*Anyways*, when that finishes, go back to `rep_log_react.js`. Like with all libraries,
to use React, we need to require or import it. I'll use the newer, *far* more hipster
`import` syntax in this tutorial to import `React` from `react`.

## Elements & the Virtual DOM

Here's the idea behind React: it's actually really beautiful: *we* create React
element objects that *represent* HTML elements, like an h1 tag. These don't actually
live on the page, they're just objects that *describe* HTML elements.

But then, we can tell React to look at our element objects, and use them to create
*real* HTML elements on the page, or, on the DOM. This means that we will have a
tree of element objects in React *and* a tree of element objects on the page. To
say it a different way, we will have a *virtual DOM* in React and the *real DOM*
on the page.

And... that's it! Of course, the *magic* is that, when we change some data on a
React element object, React will update the corresponding DOM element automatically.

## Creating React Elements

So... let's create some React elements! To *really* master this, yea... we're
going to do things the hard way first. But, it will be *totally* worth it.

Create a new `const el` set to `React.createElement()`. Make this an `h2` tag: we're
building the title on top of the app. Pass `null` for the second argument: but this
is where you could pass an array of any HTML attributes for the element. These are
called "props" in React - but more on that later. For the third argument, pass
*whatever* you want to put inside, like text: "Lift History!".

Cool! Let's `console.log(el)`: I want you to see that this is just a simple object.
Go refresh the page. The element is not, *yet*, being rendered to the screen in any
way. It's just a React element that describes a potential HTML element.

## Rendering React to the DOM

Now, go back to `index.html.twig`. To render the element onto the page, we need
a target. The existing app is rendered in this `js-rep-log-table` element. Above
this, add a new `<div class="row">` and inside, an empty div we can render into
with `id=""`, how about, `lift-stuff-app`. Then, for a bit more separation, add a
bunch of line breaks and an `<hr>`.    

Awesome! Copy the `id` of the div. To render React to the DOM, we need to use that
*other* package we installed: `import ReactDom` from `react-dom`. Then, just,
`ReactDom.render()` to render our `el` into `document.getElementById('lift-stuff-app')`.

That's it! Step 1: create a React element object and, step 2, use `ReactDom` and
some boring, raw JavaScript to render it onto the page.

Let's go try it! Move over and refresh! Ha! We have our very first, but I, know
very simple, React app. We deserve balloons!

## Nested Elements

Of course, in a *real* app, we're going to have more than just one element. Heck,
we're going to have a big nested *tree* of elements inside of other elements, just
like we do in normal HTML.

So... how could we put an element *inside* of our h2? First, break things onto
multiple lines to keep our sanity. The answer is... by adding more and more arguments
to the end of `React.createElement()`. Each argument - starting with the third
argument - becomes a new child that lives inside the `h2`. For example, to create
a nested `span` element, use `React.createElement()` with `span`, null and a heart
Emoji.

Let's log `el` again. Then, flip over and... refresh!

Ha! There it is! Inspect the element: yep, the h2 tag with a span inside. Check
out the logged Element: it now has two "children", which is a React term: the text
and *another* React element object.

Awesome! But... you've probably already noticed a problem. Building a *real* app
with many nested elements is going to get *really* ugly... *really* quickly. This
React "element" idea is great in theory.... but in practice, it's a nightmare! We
need another tool to save us. That tool is love. I mean, JSX.
