# JS Class Prefix

Okay guys, let's get pumped up!

Today we're talking about JavaScript. No, not the basics. I get it, you know how to write JavaScript. You're very good with j Query, you've made lot's of fancy sites that do fancy things. That's awesome, that's exactly where I want you to be because in this tutorial we're going to start asking questions about things that we thought we understood. We're going to investigate how JavaScript actually works under the hood and fill in some blanks in our knowledge.

Not only is that going to make us much more dangerous when we write our JavaScript and use other people's JavaScript but it's going to lead us to our real goal which is future tutorials that talk about really cool things like module loaders and front end frameworks like react J.S. Yes, we are going to start simple with a traditional html website where little by little we add more and more fancy stuff to it. Eventually, in a few tutorials we'll have transitioned entirely to a site that is driven by JavaScript where all of the html is actually rendered and handled on the client side.

In this tutorial, we're going to hit a lot of things that maybe you don't know well like event bubbling and how the heck that crazy this variable, which is always changing what it means and looks like at different times. What about prototypical inheritance, immediately invoked function expressions, delegate selectors, promises. Let's got to work.

As always, please, please, please code along with me. Click download on this page to download the course code on zip it and you should see a start directory which will contain the same code that you see here. Open up the readme.md file, follow the instructions and get your project set up.

The last step will be to open a terminal, move into your project and run bin consul server colon run to start the built-in P2 web server. Now, this is a symphony project but we're not going to talk a lot about symphony, we're going to focus on JavaScript. Pull up the site by going to local host colon 8,000 and welcome to lift stuff.

AN applicant for programmers like us who spend all of our time on the computer to record what things they lift to stay in shape. Let me show you. Login is ron_burgandy, password pumpedup. This is the only page on the site. See on the left here, we have a history of the things that we have lifted like our cat. Maybe we have a fat cat, our laptop, or our coffee cup. Let's lift our coffee cup 10 times and then it adds to our weight here and you can see us moving up the awesome [inaudible 00:03:32] leaderboard on the right.

Our first job, because sometimes I make a mistake is to add a little delete icon to each of these rows. We click that, we'll send an ajax request, delete that from the database and then remove the row and updates the total down here. The template for this lives in applicant resources views lift slash index dot html dot twig.

Inside of there we move over something called a rep log. Rep log is how we record the things that we've lifted. It's the only important table in our database and it's pretty simple. It has an ID, it has the number of reps that we lifted, has what we lifted and the total weight lifted. On that TD, let's add a new anchor tag. We'll set it to [inaudible 00:04:36] pound sign since we're going to take control of the JavaScript and then give it a class called JS-delete-rep-log. Inside we'll add our little delete icon.

First thing to notice, why are we adding this JS-delete-rep-log class? Well, it's not for styling, we're adding this class because we want to hook up JavaScript to this element so this is a fairly popular standard that when you add a class because you want to use that class with JavaScript prefix it with JS- that way you know which classes are for styling and which classes are for JavaScript.

Next we'll cop that class down to the bottom, add a block JavaScripts end block and then call the parent function. Symphony specific but this is the way that we add JavaScript to our page. Inside we'll add a script tag and then very simply, dollar sign, open parenthesis, dot paste our class, dot on, click and then we'll call function and inside we'll say console that log to do delete. Perfect. Note that there are already 2 things that I want you to notice. First, notice that the dollar sign says unresolved function or method. Now, I do have j Query included on my page. Go and [inaudible 00:06:33] and scroll to the bottom, you see that I have j Query and Bootstrap included from a CDM which also notes that [inaudible 00:06:42] says that there is no locally stored library for the http link. To fix that, you can press option enter on a mac and select download library. I'll do the same thing for Bootstrap.

As soon as you do that you'll notice that that error goes away and we'll start getting at least some auto-completion of other functions. Second thing, I used dot on click instead of dot click. They both do the same thing but there are an infinite number of events that you can listen to on an element so instead of having to call a method for each one, just always use dot on and pass it click, change, key up, hover, mouse over, whatever.

Really simple setup but if we refresh the page, open up the console and click delete, we have it working. Now, let's go deeper.
