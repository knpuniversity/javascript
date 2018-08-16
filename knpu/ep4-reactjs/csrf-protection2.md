# CSRF Protection Part 2

The *only* tricky thing is that we *only* want to require the `Content-Type`
header when the user is requesting an API endpoint. In our application, this
means all the endpoints inside of `RepLogController`. So, we could see if the URL
starts with `/reps`... but that could get ugly later if the API grows to a lot
of *other* URLs.

If your app is *entirely* an API, that's easy! Or if all the URLs start with
`/api`, that's also easy to check.

But, in our app, let's use a different trick... which is gonna be kinda fun.

Above the controller class, add `@Route()` with `defaults={}` and a new flag that
I'm inventing: `_is_api` set to `true`.

[[[ code('7872014977') ]]]

When you put an `@Route` annotation above the controller class, it means its config
will be applied to all of the routes below it. Now, inside of the subscriber, we
can read this config. To see how, add `dump($request->attributes->all())` then die.

[[[ code('fd2596898e') ]]]

If you refresh the main page... no `_is_api` here. But now go to `/reps`. There
it is! Any `defaults` flags that we set are available in `$request->attributes`.

## Creating a Custom ApiRoute Annotation

The only problem is that this syntax is... oof... gross. Let's make it easier. In
the `Api` directory, create a new PHP class called `ApiRoute`. Make this extend
the normal `Route` annotation class.

Yep, we're creating a brand new, customized route annotation. Add `@Annotation`
above the class.

[[[ code('9bcf54870a') ]]]

If we did nothing else, we could at least go into our controller and use it:
`@ApiRoute()`.

[[[ code('cceff0d871') ]]]

Try it! Nothing changes. But *now*, in `ApiRoute`, go to the Code -> Generate menu -
or Command+N on a Mac - and override the `getDefaults()` method. Return a merge
of `_is_api` set to true and `parent::getDefaults()`.

[[[ code('af97fcb7b1') ]]]

Nice, right? Back in the controller, remove the ugly `defaults` stuff. Oh, and
if you want to mark just *one* route as an API route, you can also use this new
annotation above just one method.

Ok, go back and refresh! Got it!

## Validating the Content-Type Header

Back in the subscriber, remove the dump. Then, if `!$request->attributes->get('_is_api')`
return. And now that we know were only operating on API requests, check the header:
if `$request->headers->get('Content-Type')` does not equal `application/json`,
we have a problem! Create a new 400 response: `$response = new JsonResponse()`.

The data we send back doesn't matter - I'll add a message that says what went
wrong. But, give this a 415 status code: this means "Unsupported Media Type".
Finish this with `$event->setResponse($response)`. This will completely stop the
request: this response will be returned *without* even calling your controller.

[[[ code('7c382ab4d7') ]]]

Ok, let's try this! Find the `rep_log_api.js` file and look down at `createRepLog`.
We *are* setting this `Content-Type` header. So, this should work! Move over,
go back to `/lift` and refresh. I'll open my network tools. And.. yea! It totally
works! But try to delete a rep log... failure! With a 415 status code.

## Always Sending the Content-Type Header

This is because the DELETE endpoint does *not* set this header. And... hmm, it's
kinda weird... because, for the DELETE endpoint, the body of the request is empty.
There's some debate, but, because of this, some people would argue that this request
should not need *any* `Content-Type` header... because we're not *really* sending
any JSON!

But, by requiring this header to *always* be set, we give our application a bit
more security: it removes the possibility that's somebody could create a CSRF
attack on that endpoint... or some future endpoint that we don't send any data to.

In other words, we are *always* going to set this header. Remove it from
`createRepLog` and go up to `fetchJson()` so we can set this here. The only tricky
thing is that it's *possible* that someone who calls this will pass a custom header,
and we don't want to override that.

Add `let headers = ` and set this to the `Content-Type` header. Then, if
`options && options.headers` - so, if the user passes a custom header, merge them
together: `headers = `, `...options.headers` then `headers`. Then, delete that
property and, below, pass `headers` to `headers`.

[[[ code('cffd715ced') ]]]

Try it! Move over - looks like the page already refreshed. And... yes! We can
delete again!

And we are protected from CSRF! That's because, first, we do *not* allow other
domains to make AJAX calls to our site and, second, all of our API endpoints require
a JSON body - which we *explicitly* required by looking for the `Content-Type`
header.

Oh my gosh.... we're done! That's it, that's everything! If you've made it all
the way through, you rock! You have the tools to create the craziest frontend
you can think of! And yes, there *are* more things in React that we could cover,
like the React router or Redux, which adds a more complex architecture on top
of React, but helps solve the problem of passing around so many props.

But, these are extras - go get some *real-world* success with React and report
back! We'd love to know what you're building.

Alright people, seeya next time.
