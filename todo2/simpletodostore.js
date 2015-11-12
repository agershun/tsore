if(typeof export === 'object') {
	tsore = require('tsore');
}

tsore.register('todos',{
	mixins: ['array','simplesync'],
	server: {
		defaults: [
			{name: 'Close the window'}, 
			{name: 'Open the door'}
		]
	},
});

