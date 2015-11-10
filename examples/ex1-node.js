// Node.js example
//
// to run please use:
// > node ex1-node.js
//

var tsore = require("../tsore")

tsore.register(
	'car',
	{
    	start:function(){
    		this.state = 'run';
	    }
	},
    {
    	state:'stop'
    },
    function(action) {
    	if(typeof action === 'undefined') {
    		console.log('init car store');
    	} else {
    		console.log('"'+action+'" action for car')
    	}
    }
);
console.log(tsore.store('car').state);		
tsore.action('start');
console.log(tsore.store('car').state);
