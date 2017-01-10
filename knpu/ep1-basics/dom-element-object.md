# The DOM Element Object

New goal! Eventually, when we click the trash icon, it will make an AJAX call. But
before that, let's just see if we can turn the icon red. In our JavaScript code,
we need to figure out exactly *which* `js-delete-rep-log` element was clicked.

How? I bet you've done it before... a *bunch* of times... by using the `this` variable.
But don't! Wait on that - we'll talk about the infamous `this` variable later.

## Using e.target

Because there's another way to find out *which* element was clicked... a better way,
and it involves our magical `e` event argument. Just say `$(e.target)`. `target`
is a property on the event object that points to the *actual* element that was clicked.
Then, `.addClass('text-danger')`:

[[[ code('9c054827e9') ]]]

Cool? Go back, refresh. Eureka!

So what *is* this `e.target` thing exactly? I mean, is it a string? Or an object?
And what else can we do with it?

Let's go digging! Add `console.log(e.target)`:

[[[ code('84b862423b') ]]]

And then, refresh! Ok, click on some delete links. Huh... it just prints out the HTML
itself. So, it's a string?

Actually, no... our browser is kinda lying to us: `e.target` is a DOM Element *object*.
Google for that and find the [W3Schools][dom_object] page all about it. You see,
every element on the page is represented by a JavaScript object, a DOM Element object.
My debugger is printing it like a string, but that's just for convenience... or
inconvenience in this case. Nope, it's actually an object, with properties and methods
that we can call. The W3Schools page shows all of this.

## Pro Tip: Using console.dir()

And there's another way you can see the methods and properties on this object. Go
back and change your `console.log()` to `console.dir()`:

[[[ code('dd7b20cd4f') ]]]

Now refresh. Click a link and check this out! It still gives you some information
about what the element is, but now you can expand it to find a *huge* list of its
properties and methods. Nice! One of the properties is called `className`, which we
will use in a second.

If you're not familiar with `console.dir()`, it's bananas cool. Sometimes, `console.log()`
gives you a string representation of something. But `console.dir()` tries to give you
a tree of what that thing actually is. It's like programmer X-Ray vision!

## DOM Element versus jQuery Object

So, question: how is a DOM Element object, like `e.target`, different than a jQuery
object, like `$(e.target)` or something we selected, like `$table`? I mean, don't
both represent an element on that page? And don't both allow us to interact with
that element? Are they the same?

Not exactly. Whenever you have a jQuery object like `$table`, or `$(e.target)`, that
actually represents an *array* of elements, even though there may only be *one* element.
Let me show you: use `console.log()` to print out `e.target`, and also,
`$(e.target)[0] === e.target`:

[[[ code('ad672d39c2') ]]]

Go back, refresh, and click one of the links. It prints true! The jQuery object *is*
an object, but it holds an *array* of DOM elements. And you can actually access the
underlying DOM element objects by using the indexes, 0, 1, 2, 3 and so on. The jQuery
object is just a fancy wrapper around them.

Try this example: search for all `.fa-trash` elements, find the third DOM element,
which is index 2, and see if it's the same as the element that was just clicked:
`e.target`:

[[[ code('02f30fe1c3') ]]]

In theory, this should return true *only* when we click on the third trash icon.

So refresh and try it! Click the icons: false, false and then true! This is all an
elaborate way of explaining that - under everything - we have these cool DOM Element
objects. jQuery? That's just a fancy wrapper object that holds an array of these
guys.

Of course, that fancy wrapper allows us to add a class by simply calling... `addClass()`:

[[[ code('cbfa63cd76') ]]]

But now, we know that if we *wanted* to, we could do this directly on the DOM Element
object. Try it: `e.target.className = e.target.className + ' text-danger'`:

[[[ code('9873c82be0') ]]]

Try that out! Refresh. It works too!

It's not as elegant as using jQuery... and jQuery also helps handle browser incompatibilities,
but feel empowered! Go tell a co-worker that you just learned how the Internet works!

Then come back, remove that new code and go back to using jQuery:

[[[ code('9ea44aef7c') ]]]


[dom_object]: http://www.w3schools.com/jsref/dom_obj_all.asp
