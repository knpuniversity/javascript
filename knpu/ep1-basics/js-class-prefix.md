# Lift Stuff! The js- Prefix

Guys, get ready to pump up... on your JavaScript skills! No, no, I'm not talking
about the basics. Look, I get it: you know how to write JavaScript, you're a ninja
and a rock star all at once with jQuery. That's awesome! In fact, it's exactly where
I want to start. Because in this tutorial, we're going to flex our muscles and start
asking questions about *how* things - that we've used for years - actually work.

And this will make us more dangerous right away. But, but but! It's also going to
lead us to our real goal: building a foundation so we can learn about *ridiculously*
cool things in future tutorials, like module loaders and front-end frameworks like
ReactJS. Yep, in a few short courses, we're going to take a traditional HTML website
and transform it into a modern, hipster, JavaScript-driven front-end. So buckle up.

## The Project: Pump Up!

As always, please, please, please, do the heavy-lifting and code along with me.
By the way, in 30 seconds, I promise you'll understand why I'm making all these
amazing weight-lifting puns. I know, you just can't... weight.

Anyways, download the course code from any page and unzip it to find a `start/`
directory. That will have the same code that you see here. Follow the details in
the `README.md` file to get your project set up.

The last step will be to open a terminal, move into your project and do 50 pushups.
I mean, run:

```terminal
./bin/console server:run
```

to start the built-in PHP web server. Now, this *is* a Symfony project but we're not
going to talk a lot about Symfony: we'll focus on JavaScript. Pull up the site by
going to `http://localhost:8000`.

Welcome... to Lift Stuff: an application for programmers, like us, who spend all of
their time on a computer. With Lift Stuff, they can stay in shape and record the
things that they lift while working.

Let me show you: login as `ron_furgandy`, password `pumpup`. This is the only important
page on the site. On the left, we have a history of the things that we've lifted,
like our cat. We can lift many different things, like a fat cat, our laptop, or our
coffee cup. Let's get in shape and lift our coffee cup 10 times. I lifted it! Our
progress is saved, and we're even moving up the super-retro leaderboard on the right!
I'm coming for you Meowly Cyrus!

## Setting up the Delete Link

But, from a JavaScript standpoint, this is all *incredibly* boring, I mean traditional!
Our first job - in case I fall over my keyboard while eating a donut and mess up -
is to add a delete icon to each row. When we click that, it should send an AJAX request
to delete that from the database, remove the row entirely from the page, and update
the total at the bottom.

Right now, this entire page is rendered on the server, and the template lives at
`app/Resources/views/lift/index.html.twig`:

[[[ code('b50679b6c4') ]]]

Inside, we're looping over something I call a `repLog` to build the table:

[[[ code('dd1cac1a92') ]]]

Each `repLog` represents one item we've lifted, and it's the only important table
in the database. It has an `id`, the *number* of reps that we lifted and the total
weight:

[[[ code('805a3b9f9e') ]]]

## Adding the Delete link and js- class

To add the delete link, inside the last `<td>` add a new anchor tag. Set the `href`
to `#`, since we plan to let JavaScript do the work. And then, give it a class:
`js-delete-rep-log`:

[[[ code('4ab8316daa') ]]]

Inside, add our cute little delete icon:

[[[ code('2df5ea2290') ]]]

Adorable! Ok, first! Why did we add this `js-delete-rep-log` class? Well, there are
only ever two reasons to add a class: to style that element, or because you want
to find it in JavaScript.

Our goal is the second, and by prefixing the class with `js-`, it makes that *crystal*
clear. This is a fairly popular standard: when you add a class for JavaScript,
give it a `js-` prefix so that future you doesn't need to wonder which classes are
for styling and which are for JavaScript. Future you will... thank you.

Copy that class and head to the bottom of the template. Add a block `javascripts`,
`endblock` and call the `parent()` function:

[[[ code('e99b97738d') ]]]

This is Symfony's way of adding JavaScript to a page. Inside, add a `<script>` tag
and then, use jQuery to find all `.js-delete-rep-log` elements, and then `.on('click')`,
call this function. For now, just `console.log('todo delete!')`:

[[[ code('c5128fd69f') ]]]

## Resolving External JS in PHPStorm

But hmm, PhpStorm says that `$` is an unresolved function or method. Come on! I *do*
have jQuery on the page. Open the base layout file - `base.html.twig` - and scroll
to the bottom:

[[[ code('41fc83e784') ]]]

Both jQuery and Bootstrap should be coming in from a CDN. Oh, but this note says that
there is no locally stored library for the http link. Aha! Tell PhpStorm to download
and learn all about the library by pressing `Option`+`Enter` on a Mac - or `Alt`+`Enter`
on Linux or Windows - and choosing "Download Library". Do the same thing for Bootstrap.

Et voilà! The error is gone, and we'll start getting at least *some* auto-completion.

## Using .on() versus .click()

Oh, and I want you to notice one other thing: we're using `.on('click')` instead
of the `.click()` function. Why? Well, they both do the same thing. But, there
are an *infinite* number of events you could listen to on any element: click, change,
keyup, mouseover or even custom, invented events. By using `.on()`, we have one
consistent way to add a listener to *any* event.

It's a small start, but already when we refresh, open the console, and click delete,
it works! Now, let's follow the rabbit hole deeper.
