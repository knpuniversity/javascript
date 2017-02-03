# Private VARS Weak Map

To show you the importance of WeakMap, lets go back into RepLogApp and scroll all the way up to the top.  And remember this file holds two classes; RepLogApp, and also at the bottom it has Helper. And the purpose of Helper was for it to be a private object that we couldn't reference from outside of our self executing function. It's a way for us to say "Don't worry about this Helper thing."

But you noticed in the constructor RepLogApp, we actually set Helper onto a Helper property. And we do this so that we can use it later, inside of updateTotalWeightLifted. Here's the problem; the Helper property is not private. What I mean is inside of our template if I wanted to I could now say: repLogApp.Helper.calculateTotalWeight.  So we went through all of this trouble to create a private Helper class or object and its not actually private.

So getting around to some java script, there are a number of different strategies. Heres one; above the class lets say: let HelperInstance = null;. And then down here instead of setting it on a property, which is accessible from outside, lets just say: HelperInstance = new Helper. Because this HelperInstance variable is not going to be available outside of our self executing function. And of course down here an update to WeightLifted we'll say: HelperInstance. getTotalWeightString. And just like that we have made Helper truly private.

While some of you might already see a problem here, because its legal even if we're not using it in this application, to create multiple RepLogApp objects.  And if we did create two RepLogApp objects for now, well the second one would replace the first HelperInstance. We can only ever have one HelperInstance even if we have multiple RepLogApps so this is a bad design.

So one way to fix this is actually to change this to: let HelperInstances = new Map. Actually store all the HelperInstances in the Map. Down here you'll actually say: HelperInstances.set. And for the key, and this looks a little bit weird, you'll actually use this., in other words we'll key that HelperInstance to ourself, our instance. That means later when we'll want to use it, we'll say HelperInstances.get(this).GetTotalWeightString. So the Helper is still private and now each instance of RepLogApp is going to have its own HelperInstance inside of our Map.

So just to prove this is not breaking everything, we refresh, everything still loads just fine.

So let's do a little experiment here. Once you go all the way to the bottom of this file, the first human crate for new RepLogApp objects, we'll just point them at the 'body' tag. And you'll notice that these are not being used, I'm not setting them to a variable so they are sort of created, and they're gone. And below that, and this won't make sense at first, [inaudible 00:03:56] setTimeout [inaudible 00:04:01] function inside here we're going to say console.log(HelperInstances). And we'll set that to run five seconds after we load the page.

Now when we do this and refresh, we wait our five seconds, we should see the Map printed out with five Helpers in it. And that makes sense, we've created five RepLogApp instances, every RepLogApp creates its own Helper, and those all go into the Map.

But now I want you to, actually after we set the HelperInstance, simply return. So this is a little bit weird but at this point, since we're returning here, when we create a new RepLogApp object, it's not attaching any listeners or doing anything like that. So ultimately this object is not attached or referenced anywhere in memory, at least not for the ... We just create the object, and the object does nothing. So these objects including their HelperInstances, should be available for garbage collection.

Now garbage collection is something that happens randomly based on your browser, but if you're using chrome you can actually force it. And you do that by going to the timeline tab, you should have a little garbage icon here. So I'm going to do this quickly.  I'm going to refresh, I'm going to hit the collect garbage, we're going to go to the console. And when it comes up it still has the five HelperInstances, but now go back up here and change this to a WeakMap instead.

Now go back to the timeline tab, refresh, hit the garbage icon, go to console, and check this out. That weak Map just come back empty, and that is the use case for a WeakMap. A WeakMap is perfect for situations like this where you want to hide something in a private way, like our Helper object. But the problem is if you use a Map its possible that once you're done with that Helper object, because the Map is still referencing it in memory, garbage collection can't take over and remove that Helper.

Now this may or may not be a problem or a use case in your situation, but that's when you're going to see the WeakMap used instead of the Map. So for us it means that we're going to use the Map in day to day kind of stuff, but if we do have a situation like this we're going to use the WeakMap. So let's get rid of all our debug code here. And our page should be happy again.

So in addition to Map ...
