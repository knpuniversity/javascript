# Destructuring Spread Operator

Next, we need to talk about two kind of weird things, but they're weird things
that you're gonna start to see popping up everywhere. So we really need to
understand them. The first is called de structuring which honestly is not
something that I've used that often, but I do see, and if you don't recognize
it, it's gonna be a little weird. So in rep log app, let's go up to add row.
This is a method that's called to add the rows to our table. We're just going
to dump for now the rep log variable. So when we refresh you will see this is
called the punch times. All these rep logs have a bunch of keys like ID, item
label, links, reps, total weight lifted. So de structuring allows you to do
something like this. Let curly brace. Let's say ID, item label, reps equals rep
log.

Below I'm actually going to console that log, ID, item label, and reps. In
order words, this is actually going to create three new variables - ID, item
labels, and reps - set to those three individual keys. So it's important that
this has an ID, item label, and reps because it'll be set to those three
different keys. If you're mapping this object to these individual variable keys
right here. And you want to refresh. Sure enough, that works perfectly. You can
even do this with true arrays where the variable is done by position instead
and that looks even stranger.

Now if we put something right here that doesn't match like, I don't know,
totally made up key and try to print it, what happens there? It's not an error.
It just comes back as undefined. It's a friendly way of matching these things.
It doesn't kill your code, but you get undefined. One of the next feature is
you can actually give it default ordinance, default values. I can set this to
"whatever." Now if that key doesn't exist, it's going to be set to "whatever."
That is de structuring. It may or may not be useful for you, but watch out for
it so that it doesn't surprise you when you see it.

Now the second thing I want to talk about is much more important. It's called
the spread operator. I'm actually going to do this inside of "play.js" so I'm
going to clear everything out. Let's create a new function called print three
things. Thing one, thing two, and thing three. We'll just console.log our three
things. Easy enough! Below that, we're gonna create a new array called "yummy
things". Which of course naturally include pizza, gelato, and sushi. All
delicious, but maybe you shouldn't eat those all at the same time or else you
might get a belly ache. So the question now is "How can I pass those three
things as the first, second, and third argument to print three things?".
Traditionally we would actually say "print three things", and then probably say
yummy things left square bracket zero, yummy things left square bracket one and
yummy things left square bracket two. But instead we can use this spread
operator, print three things "dot, dot, dot" yummy things. If we try that, it
prints out our three things. So the way to think about the spread operator is,
it's always "dot, dot, dot" and then your array. It's almost as if somebody
went through and literally just wrote out all of the items in your array
manually instead of us doing it by hand. It is a cool thing.

Of course there's lots of yummy things in the world, and since I'm from the
U.S.A., of course it should have cheeseburger. So what's going to happen in
this case? How exactly does the spread operator work there? If you go back and
rerun it you get the same results and that makes sense. The spread operator
means that we are going to pass pizza as the first argument, then gelato, then
sushi and cheeseburger actually gets passed as the fourth argumentative
function, which is in main use. Now you maybe asking yourself, how can this
possibly be useful in any real world scenario.

So, lets actually show you, because using the spread operator you can do really
cool things with arrays. The first thing you can do is an array merge. Let's
say that we're doing another array called great things. We decide that
sunshine, swimming; that's a great thing. We also decide that sunsets, those
are great right? Then we decide that great things are also yummy things, so I
would like to add all four of these yummy things into great things array. So in
PHB we would use array merge the yummy things into great things. But in Java
script we can use a spread operator, we just add comma as if we were going to
add another entry. We say "dot, dot, dot" yummy things. We could even keep
going and add something else great like New Orleans. Cause New Orleans is a
really great place.

So let's console.log great things to see if that works. And it does, swimming,
sunsets then our four yummy things. Then we have New Orleans at the bottom.
That's a pretty cool thing we can do there. One other related thing we can get
to true array copies. Down here lets create another variable called "let copy
of great things." I'm not actually going to set that to great things. We're
going to say copy of great things.push. We're going to push another great thing
onto this array. Which we all know is great, which is summer. Down at the
bottom I'm going to say console.log, copy of great things.push. The thing is,
will a copy os supper appear on just the copy of great thing or will it also
appear on great things itself. It turns out that summer appears on both. This
makes sense for a java script or PHB background. Arrays are objects. Whenever
you have objects, they're passed around by reference. So when you create copy
of great things, this is still just pointing to the same array and memory. If
we modify copy of great things we're modifying great things.

As we get more advanced in the react.js type of things, this whole idea of not
modifying objects. Of having objects that are immutable becomes more and more
important. It's going to mean that increasingly we are going to want to not
modify things but create new copies of them. That may not make sense why yet,
but its going to become important for us to make copies of arrays instead of
just modifying them. So how could we create a true copy of great things? Well
the answer is the spread operator. So instead of saying "let copy of great
things" equals great things. We can just say left square bracket, "dot, dot,
dot" great things. Ant that's it. Now it's going to take each entry from great
things and one by one put them into copy of great things. Creating a brand new
array. This time we can see we have summer in the copy, but we did not modify
the original array.

That's a spread operator and it's going to become particularly important when
we get into react.js stuff.
