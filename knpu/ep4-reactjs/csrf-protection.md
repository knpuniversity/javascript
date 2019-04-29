# CSRF Protection Part 1

We've *gotta* talk about one more thing: security. Specifically, CSRF attacks.

## CSRF Attack?

Imagine if a malicious person built an HTML form on a totally different site, but
set its `action=""` attribute to a URL on *our* site. Then, what if some user, like
me, who is logged into our site, was tricked into submitting that form? Well, the
form would submit, I would of course be authenticated, and the request would be
successful! That's a problem! The malicious user was basically able to make a request
to our site logged in as me! They could have done anything!

The other possible attack vector is if a malicious user runs JavaScript on their
site that makes an AJAX call to our site. The result is exactly the same.

## Do APIs Need Protection?

So, how can we protect against this in an API? The answer... you might not need
to. If you follow two rules, then CSRF attacks are not possible.

***TIP
Update: While this section *may* be true - especially if you add a CORS
same-origin policy, relying on the `Content-Type` for CSRF protection is
not recommended: new browsers may (and have) introduced new features that
make this protection incomplete. The best practice is to use CSRF tokens,
as we'll show!
***

First, disallow AJAX requests from all domains except for your domain. Actually,
this is just how the Internet works: you can't make AJAX requests across domains.
*If* you *do* need to allow other domains to make AJAX requests to your domain,
you do that by setting CORS headers. If you're in this situation, just make sure
to only allow specific domains you trust, not everyone. This first rule prevents
bad AJAX calls.

For the second rule, look at our API: `src/Controller/RepLogController`. Find
`newRepLogAction()`. Notice that the body of the request is JSON. This is the second
rule for CSRF protection: *only* allow data to be sent to your server as JSON.
This protects us from, for example, bad forms that submit to our site. Forms cannot
submit their data as JSON.

If you follow these two rules - which you probably do - then you do not need to
worry about CSRF. But, to be *fully* sure, we *are* going to add one more layer:
we're going to force all requests to our API to have a `Content-Type` header
set to `application/json`. By requiring that, there is *no* way for a bad request
to be made to our site, unless we're allowing it with our CORS headers.

Oh, and important side note: CSRF attacks only affect you if you allow session-based
authentication like we're doing, or HTTP basic authentication. If you require an
API token, you're also good!

## Creating the Event Susbcriber

We're going to require the `Content-Type` header by creating an event subscriber,
so that we don't need to add this code in *every* controller. First, to speed things
up, install MakerBundle:

```terminal
composer require maker --dev
```

When that finishes, run:

```terminal
php bin/console make:subscriber
```

Call it `ApiCsrfValidationSubscriber`. And, listen to the `kernel.request` event.
Done! This made one change: it created a new class in `src/EventSubscriber`.

[[[ code('68a3c54dfd') ]]]

Awesome! Because we're listening to `kernel.request`, the `onKernelRequest()`
method will be called on every request, *before* the controller. At the top of
the method, first say if `!$event->isMasterRequest()`, then return. That's an internal
detail to make sure we only run this code for a real request.

[[[ code('e8d97e0549') ]]]

Next, we do not need to require the `Content-Type` header for safe HTTP methods,
like GET or HEAD, because, unless we do something awful in our code, these requests
don't *change* anything on the server. Add `$request = $event->getRequest()`. Then,
if `$request->isMethodSafe(false)`, just return again.

[[[ code('2574d354c2') ]]]

The `false` part isn't important: that's a flag for a backwards-compatibility layer.

Perfect! Next, we need to determine whether or not this request is to our *api*.
We'll do that with a cool annotation trick. Then, we'll make sure the `Content-Type`
header is set to `application/json`.
