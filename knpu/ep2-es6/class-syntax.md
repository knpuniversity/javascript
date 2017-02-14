# True Class Syntax

In the first JavaScript tutorial, we learned about object. I mean, *real* objects:
the kind you can instantiate by creating a constructor function, and then adding
all the methods via the prototype. This object stuff looks a lot different in PHP
than in does in JavaScript, in large part because PHP has *classes* and JavaScript
doesn't. Well... that's a big fat lie! ES 2015 introduces *classes*, true classes.

## Creating a new class

As a PHP developer, you're going to *love* what classes look like... because they're
nearly identical to PHP! If you want to create a `Helper` class... just say,
`class Helper {}`.

That's it! With this syntax, the constructor is called, just, `constructor`. Move
the old constructor function into the class and rename it: `constructor`. You can
also remove the semicolon after the method, just like in PHP.

Move everything else into the new class syntax is *easy*: remove `$.extend(helper.prototype)`
and move all of the methods inside of the class. And congratulations! We just created
a new ES 2015 class. Wasn't that easy?

To make things sweeter, it all works just like before: nothing is broken. And that's
no an accident: behind the scenes, JavaScript still follows the prototypical object
oriented model. This new syntax is just a nice wrapper around it. It's great: we
don't need to worry about the `prototype`, but ultimately, that is set behind the
scenes.

Let's make the same change at the top with `RepLogApp`: `class RepLogApp {` and
then move the old constructor function inside. But, make sure to spell that correctly!
I'll indent everything and add the closing curly brace.

Cool! Now we just need to move all the methods inside!

## Classes do *not* have Properties

Start by *only* moving the `_selectors` property. Paste it inside the class and...
woh! PhpStorm is *super* angry:

> types are not supported by current JavaScript version

Rude! PhpStorm is *trying* to tell us that properties are *not* supported inside
classes: only methods are allowed. That may seem weird - but it'll be more clear
why in a minute. For now, change this to be a method: `_getSelectors()`. Add a
return statement, and everything is happy.

Well, everything *except* for the couple of places where we reference the `_selectors`
property. Yea, `this._selectors`, that's not going to work. But *don't* fix it!
Let's come back here in a minute.

Let's move the rest of the methods inside: just delete the `}` and the prototype
line to do it. And we can remove the comma after each method. Other than that,
nothing should change.

## Magic get Methods

Time to go back and fix this `_getSelectors()` problem. The easiest thing to do
would be to update `this._selectors` to `this._getSelectors()`. But, there's a cooler
way.

Rename the method *back* to `_selectors`, and then add a "get space" in front of
it.

Woh! Instantly, PhpStorm is happy: this is a *valid* syntax. And when you search
for `_selectors`, PhpStorm is happy about these calls too!

This is the new "get" syntax: a special new feature from ES 2015 that allows you
to define a method that should be called whenever someone tries to access a property,
like `_selectors`. There's of course also a "set" version of this, which would be
called when someone tries to *set* the `_selectors` property.

So even though classes don't *techncially* support properties, you can *effectively*
create properties by using these get and set methods.

Oh, and btw, just to be clear: even though you can't *define* a property on a class,
you can still set whatever properties you want on the object, after it's instantiated.
That hasn't changed.

Ok team! Let's try out our app! Refresh! It works! Wait, no, an error! Blast!
It says `RepLogApp` is not defined, and the error is from our template:
`app/Resources/views/index.html.twig`. Ah, *this* code is fine: the problem is that
the `RepLogApp` class *only* lives within this self executing function. It's the
same problem we had in the first episode with scope.

Solve it the same way: export the class to the global scope by saying
`window.RepLogApp = RepLogApp`.

Try it now! And life is good! So what else can we do with classes? What about
static methods?
