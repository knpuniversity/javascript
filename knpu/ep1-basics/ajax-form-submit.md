# AJAX Form Submit: The Lazy Way

I'm feeling pretty awesome about all our new skills. So let's turn to a new goal
that'll uncover some new cool stuff. Below the RepLog table, we have a very traditional
form. When we fill it out, it submits to the server: no AJAX, no fanciness.

And no fun! Let's update this form to submit via AJAX. Of course, that comes with
a few other challenges, like dynamically adding a new row to the table afterwards.

## AJAXify the Form

In general, there are two ways to AJAXify this form submit. First, there's the simple,
traditional, easy, and lazy way! That is, we submit the form via AJAX and the server
returns HTML. For example, if we forget to select and item to lift, the AJAX would
return the form HTML with the error in it so we can render it on the page. Or, if
it's successful, it would probably return the new `<tr>` HTML so we can put it into
the table. This is easier... because you don't need to do *all* that much in JavaScript.
But, this approach is quickly getting really outdated.

The second approach, the more modern approach, is to actually treat your backend
application like an API. This means that we'll only send JSON back and forth. But
this means we'll need to do more work in JavaScript! Like, we might need to actually
build the new `<tr>` row by hand with the JSON data!

Obviously, *that* is where we need to get to! But we'll start with the old-school
way first, and then refactor to the modern way as we learn more and more cool stuff.

## Making $wrapper Wrap Everything

In both situations, step one is the same: we need attach a listener on submit of
the form. Head over to our template. The form itself lives in another template that's
included here: `_form.html.twig` inside `app/Resources/views/lift`.

This is a Symfony form, but all this fanciness ultimately renders a good, old-fashioned
`form` tag. Give the form another class: `js-new-rep-log-form`. Copy that and head
into `RepLogApp` so we can attach a new listener. But wait... there *is* one problem:
the `$wrapper` is actually the `<table>` element... and the form does *not* live
inside of the `<table>`.

When you create little JavaScript applications like `RepLogApp`, you want the wrapper
to be an element that goes around *everything* that you want to manipulate.

Ok, no problem: let's movethe `js-rep-log-table` class from the table itself, and
instead add it to the `div` that surrounds *everything*. Down below, I don't need
to change anything here, but let's rename `$table` to `$wrapper` for clarity.

## The Form Submit Listener

*Now* adding our listener is simple: `this.$wrapper.find()` and look for
`.js-new-rep-log-form`. Then, `.on('submit')`, have this call a new method:
`this.handleNewFormSubmit`. And don't forget the all-important `.bind(this)`.

Down below, add that function - `handleNewFormSubmit` - and give it the event argument.
This time, calling `e.preventDefault()` will prevent the form from *actually* submitting,
which is good. For now, just `console.log('submitting')`.

Ok, let's try it! Head back, refresh, and try the form. Yes! We get the log, but
the form doesn't submit.

## Adding AJAX

Turning this form into an AJAX call will be really easy... because we already know
that this form works if we submit it in the traditional way. So let's just literally
send that *exact* same request, but via AJAX.

First, get the form with `$form = $(e.currentTarget)`. Next, add `$.ajax()`, set
the `url` to `$form.attr('action')` and the `method` to `POST`. For the `data`, use
`$form.serialize()`. That's a really lazy way to get all the values for all the fields
in the form and put them in the exact format that the server is accustomed to seeing
for a form submit.

That's already enough to work! Submit that form! Yea, you can see the AJAX calls
in the console and web debug toolbar. Of course, we don't see any new rows until
we manually refresh the page...

So that's where the real work starts: showing the validation errors on the form
on error and dynamically inserting new rows on success. Let's do it!
