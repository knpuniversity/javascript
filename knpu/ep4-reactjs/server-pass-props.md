# Passing Server Data to React Props

We need to load this `itemOptions` data dynamically from the server. Copy the
options and then find the template for this page: `templates/lift/index.html.twig`.

At the bottom, you'll find the script that loads our app. *Before* this, create
a new *global* variable. So, use the `window` object: `window.REP_LOG_APP_PROPS =`
an object with `itemOptions` set to our options.

*Now*, go back to `rep_log_react.js` delete the old constant and, below, use
`window.REP_LOG_APP_PROPS.itemOptions`.

## When is it Ok to Use window?

This *will* work... but... now I have a question. Why couldn't we just copy this code and
use it in `RepLogCreator` instead of passing the prop down all the levels? You
*could*. But, as a best practice, I don't want *any* of my React components to use
variables on the `window` object. The only place where I want you to feel safe
using the global window object is inside of your entry point: it should grab all
of the stuff you need, and pass it *into* your React app.

Like everything, don't live and die by this rule. But, the `window` object is a
global variable. And, just like in PHP, while global variables are easy to use,
they make your code harder to debug and understand. Use them in your entry, but
that's it.

## Spreading all of the Props

Back in the template, I built the `REP_LOG_APP_PROPS` variable so that we could,
in theory, set *other* props on it. For example, add `withHeart: true`. In the
entry file, to read this, we could of course use `window.REP_LOG_APP_PROPS.withHeart`.
Or... we can be way cooler! Use spread attributes: `...window.REP_LOG_APP_PROPS`.

Suddenly! All of the keys on that object will be passed as props! And this is cool:
set `shouldShowHeart` to false. Hmm: we're now passing `withHeart=false`... but
thanks to the spread prop, we're passing that prop *again* as true.

When you do this, the *last* prop always wins. Yep, we *do* see the heart.

This is a *cool* way to render a component with initial data that comes from the
server.

## Dumping JavaScript in Twig

Well, the data isn't *quite* dynamic yet. Let's finally finish that. Open the
form: `src/Form/Type/RepLogType.php`. The `choices` options is the data that we
want to send to React. Copy `RepLog::getThingsYouCanLiftChoices()`.

Then, go into the controller that renders this page - `LiftController` and find
`indexAction()`. First, let's `dump()` that function to see what it looks like.

Move over and refresh! Interesting! It's an array... but it doesn't quite look
right. Let's compare this to the structure we want. Ok, each item has an ide
like `cat` or `fat_cat`. That is the *value* on the array. We also need a `text`
key. My app is using the translator component. The *keys* on the dumped array
need to be run through the translator to be turned into the English text.

Actually, the details aren't important to. The point is this: our app *does* have
the data we need... but we need to "tweak" it a little bit to match what our
React app is expecting.

To do that, go back to the controller. To save us some tedious work, I'll paste
in some code. This code uses the `$translator`. To get that, add a new controller
argument: `TranslatorInterface $translator`.

Cool! This code builds the structure we need: it has an `itemOptions` key, we
loop over each, and create the `id` and `text` keys. *Now* when we refresh, yep!
the dumped code looks *exactly* like our `REP_LOG_APP_PROPS` JavaScript structure!
Heck, we can add `withHeart => true`... because I like the heart.

Remove the `die` and pass this into twig as a new `repLogAppProps` variable.

Ready for the last piece? Delete the old JavaScript object and replace it with:
`{{ repLogAppProps|json_encode|raw }}`.

That will print that array as JSON... which of course, is the same as JavaScript.

Ah, do you love it? It's now *very* easy to pass dynamic values or initial state
into your app. Try it: refresh! Heck it even works!

## Removing the Old Code!

And... woh! Our app is now basically working! Yea, we're going to look at a few
more things, but I think it's time to *delete* our old code and put this app into
the right spot. In other words, it's time to celebrate!

Start by deleting this entire old `Components` directory: all of that code was
used by the old app. Delete the old entry file - `rep_log.js` and inside of
the template, we can remove a *ton* of old markup. The new `lift-stuff-app` div
*now* lives *right* next to the leaderboard.

Oh, and delete `_form.html.twig` too - more old markup. At the bottom, remove the
original script tag.

And in `webpack.config.js`, delete the old entry. Wow! Webpack is angry because
of the missing entry file. Stop and restart it:

```terminal-silent
yarn run encore dev-server
```

It builds! Go back and refresh! It's alive! And it works! Except... it's jumpy
when it loads. The leaderboard starts on the left, then moves over once our app
renders.

This is caused by a *mistake* I made. Look inside `RepLogs`. This is our main
presentation component: it gives us all the markup. And, it has a `col-md-7` class
on it. Now, it's not wrong to put grid classes like this inside React. But, this
top-level grid class *is* a bit weird: if we tried to use this component in a different
place in our site, it would *always* have that `col-md-7`. It makes more sense
sense to *remove* that class and, instead, in `index.html.twig`, add the class
there. Now, our React app will just fit inside this.

And when you reload the page, yes: no annoying jumping!

Next: we *know* that React can be used to create re-usable components... but we
haven't really done this yet. Time to change that!
