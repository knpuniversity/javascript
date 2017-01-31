# Proper JSON API Endpoint Setup

It's time to graduate from this old-school AJAX approach where the server sends us
HTML, to one where the server sends us ice cream! I mean, JSON!

First, in `LiftController::indexAction()`, let's remove the two AJAX if statements
from before: we won't use them anymore:

[[[ code('8d70e1c276') ]]]

In fact, we're not going to use this endpoint at all. So, close this file.

Next, head to your browser, refresh, and view the source. Find the `<form>` element
and copy the entire thing. Then back in your editor, find `_form.html.twig` and
completely replace this file with that:

[[[ code('f9270b6d24') ]]]

## Setting up our HTML Form

In short, we are *not* going to use the Symfony Form component to render the form.
It's not because we *can't*, but this will give us a bit more transparency on how
our form looks. If you like writing HTML forms by hand, then write your code like
I just did. If you *are* using Symfony and like to have *it* do the work for you,
awesome, use Symfony forms.

We need to make two adjustments. First, get rid of the CSRF `_token` field. Protecting
your API against CSRF attacks is a little more complicated, and a topic for another
time. Second, when you use the Symfony form component, it creates `name` attributes
that are namespaced. Simplify each `name` to just `item` and `reps`:

[[[ code('5939cc3d40') ]]]

We're just making our life easier.

By the way, if you *did* want to use Symfony's form component to render the form,
be sure to override the `getBlockPrefix()` method in your form class and return
an empty string:

```php
SomeFormClass extends AbstractType
{
    public function getBlockPrefix()
    {
        return '';
    }
}
```

That will tell the form to render simple names like this.

## Checking out the Endpoint

Our goal is to send this data to a true API endpoint, get back JSON in the response,
and start handling that.

In `src/AppBundle/Controller`, open another file: `RepLogController`. This contains
a set of API endpoints for working with RepLogs: one endpoint returns a collection,
another returns *one* RepLog, another deletes a RepLog, and one - `newRepLogAction()` -
can be used to *create* a new RepLog:

[[[ code('f747b66cf3') ]]]

I want you to notice a few things. First, the server expects us to send it the data
as JSON:

[[[ code('92efad4e14') ]]]

Next, if you *are* a Symfony user, you'll notice that I'm still handling
the data through Symfony's form system like normal:

[[[ code('07a00cd019') ]]]

If it fails form validation, we're returning a JSON collection of those errors:

[[[ code('4aa775f60a') ]]]

The `createApiResponse()` method uses Symfony's serializer, which is a fancy way
of returning JSON:

[[[ code('99cf6afd45') ]]]

On success, it does the same thing: returns JSON containing the new RepLog's data:

[[[ code('cad1fd4017') ]]]

We'll see *exactly* what it looks like in a second.

## Updating the AJAX Call

Ok! Let's update our AJAX call to go to *this* endpoint. In `RepLogApp`, down in
`handleNewFormSubmit`, we need to somehow get that URL:

[[[ code('a9637390a2') ]]]

No problem! Find the form and add a fancy new `data-url` attribute set to `path()`,
then the name of that route: `rep_log_new`:

[[[ code('809a47da15') ]]]

Bam! Now, back in `RepLogApp`, before we use that, let's clear out *all* the code
that actually updates our DOM: all the stuff related to updating the form with the
form errors or adding the new row. That's all a todo for later:

[[[ code('0beff29eab') ]]]

But, *do* add a `console.log('success')` and `console.log('error')` so we can see
if this stuff is working!

[[[ code('b6d89d1b04') ]]]

Finally, update the `url` to `$form.data('url')`:

[[[ code('4b8201ea0a') ]]]

Next, our `data` format needs to change - I'll show you exactly how.
