# Lift Stuff! The js- Prefix

Okay guys, get pumped up! Because right now, we're talking JavaScript. No, no not
the basics. I get it: you know how to write JavaScript, you're great with jQuery
and you've made lots of fancy sites that do lots of fancy stuff. That's awesome!
And it's exactly where I want to start. Because in this tutorial, we're going to
start asking questions about *how* things we've used for years actually work.

This will make us more dangerous right away. But, but but! It's also going to lead
us to our real goal: building a foundation so we can learn about *really* cool things
in future tutorials, like module loaders and front-end frameworks like ReactJS. Yep,
in a few short courses, we'll take a traditional HTML website and transform it into
a modern, hipster, JavaScript-driven front-end. So buckle up.

## The Project: Pump Up!

As always, please, please, please code along with me. If you do, I'll buy you all
ice cream. Download the course code from any page and unzip it to find a `start/`
directory. That will have the same code that you see here. Follow the details in
the `README.md` file to get your project set up.

The last step will be to open a terminal, move into your project and run:

```terminal
php bin/console server:run
```

to start the built-in PHP web server. Now, this *is* a Symfony project but we're not
going to talk a lot about Symfony: we'll focus on JavaScript. Pull up the site by
going to `http://localhost:8000`.

Welcome... to Lift Stuff: an application for programmers like us - who spend all of
our time on a computer - to stay in shape and record the things that they lift.
Let me show you: login is `ron_furgandy`, password `pumpup`. This is the only important
page on the site. On the left, we have a history of the things that we've lifted,
like our cat. We can lift many different things, like a fat cat, our laptop, or our
coffee cup. Let's get in shape and lift our coffee cup 10 times. Boom! Our progress
is saved, and we're even moving up the super-retro leaderboard on the right!

## Setting up the Delete Link

But, from a JavaScript standpoint, this is all *incredibly* traditional. Snooze!
Our first job - in case someone makes a mistake - is to add a delete icon to each
of these rows. When we click that, we'll send an AJAX request to delete it, then
remove the row entirely and update the total at the bottom.

Right now, this entire page is rendered on the server, and the template lives at
`app/Resources/views/lift/index.html.twig`

Inside, we're looping over something I call a `repLog` to build the table. Each `repLog`
represents one thing we've lifted, and it's the only important table in the database.
It has an `id`, the *number* of reps that we lifted, what we lifted and the total
weight.

## Adding the Delete link and js- class

To add the delete link, inside the last `<td>` add a new anchor tag. Set the `href`
to `#`, since we'll control this in JavaScript. And then, give it a class called
`js-delete-rep-log`. Inside, add our cute little delete icon.

Ok, first! Why did we add this `js-delete-rep-log` class? Well, there are only ever
two reasons to add a class: because you want to style that element, or because you
want to find that element in JavaScript.

Our goal is the second, and by prefixing the class with `js-`, it makes that *perfectly*
obvious. This is a fairly popular standard: when you add a class for JavaScript,
give it a `js-` prefix, and stop wondering which classes are for styling and which
are for JavaScript.

Copy that class then head to the bottom of the template. Add a block `javascripts`,
and `endblocks` and all the `parent()` function. This is just Symfony's way of adding
JavaScript to a page. Inside, add a `<script>` tag and then, use jQuery to find the
`.js-delete-rep-log`, and then `.on('click')`, call this new function. For now, just
`console.log('todo delete!')`.

## Resolving External JS in PHPStorm

But hmm, PhpStorm says that `$` is an unresolved function or method. Now, I *do*
have jQuery on the page. Open the base layout file - `base.html.twig` - and scroll
to the bottom: both jQuery and Bootstrap are included from a CDN. Oh, but this note
says that there is no locally stored library for the http link. Aha! Tell PhpStorm
to download and learn that library by pressing `option+enter` on a Mac - or `alt+enter`
on Linux or Windows - and choosing "Download Library". Do the same thing for Bootstrap.

And as *soon* as you do that, the error is gone. We'll start getting at least *some*
auto-completion now.

## Using .on() versus .click()

Now notice, we're using `.on('click')` instead of the `.click()` function. Why?
Well, they both do the exact same thing, but since there are an *infinite* number
of events you could listen to - click, change, keyup, mouseover or even custom, invented
events - it makes a lot more sense to always use `.on()` and pass it that event name.

Ok, simple start! But already when we refresh, open the console, and click delete,
it's working. Now, let's follow the rabbit hole deeper.
