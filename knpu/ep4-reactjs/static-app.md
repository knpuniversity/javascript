# Build the Static App First

One of our *big* goals in this tutorial is to create a repeatable path to success.
And, we're *already* doing that! Step 1 is always to create an entry file. That
file doesn't do much *except* render a `React` component onto your page.

Step 2, in that React component, build out an entirely static version of your app.
First do this in pure HTML. Then, create some hardcoded variables and render those.
For example, we *first* built one dummy `tr` element by hand and *then* created a
hardcoded `repLogs` array and used *that* to build the rows.

So, step 2 for success is to build your entire UI statically... and *then*,
*soon*, we will make things dynamic and fancy.

## Adding the Static Form

The only UI that's missing form our app now is the form below the table. No problem!
Go back into `templates/lift/index.html.twig`. Ah, the form lives in another
template: `_form.html.twig`. Open that: it's just a normal, boring HTML form.
That's perfect! Copy *all* of it, close the file, go back into `RepLogApp` and,
under the table, paste!

[[[ code('194902c4f9') ]]]

Except, scroll up a little bit, because we need to do some cleanup! The form doesn't
need this class anymore: that was used by the old JavaScript. The same is true for
the `data-url` element. And `noValidate` disables HTML5 validation. But, HTML5 validation
is nice to have: it will enforce the `required` attribute on the fields. So, remove
it.

[[[ code('c5389b9797') ]]]

Oh, but I want you to notice something! The attribute was `noValidate` with a capital
"V"! In the original template, it was `novalidate` with a lowercase "v": that's how
the property is called in HTML. When we pasted it, PhpStorm updated it for us. This
is one of those uncommon situations - like `class` and `className` where the HTML 
attribute is *slightly* different than what you need to use in React. I want to
point that out, but don't over-think it: almost everything is the same, and React
will usually warn you if it's not.

Cool! Try it out: refresh! Awesome! We have a form!

## Using form defaultValue

Hmm, but the styling is not *quite* right. *And*, we have a warning about using
a `defaultValue`. Let's fix that first. We'll talk a lot more about forms in React
later. But basically, *React* is a control freak, it *really* really* wants to
manage the values of any elements on your form, including which option is selected.
So, instead of using `selected="selected"`, you can use `defaultValue=""` on the
`select` element and set it to the value of the option you want. I'll skip that part
because the first option will be automatically selected anyways.

## Adding Ugly Manual Whitespace

Ok, back to the styling problem. Inspect element on the form itself, right click
on it, and go to "Edit as HTML". Ah, React renders as one big line with *no* spaces
in it. 99% of the time... we don't care about this: usually whitespace is meaningless.
But, in this case, the form is an inline element: we *need* a space between the
first two fields, and between the last field and the button. Without the space,
everything renders "smashed" together.

The fix is both simple... and ugly: use JavaScript to print an extra space. Do it
in both places. Yep, weird, but honestly, I *rarely* need to do this: it's just not
a problem you have very often.

[[[ code('8ef9d48848') ]]]

Try it again... yep! It looks *much* better! And we have our static app!

## Using the Dev Server

Before we go kick more butt, I want to make one adjustment to our workflow. We're
using Webpack Encore. We ran it with:

```terminal
yarn run encore dev --watch
```

Thanks to that, each time we update a file, it notices, and re-builds our assets.
But rather than using `encore dev`, use `encore dev-server`. This is pretty interesting:
instead of writing physical files to our `public/build` directory, this starts
a new web server in the background that *serves* the built assets.

Check this out: go back and refresh the app. *No* visible differences. But now,
view the page source. Suddenly, instead of pointing locally, like `/build/layout.css`,
every asset is pointing to that new server: `http://localhost:8080`! This magic
URL changing is thanks to Webpack Encore *and* some config changes we made to our
Symfony app in the [Encore tutorial](https://knpuniversity.com/screencast/webpack-encore).

The web server - `http://localhost:8080` - is the server that was just started
by Webpack. When you request an asset from it, Webpack returns the latest, built
version of that file. What's weird is that the built assets are no longer physically
written to the filesystem. Nope, we just fetch the dynamic version from the new server.

Ultimately... this is just a different, fancier way to make sure that our code
is always using the latest version of the built assets. But, as your app gets more
complex, it *may* become possible for you to refresh your page *before* Webpack has
been able to physically write the new files! However, if you use the `dev-server`
and refresh too quickly, your browser will *wait* for the CSS or JavaScript files
to be ready, before loading the page. And, as an added "nice thing", the dev server
will cause our browser to automatically refresh whenever we make changes.

*Anyways*, or goal was to build our entire app with a static UI. And, we've done
that! Sure, we have *some* fanciness: we learned that we can pass "props" into
our components and then use those to render things dynamically. So, our app is
"kind of" dynamic, because we can control different parts of how it looks by passing
different props. But... once our component is rendered, it's static. For example,
once we render `RepLogApp` with a heart... it will have a heart *forever*.

But, the *whole* point of using React is so that our UI will automagically update
when data changes! And we'll do that with something very, very important called
state.
