## JavaScript Project

Premise: A spot where developers can come to get tough. Entering in # of
reps of weight and climbing up a leaderboard.

### Starting Project

Start with a basic design and:

* working registration
* non-JavaScript page where we can enter reps (units include, lbs, kg, cats, etc)
* non-JavaScript leaderboard

### Building

#### 1) Bower: Setup

- Added the .bowerrc file
- bower init

#### 1) Bower: Install Bootstrap and jQuery

- bower install bootstrap --save
- ignored web/assets/vendor in gitignore

#### 2) Include them in the base template

#### 3) Rep Form: AJAX Submit

- using .preventDefault()
- using document.ready

#### 4) Rep Form: Installing FOSRestBundle

- comp require friendsofsymfony/rest-bundle ~1.2.2
- comp require jms/serializer-bundle ~0.13.0

#### 5) Form: JSON Form Response

#### 6) Form: Handling client-side errors

#### 7) Form: Adding error highlights

#### 8) Form: Show a notification on save

#### 9) Form: Handling success with a message

- yet more custom code for our errors messaging spot
Problems:
- the errorList thing is redundtant and a disaster
- a lot of work to handle parsing through Symfony errors and fields
- all this stuff is inline
Solutions:
- generic error list object
- centralized parsing of Symfony error responses
- get this into its own little module

#### 10) Form: Refactoring into simple object

- not really helpping yet, one gigantic object
- differences between objects and hashes? :)

#### 11) Form: Adding more methods to the object

- forced to pass $form into the function
- forced to re-look up for errorList
- referring to repForm, not this

#### 12) Form: Instantiated object

- created the construct function
- instantiated the guy

#### 13) Form: Tweak methods in object

- used $.proxy so we could get "this"
- used self later to keep this

#### 14) Form: Isolate to an external file

- using self-executing function
- seeing an alias for undefined
- still need to include the script file manually

#### 15) Form: Isolate Symfony error processing

- this returns an object, not even a function that acts as constructor
- order including the script files is important
- need to pass it into self-executing function

### 16) Form: Create Error List Utility

- Moved creation of the ul error list into JavaScript
- New ErrorList object has an easy API

#### 17) Leaderboard: Install dustjs

- bower install  dustjs-linkedin --save

#### 18) External object to start rendering leaderboard

- rendered template just inside a script tag and passed it in
- nothing too special at this stage

#### 19) Rendering leaderboard template

- rendering data into twig via {{ leaders|json_encode|raw }}
- compiling and rendering the Dustjs template
- passing in "dust" into self-executing block
- once again using self = this;

#### 20) Install FOSJsRoutingBundle

- comp require "friendsofsymfony/jsrouting-bundle" "@stable"

#### 21) Leaderboard: Reloading Leaderboard via AJAX

- using a delegate selector for a js- button
- using $.proxy on the callback
- using Routing.generate for the first time
- adding a button in the dust template

#### 22) Leaderboard: Using promises to add a fade

- using promises - attaching to success and triggering failure at least

#### 23) Leaderboard: EventEmitter to load on new reps

- bower install eventEmitter
- create a global event emitter
- use DI to push it into the objects
- add a listener and trigger an event

#### 24) User: Create simple jQuery plugin

- created the new jQuery plugin - very simple so far

#### 25) User: Finishing Simple User Plugin

- new jQuery plugin behavior that constructs an object
- show/hide functionality

#### 26) User: Filling in the missing pieces of the plugin

- merged the options together
- filled in the missing mouseover/mouseout listeners

#### 27) RequireJS: Install via Bower

- bower install requirejs --save

#### 28) RequireJS: Initial implementation

- added the include('::requirejs.html.twig') block to base.html.twig
- added the _requirejs.html.twig file
- added the common.js file
- added the default.js basic module
- error is:
    Mismatched anonymous define() module: function () {
-> often means that you're loading something manually

#### 29) RequireJS: Removing all normal JS

- commenting out all old JS so we can get the homepage to work
- removing the javascripts block even

#### 30) RequireJS: Beginning of the lift module

- creating the lift.js module with the old inline code
- don't load any leaders by default (removes that issue)
- require eventEmitter and just create one globally on this page
- including the requirejs.html.twig template with the new module

#### 31) RequireJS: Setting the eventEmitter path

- setting the eventEmitter path custom

#### 32) RequireJS: Getting RepForm working

- requireing RepForm in lift
- moving RepForm, SymfonyErrorUtil and ErrorList into a modules directory
- changing first line of each with the define (and removing callable on last line)
- commented out leaderboard

#### 33) RequireJS: Getting Leaderboard setup

- convert Leaderboard to a module
- setup path for dust
- add a shim for exports dust

#### 34) RequireJS: Include Template

- bower install requirejs-text --save
- move the dust template into assets/templates
- include the text!templates/leaderboard.dust template
- setup the text path
- comment out the userInfoPopup

#### 35) RequireJS: Include Routing

- dynamically adding a "routes" path in require.js.html.twig
- requiring routing and routes from Leaderboard
- adding a path for routing
- add a shim so routes requires routing
- add shim for routing to export

#### 36) RequireJS: Starting data

- included nifty function for moduleDatea
- used it to pass in leaders

#### 37) Fixing the jQuery plugin

- rename jquery to plugins
- add a shim
- require it AND bootstrap
- uncomment code

#### 38) Fixing router duplication

- renaming routing -> vendor/routing
- create a new modules/Routing
- include it

#### 39) RequireJS: EventEmitter

- rename eventEmitter to vendor/eventEmitter
- remove it as a dep to lift.js
- add it as a direct dep (not constructor anymore!) of RepForm and Leaderboard
- create the new module that returns a new instance

#### 40) Optimizer: Install RequireJS

- npm init
- npm install requirejs --save-dev

#### 41) Optimizer: Basic Configuration

- start with build.js
- ./node_modules/.bin/r.js -o build.js
- add paths: { scripts: 'empty:' } to fix external issue
- optimize: none
- .gitignore for web/assets-built


#### 42) Optimizer: assets-built path

- add a global variable that's set to a parameter and vary on it

#### 43) Grunt install

- the assets-built is sucky
- we want to do other things
- sudo npm install -g grunt-cli
- grab package.json devDependencies and run "npm install"

#### 44) Grunt: Basic Configuration

- Put in the basic Gruntfile.js

#### 45) Grunt: RequireJS

- requirejs configuration. copied from build file
- run it! 

#### 46) Grunt: Uglify

- uglify config - should be key-value pair in file
- use "expand" notation with src: 'js/**/*.js'
- Grunt: Configuring tasks: Building the files object dynamically

#### 47) Grunt: Use variables

#### 48) Grunt jshint

- jshint configuration!

#### 49) Grunt: jshint stylish

- npm install 'jshint-stylish' --save-dev
- add
    options: {
        reporter: require('jshint-stylish')
    },

#### 50) Grunt: Copy

- npm install grunt-sync --save-dev
- load the grunt tasks
- add the basic config
--> make sure we're pointing at assets-built exclusively

#### 51) Grunt: Setup default and production tasks

- add default and production tasks

#### 51) Grunt: Watch

- npm install grunt-contrib-watch --save-dev
- add the watch config and import the task

#### 52) Grunt dust

- npm install grunt-dustjs --save-dev
- grunt.loadNpmTasks("grunt-dustjs");
- basic configuration
- adding shim for template
- including the template directly and not compiling

14) RequireJS Optimizer
* do we move assets out of web?

15) Grunt
* move in RequireJS
* add in jshint
* add in css-min

15.5) Dust Template compiling

16) Less/Sass extra credit?
* add watch task

17) Refactor entry into AngularJS

3) Add another form field after submitting
* introduce delegate events

### Questions

- what is the bower.json ignore section?
- maybe fix the sticky problem with the popups
- excludeShallow
- cache busting

### Random Notes

- you don't need "script type="
- what is document.ready really?
- we could also make a FormErrorHighlighter around step 17 to make the
  error decorating of form fields automatic
- return this from jQuery plugins to allow chaining!
- Constructor trick in bootstrap is just a way to expose the private
  construct method
- the extra dot selectors (click.tooltip) used in Bootstrap are just namespaced
  events: have no affect, except you can unbind them all later
- first argument to $.extend is modified
- Grunt: configuring Tasks: Globbing patterns (**)
- maybe put leaderboard on the homepage at the end?
