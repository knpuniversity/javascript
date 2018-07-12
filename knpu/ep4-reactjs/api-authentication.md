# API Auth & State via AJAX

When we used `fetch()` to make an AJAX call to `/reps`... we were "rewarded" with
this big ugly error. This tells me that fetch is *probably* having problems... for
*some* reason... parsing the JSON in the response.

Let's go see what happened! Click on the Network tab in your browser tools and filter
for only XHR requests. Ah, here is one for `/reps` that was successful. BUT! That's
the *wrong* AJAX call: this is the AJAX call made by our *old* code. So... where
the heck is the *other* `/reps` AJAX call that was just made by `fetch()`?

Click instead to filter by the "Other" tab. There it is! Why is it here? Well...
because... something went wrong. Look at the response: 302. And if you look at the
response headers... woh! It is a redirect to the login page, which is why you see
a *second* request below for `/login`.

Let's back up. First, for some reason, authentication is failing for the API request.
We'll get to that in a minute. Second, `fetch()` requests will *normally* show up
under the XHR network filter. We'll see that later. But, if something goes wrong,
the request *may* show up under "Other". Just be aware of that: it's a gotcha!

## Sending the Cookie Headers

So, why the heck is authentication failing? If we go directly to `/reps`, it works!
What's wrong with you fetch!

This, in my opinion, is one of the really cool things about fetch. Look at our
controller. Ah, every endpoint requires us to be logged in! This works in our browser
because our browser automatically sends the session cookie. But `fetch()`, on the
other hand, does *not* automatically send any cookies when it makes a request.

## What Type of Authentication to Use?

I like this because it *forces* you to ask yourself:

> Hey, how *do* I want to authenticate my API requests?

API authentication is a big topic. So we're going to skip it! I'm kidding: it's
too important.

One way or another, *every* API request will have *some* sort of authentication
data attached to it - maybe a session cookie or an API token set on a header.

So... what type of authentication *should* you use for your API? Honestly, if you're
building an API that will be consumed by your own JavaScript front-end, using session
cookies is an *awesome* option! You don't need anything fancier. When we login, that
sets a session cookie. In a moment, we'll tell fetch to *send* that cookie, and
everything will be solved. If you want to build your login page in React and send
the username and password via AJAX, that's totally fine: when your server sends
back the session cookie, your browser will see it & store it. Well, as long as you
use the `credentials` option that I'm about to show you for that AJAX call.

Of course, if you want, you can also create an API token authentication system,
like JWT or OAuth. That's totally fine, but that truly *is* a separate topic.


Whatever you choose, when it's time to make your API call, you will *attach* the
authentication info to the request: either by sending the session cookie or your
API token as a header.

## Sending the Session Cookie

To send the session cookie, fetch has a second options argument. Add `credentials`
set to `same-origin`. Thanks to this, `fetch()` will send cookies to any requests
made back to *our* domain.

***TIP
The default value of `credentials` may change to `same-origin` in the future.
***

Ok, let's see if this fixes things! Move over and refresh. No errors! Check out
the console. Yes! *There* is our data! Notice, the API wraps everything inside an
`items` key. Yep, inside: the 4 rep logs, which have the same fields as the state
in our app. That was no accident: when we added the static data, I made sure it
looked like the *real* data from the API so that we could swap it out later.

## Processing the fetch data via Promises

In `rep_log_api`, I really want my `getRepLogs()` API to return a Promise that
contains the *array* of rep logs... without that `items` key. To do that, it's
a bit weird. The `.json()` method returns another Promise. So, to do further processing,
chain a `.then()` from it and, inside the callback, return `data.items`.

Promises on top of promises! Yaaaay! When `fetch()` finishes, it executes our first
callback. Then, when the JSON decode finishes, it executes our *second* callback,
where we read off the `.items` key. Ultimately, `getRepLogs()` returns a `Promise`
object where the data is the array of rep logs. Phew!

And because the browser already refreshed while I was explaining all of the promises,
yep! You can see the logged data is now the array.

## componentDidMount

Awesome! Let's use this to set our initial state! First, set the initial `repLogs`
state to an empty array. Next, copy the `getRepLogs()` call and remove it. Instead,
create a new method called `componentDidMount()` and paste this there. In the callback,
use `this.setState()` to set `repLogs` to `data`.

Before we talk about this, let's try it. Refresh! Woh! We have *real* data! Yes,
yes, yes! We're showing the *same* data as our original app!

Back to the code! Until this moment, `render()` was the only "special", React-specific,
method in our class. But there are a *few* other special methods called "lifecycle"
methods. The `componentDidMount()` method is one of those: if this exists, React
calls it right *after* our component is rendered to the DOM. And *this* is best
place to make any AJAX requests needed to populate your initial state.

Actually, we *could* have left this code in the `constructor()`. Because we're
in a browser, they're *almost* the same. But, `componentDidMount()` is generally
the recommended place.
