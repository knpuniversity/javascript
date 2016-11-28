# Javascript Objects

Our setup is fine. We're doing all the right things. We are using our data attribute, but it's just a bunch of functions. Come on people, if this were a PHP code, we would be using classes and objects and things would be organized. Let's do the exact same thing in Javascript. Let's make organized code. Let's use objects.

How to create an object? There are a few ways, but basically, it's as simple as var RepLogApp = {} that is an object. Yes I know it's an associative array but an associative array is an object in JavaScript. There are no classes in JavaScript, there are only objects. Well that's not actually true anymore, there are classes in JavaScript but we'll save that for a future tutorial.

Anyways, in our object we can just start adding properties or functions as keys inside this array or object. Let's make a function called, initialize: function{} and we'll call this, and its job will be to initialize all the listeners that we need on our table. I should give this a $wrapper argument.

First thing I'll do is actually set that as a property on my object. I don't need to explicitly add a dollars and wrapper key inside the array. You can dynamically do it like this.

Next, I'll copy our first listener and instead of $table.find I'll say, this.$wrapper.find then on click. By another way of an object instead of actually having it call that like this, let's get things organized. Let's call it new function on object called, this.handleRepLogDelete and we'll add that in just a second.

Then we can do the same down here for our other event listener. Copy up here, change it to, this.$wrapper then on click we'll call, this.handleRowClick. After initialize we'll create both of those functions very easily. Add a key called, handleRepLogDelete. You never want to add a function or property if we're just adding keys to this array.

This will be equal to all of our code we had down here before, which we can now delete. Make sure you have the, e argument exactly like before. This is no different than what we were originally doing. We'll do the same thing back here for our other function, handleRowClick: function{}. I'm not using the, e argument here. I'll do, console.log(row clicked), beautiful.

One little thing to notice is that when we specify the call back, I'm not executing the handleRepLogDelete function. I don't have open parentheses, closed parentheses on the end of it. I'm passing that basically as a variable. I'm passing that as a reference. Here is the function that you should call in the future when this event happens.

Now the only thing we didn't document already, is we just need to find a table like we already are and then call it RepLogApp.initialize and pass it our, $wrapper. The cool thing about this approach is that now we have an entire object who's job is to work inside of this $wrapper.

Let's go back and refresh and try this. Hit delete, oh, it actually fails. Variable table is not defined. It's right inside of our handleRepLogDelete function. So cool yeah, yeah, that makes sense totally. We had a table variable before, we don't have a table variable anymore and that's fine because we have this, this.$wrapper property. For the second PHP we can start referencing properties, cool.

Let's go back and refresh now. Click Console and whoa, that doesn't work. The errors in the exact same line. What's going on here? What's going on here is the crazy, this variable. Notice we are in a, call back function. Whenever you are in a call back function either because you're making an Ajax call on success or attaching an event listener or using a set time out function, the, this variable in your call back changes and we know that. We know that this here is actually a reference to the DOM elements that was clicked. When we use this down here, that is not our object even though we're inside of the object. That is actually the DOM element, so this doesn't work. We're going to talk a lot more about that in just a second.

Unfortunately for now the fix is easy. Essentially the RepLogApp object we have is very similar to a static object in PHP. There are no static versus non static things in JavaScript. Well there are, but save that for the future. There are just objects. You'll notice that we couldn't create multiple RepLogApp objects, there can only ever be just one. In that sense it's basically like a static object in PHP.

Like static objects in PHP, you can just reference that class by it's class name. In this case it's object name, RepLogApp and that should get the $wrapper. Go back and refresh now, hit delete. Now it actually works.

Since we're running out of items, let's add a couple more items to our list. Now that we're inside of an object we can get even more organized. This is our opportunity to break our functions down to the smaller functions to make our code more readable. For example, we could create a new function called, updatetotalWeightLifted. Instead of figuring out the total weight lifted here and doing the update down here, we just call that function.

Here we'll say,var totalWeight = 0. Then I'll say, this.$wrapper because we're not in a call back function so we're safe to use this, .find look for all our trs in the tbody. Then we'll say, .each to loop over them.

Notice when you do, .each we are actually in a call back function so guess what? This is no longer our RepLogApp object, it's something different. It turns out this is actually the individual tr that we're actually looping over in this moment.

We can say, totalWeight += $(this).data and we can read our data-weight attribute from before. Finally I'm going to say, this.$wrapper.find look for our js-total-weight element .html{totalWeight}, cool.

Down at our handleRepLogDelete, we don't need any of this logic anymore, nor this logic. We just need to call that function above. Now the only kind of caveat here is that the fadeOut element doesn't actually remove that row from the DOM until it's fully faded out.

It doesn't really remove that element from the DOM so what we need to do here is tell it to go normal speed then tell it to do a call back function. This function will be called once the row has fully faded out, we'll say row.remove to remove it from the DOM and now we'll actually call our function.

Notice here we're actually inside of another call back function, inside of a call back function, inside of our entire function which a call back function so this here is different then this inside of the success function which is different then this down here inside of this call back. Again, more of this in a second. We'll play it safe and call it, RepLogApp.updateTotalWeightLifted.

Go back, refresh, 765 it's fully a big fat cat lift, 657, good shape. Now let's figure out what's going on with the this variable.
