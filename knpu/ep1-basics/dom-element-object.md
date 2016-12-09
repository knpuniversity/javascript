# The DOM Element Object

New goal! Eventually, when we click the trash icon, it'll make an AJAX call. But
for now, let's see if we can turn the icon red. In our JavaScript code, we need to
figure out exactly *which* `js-delete-rep-log` element was clicked.

How? I bet you've done it before... a *bunch* of times... by using the `this` variable.
But don't! Wait on that - we'll talk about the infamous `this` variable later.

## Using e.target

There's another way to find which element was clicked... a better way, and it involves
our magical `e` event argument. Just say `$(e.target)` - which is a property on the
event object that points to the element that was clicked. Then, `.addclass('text-danger')`.

Cool? Go back, refresh. There it is!

So this is kind of interesting. What *is* this `e.target` thing exactly? Is it an
object? What else can we do with it?

Let's do some exploring! Add `console.log(e.target)`, then refresh! Ok, click on some
delete links. Huh... it just prints out, the HTML itself. So, it's a string?

No, our browser tools are kinda lying to us: `e.target` is a DOM Element object.
Google for that and find the [W3Schools](http://www.w3schools.com/jsref/dom_obj_all.asp)
page all about it. You see, every element on the page is represented by a JavaScript
object, a DOM Element object. My debugger is printing it like a string, but that's
just for convenience... or inconvenience in this case. Nope, it's actually an object,
with properties and methods that we can call. The W3Schools page shows all of this.

## Pro Tip: Using console.dir

And there's another way you can see the methods and properties of this object. Go
back and change your `console.log` to `console.dir`. Then go back and refresh. Click
an link and check this out! It still gives you some information about what the
element is, but now you can expand it to find a *huge* list of all of the properties
and methods that are on that object. One of the properties is called `className`,
which we're going to use in a second.

If you're not familiar with `console.dir`, it's awesome. Sometimes, `console.log`
gives you a string representation of something. But `console.dir` tries to give you
a tree of what that thing actually is. It's such an awesome little tool.

## DOM Element versus jQuery Object

Question: how is a DOM element object, like `e.target`, different than a jQuery object,
like `$(e.target)` or sometime we selected, like `$table`? I mean, don't both of
these represent an element on that page? And don't they both allow us to interact
with that element? Are they the same?

Not exactly. Whenever you have a jQuery object like `$table`, or `$(e.target)`, that
actually represents an *array* of elements, even though there may only be one element.
Let me show you what I mean. Use `console.log()` to print out `e.target`, and also,
`$(e.target)[0] === e.target`.

Go back, refresh, and click one of the links. It's true! The jQuery object *is* an
object, but it holds an *array* of DOM elements. And you can actually access the
underlying DOM element objects by using the indexes, 0, 1, 2, 3 and so on. The jQuery
object is just a fancy wrapper around them.

Check out this example: search for all `.fa-trash` elements, find the third DOM
element, which is index 2, and see if it's the same as the element that was just
clicked, `e.target`. In theory, this should return true *only* when we click on
the third trash icon.

Go back and refresh. Click the icons: false, false and then true! This is all just
a fancy way of realizing that - under everything - we have these cool DOM element
objects. jQuery? That's just a fancy wrapper object that holds an array of these
guys.

Of course, that fancy wrapper allows us to add class by simply calling an `addClass()`
method. But now, we know that if we *wanted* to, we could do this directly on the
DOM Element. Try it: `e.target.className = e.target.className + ' text-danger`.

Try that out! Refresh. It works perfectly! 

It's not as elegant as using jQuery object, and jQuery also helps handle browser
incompatibilities, but feel empowered guys!

Remove that new code and go back to using jQuery.
