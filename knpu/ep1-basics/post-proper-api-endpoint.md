# Proper JSON API Endpoint Setup

It's time to graduate from this old-school AJAX approach where the server sends
us back JSON! Its still super easy to do, but it's going the way of the dinosaurs.
Instead, let's treat our server like a true API that sends and receives JSON.

First, in `LiftController::indexAction`, let's remove the two AJAX if statements
from before: we won't use them anymore. In fact, we're not going to use this endpoint
at all anymore. So, close this file.

Next, head to your browser, refresh, and view the source. Find the `<form>` element
and copy the entire thing. Then back in your editor, find `_form.html.twig` and
completely replace this file with that.

## Setting up our HTML Form

In short, we are *not* going to use the Symfony Form component to render the form.
It's not because we *can't*, but this will give us a bit more transparency on how
our form looks. If you like writing HTML forms by hand, then write your code like
I just did. If you're using Symfony and like to have *it* do the work for you,
awesome, use Symfony forms.

We need to make two adjustments. First, get rid of the CSRF `_token` field. Protecting
your API against CSRF attacks is a little more complicated, and a topic for another
time. Second, when you use the Symfony form component, it creates `name` attributes
that are namespaced. Simplify each `name` to just `item` and `reps`. We're just
making our life easier.

By the way, if you *did* want to use Symfony's form component to render the form,
be sure to override the `getBlockPrefix()` method in your form class and return
an empty string. That will tell the form to render simple names like this.

## Checking out the Endpoint

Our goal is to send this data to a true API endpoint, get back JSON in the response,
and start handling that.

In `src/AppBundle/Controller`, open another file: `RepLogController`. This contains
a set of API endpoints for working with RepLogs: one endpoint returns a collection,
another returns *one* RepLog, another deletes a RepLog, and one - `newRepLogAction` -
can be used to *create* a new RepLog.

I want you to notice a few things. First, the server expects us to send it the data
as JSON. Next, if you *are* a Symfony user, you'll notice that I'm still handling
the data through Symfony's form system like normal. If it fails form validation,
we're returning a JSON collection of those error.s The `createApiResponse()` method
uses Symfony's serializer, which is a fancy way of returning JSON.

On success, it does the same thing. You're welcome to open up these classes if you'd
like, but ultimately, this returns JSON data that describes the newly-added RepLog.
We'll see *exactly* what it looks like in a second.

## Updating the AJAX Call

Ok! Let's update our AJAX call to go to *this* endpoint. In `RepLogApp`, down in
`handleNewFormSubmit`, we somehow need to get that URL. No problem! Find the form
and add a fancy new `data-url` attribute set to `path()`, then the name of that
route: `rep_log_new`.

Bam! Now, back in `RepLogApp`, before we use that, let's clear out *all* the code
that actually updates our DOM: all the stuff related to updating the form with the
form errors or adding the new row. That's all a TODO for later.

But, *do* add a `console.log('success')` and `console.log('error')` so we can see
if this stuff is working! Finally, update the `url` to `$form.data('url')`.

Next, our `data` format needs to change.
