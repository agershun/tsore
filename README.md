# Tsore.js - Flux-like store micro-library

The library is designed to realized simple Flux-like store
interface.

The code is based on [Riot.js](riotjs.org), [Loot.js](), and [RiotControl.js]() libraries.

## Example


## Initializing

In browser:
```html
<script src="tsore.js"></script>
```

With [require.js]():
```js
   define(['tsore.js'],function(flux){

   });
```

In Node.js
```js
   var tsore = require('tsore');
```

## Example

Create new Store in simple way:
```js
    var store = tsore.observable();
    store.name = undefined;
    store.on('login',function(name){
    	this.name = name;
    	tsore.on('name_changed');
    });
    store.on('logout',function(name){
    	this.name = undefined;
    	tsore.on('name_changed');
    });
```

Or you can create new store with tsore.Store class constructor:
```js
    var store  = new tsore.Store({
        login: function(name,password) {
        	this.name = name;
        	this.password = password;
    		return 'name_changed'; 
    	},
    	logout: function() {
    		this.name = undefined;
    		return 'name_changed';
    	},
    },{
    	getName: function(){
    		return this.name;
    	}
    });
```

Register new store with Tsore controller:
```js
    tsore.register(store);
    tsore.dispatch('login','Andrey');
    console.log(store.getName);
```


## API

Functions for tsore:
```js
	tsore.register(store) or register('name',store)
	tsore.dispatch('action',parameters)
	tsore.store('name')
	tsore.on('event',function(){})
	tsore.one('event',function(){})
	tsore.off('event',function(){})
	tsore.trigger('event',parameters);
```

Functions for tsore.observable:
```js
    tsore.observable(obj);
```
Alternative way to create new object:
```js
    var obj = tsore.observable({});
    // or
    var obj = tsore.observable();
```
This add following functions:
```js
    obj.on()
    obj.one()
    obj.off()
```
See [Riot.js]() documentation.

# Riot.js and Tsore.js Example

```html
<html>
	<body>
	    <traffic-lignt></traffic-lignt>
	    <script type="riot/tag">
			<traffic-lignt>
				<div id="#traffic-lignt" onclick={click}></div>
				<style scoped>
					#traffic-light {
						width:100px;
						height:100px;
						border-radius:50%;
						background-color:{color};
					}
				</style>
				var trafficLight = tsore.store('trafficLight');
				this.color = trafficLight.state;
				click(function(){
					tsore.dispatch('green');
				});
				tsore.on('change',function(){
					this.color = trafficLight.state;
				})
			</traffic-lignt>
	    </script>
		<script src="riot+compiler.js"></script>
	    <script src="tsore.js"></script>
	    <script>
	    	tsore.register('trafficLight',
		    	new tsore.Store({
		    		red: function() {
		    			this.state = 'red';
		    			return 'change';
		    		},
		    		green: function() {
		    			this.state = 'red';
		    			return 'change';
		    		},
		    	}, function(){
		    		this.state = 'red';
		    	});
	    	);
	    	riot.mount('*');
	    </script>
	</body>
</html>
```

