# Controlled Input

Coming soon...

In reality, there are two different ways to work with form fields and I know having two options is annoying, but we need to talk about both and then we'll talk about the pros and cons of each approach. The first approach which we've been using is that basically you render the form field and then you read and set the values 

directly on the dom elements. We read the dom elements value. We set the value. React is basically unaware that this field exists once it's rendered. The second way is very different and the second way when we render the field, we bind its value to some state. Then instead of reading and setting the dominant element directly, all we do is read and set that state. Then react handles rerender rendering the element and setting the correct state. The differences based is is that in the first approach, the DM is the source of truth for the value of your form fields and in the second approach, your state is the source of truth. So we're gonna. Look at we're gonna start. We're gonna use the second approach to add a totally new feature to the site. Very, very important feature in my opinion. We're going to add a form field up near the top of the age too so the user can control the number of parts that are on a page if they want 50 hearts than we should allow them to have 50 hearts sprinted, so in rep logs right after the age to just start by adding an input type equals number. Nothing interesting yet 

it does 

renders as an empty text field and that's it. Now, in order to get, in order to be able to print multiple hearts on the page, we're going to need to know how many hearts the user wants and that is gonna be something that's going to be stored in state. We could put the state inside rep logs if we determined that this was really stayed that only dealt with the Ui, but I'm going to say that this state is important. It's business logic state, so I'm going to put it up in rep log APP. We're going to initialize a new state called number of hearts and we're going to initialize it to one. Now as soon as we create new state thanks to our our rendering things, this is automatically passes in new prop to rep logs, which is awesome. So I'll copy number of hearts. We're going to rep logs and down under prop types. I'm going to add this as a new prop type number of parts that do prop types, that number that is required. Then we'll go up top on top of render will destructure this value out, and then this looks a little crazy, but here's how we can use it on a copy of my heart and will enter Java script. We can paste our heart, 

which is a string, and then say that repeat and then say number of hearts. Now I have not found this value does input field yet, so we're not going to have any magic, but if we move our and refresh, we should be able to check our work. There's our one heart. If we go over to react and change our top level element to 10 hearts, we get 10 hearts. Now, normally if we're going to do things the way we've been doing things before, we would add an on change handler to input. We'd read the value off of the input directly and we would use that to set the state, but the state and the input really wouldn't really have anything to do with each other. 

What the second way, we're literally going to say value equals number of hearts. 

Now when you refresh, the cool thing is, hey, we get a value of one. Immediately it puts it in there or if they're in your console, we also have a huge error and it's even more than that is I can't change the value over here. If I try. The arrows are tied typing directly. This is stuck at one and it says you provided a value prop to a form field without an on change handler. This will render as a read only field. This method of controlling forums is called control. The inputs. React will always make sure that this value is set to the value of this prop, which means it won't allow us to change it. If we need the value of this property change, we need to make sure that the underlying state is what changes 

what. 

In other words, we need to change a number of state up on rep log APP, so do this. We're going to add another handler function. Let's say handle heart change, and remember our top level component is all about just changing state, so it's not aware that there's an underlying input element. It doesn't care. So let's just going to take an argument called part count. Inside. We'll just say this, that says state with number of hearts. Is that too hard? Count 

easy 

because we just added a handler function. We need to be in the habit of going up and finding that so this, that handle heart change equals this dot handle heart change that find this. Then finally we'll pass that down as a prop for all of our state and all of our props are passed on. A rep logs automatically, but we do need to pass down any handler functions, so we'll say on heart change 

equals 

this dot handle heart change. Then finally going to rep logs and since we're being passed a new problem, well I'll add that prop here on heart change set to prop stop pump that is required. Then thanks to that we can restructure this up here on heart change. 

Okay. 

Then all we need to do now is actually called this with the real value. Ultimately we do that with the same way as before, which is with an on, which is what a normal event handler. We want this to fire on change, so we're literally say on change equals I'm here, I'll just do a little callback function. We don't need the event argument here, but I'll put it just for clarity and we can call on heart change and pass it eat.target dot value. So we referenced the underlying dom element just for a moment here so that we can update the state 

and that's it. 

Move over, refresh the page and let's change this to 10 and it works. We can change it. We get the 10 of hearts, we are happy. Oh, except we just failed. Prop validation, invalid prop number of height. I'm our parts of type string supplied to rep logs, expected number. Interesting. So what's happening here is we just set up our new rep log. Rep logs are new number of hearts prop to be a number, but apparently this is now a string. This is not that important, but what's happening here is that I'm gonna. Have you read the value off of the field? That's always a string input. Boxes contain strings. So ultimately our states for a number of parts is being set to a string and that's being passed in as a prop. It's not that big of a deal. They said, but we can code a little more responsibility here, responsibly here, and we'll do is we'll cast that to an ent. Javascript is totally bizarre. There are several different ways to do this, but if you actually add a plus in front of it, that will cast it as an int. So now we'll refresh this time. We can change it and it works and there's no prop air, so yeah, this is controlled inputs. It feels really, really good, but it is a little bit more work 

and just to have fun here, I'm going to change the underlying input type equals range. 

Move back 

and refreshes a super fun hearts for everyone. 

One 

next. Let's actually use this in our rep log creator to see what the difference would be between the two approaches.