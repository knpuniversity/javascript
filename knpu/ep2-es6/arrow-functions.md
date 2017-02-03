# Arrow Functions

The first big feature that you will see everywhere with modern JavaScript is the arrow function. Which, at first seems like just a little bit of syntax sugar. The arrow function replaces anonymous functions. So for example, in our "dot then" here, we have an anonymous function.

So very simply, instead of having to use the word "function", we can simply just list the arguments, and then say "equal arrow". And that will do the exact same thing as before. Now ignore for a second that PhpStorm is very, very angry with me, and let's go try this out.

So this "loadRepLogs" is called on page load and it loads this big list. So I'm gonna refresh, it works perfectly. And our console has no errors.

So before we talk more about the arrow function, clearly PhpStorm is totally angry and confused and that's because it's set up to only recognize old JavaScript ES5.

So let me go to my settings. PhpStorm. Preferences. Search for "ES6". And you'll find "Languages & Frameworks", "JavaScript", and you can choose what version you want inside of your application. So let's go "ECMASript 6". Hit "OK". And then once it's done indexing, it should be happy with our format.

So this is nothing earth shattering, but since you're going to see this, you need to start to train your eyes to recognize that this is just an anonymous function.

Now if you get a warning up here about a "File Watcher to transpile using Babel", ignore that for now. We're going to talk about that at the end of the tutorial.

So cool. So what else are we going to see with this arrow function? Well, actually these parentheses around the arguments are even optional. As you can see, because the page still works. I usually put them there because I like to keep some structure with my functions but you're going to see it without those parentheses.

Now if this is all the arrow function did, I wouldn't be very happy with it because it's just another way to do something that we could already do before. But, it has one very, very amazing super power.

To show it off, inside of the anonymous function, I want you to "console dot log", "this" and "self". Now remember inside of anonymous functions, "this" always changes to be something different. Which is why we set up "self" up here, so that it would actually point to our "RepLogApp" object.

Let's go back. Refresh the page. And check this out. This appears to be our "RepLogApp" object. The exact same thing as "self". And in fact, it is. The big difference between true anonymous functions and this arrow syntax is that the "this" variable is preserved. And that's why I use this everywhere now for anonymous functions.

Because it means I can remove this silly "var equals self" thing. And instead down here I can just use "this". Of course "this" is inside of its own anonymous function, so once again we're gonna use an arrow function to get that working. And when we refresh, it still works.

So let's keep going with this. Down here we're using Sweet Alert. Same thing we have "var self equals this". So let's get rid of that. Down in "preConfirm" we have an anonymous function. We'll do empty arguments, equal arrow. And we can change this to "this". I'm going to do the same thing down here, even though we're not doing anything. I like to stay consistent and use the arrow function everywhere if I'm going to use it at all.

And then the method right below it, same exact thing, "var self equals this", you are gone. Replaced with our arrow function. And do the same thing on "FadeOut". Now here we're using "this" and previously when we were using a true anonymous function, "this" pointed to the element that was fading out right now. So we can't use that anymore but that's fine because we know it's this row that is fading out. So we're gonna just remove it with "row dot remove" and then "this.updateTotalWeight".

So let's double check that. We'll refresh. Delete one of my things. Perfect.

And now let's just convert everything else that we didn't have inside of here. So I'll search for "function open parentheses" so we can find everything  and the only functions we want are true methods on our objects itself, we don't want anything anonymous. So we'll get rid of the word "function" here. Add our arrow. Same thing down here. And we can get rid of another "var self equals this". Which is awesome. Update these "selfs" to "this" and get rid of one more "function" on the "catch".

Perfect. Keep going. Even the "Promise" can change. The "dot then" will definitely change. And we'll just finish up here with converting everything else. And in this case there was no "self" so we don't need to update anything else. And we'll change just the last few spots that we have here.

Now if you're watching closely you're actually going to see that I created a problem for myself. Because previously with "dot each", "this" was the element that we were iterating over at that exact time.

So if we're gonna use the arrow function, obviously we can't use "this" anymore. But that's fine because when you use "dot each", it actually gives you the element that you'll be programming just like that. So we can say "element" instead. If we search for "dot each", there is one other spot where we have this exact same problem. We'll say "key", "index", "element". We want to use that instead of "this".

So it made our life easier in some cases because we actually don't have to use the "var self equals this" thing. It did make our life a little bit more complicated in some other spots, but in a real app I would do this from the very, very beginning.

And honestly the "dot each" function is gonna go away in a few minutes, replaced by a new core JavaScript function.

Now there's just one other little thing that you're gonna see with the arrow function and it's another syntax option that you can do.

Up near the top where we have our Sweet Alert, you notice that this "preConfirm" is an anonymous function but all we do is return something. When you have that situation you can actually get rid of your method body entirely. So when you don't have the curly braces it implies that this value is going to be returned. It looks weird at first but you're going to see it a lot. And you don't have to use it.

So with all these changes, let's refresh. Make sure a few things still work. Looks good to me.

All right let's keep going and we're actually going to dive into "Node.js" and use it to help us test out a few of these features.
