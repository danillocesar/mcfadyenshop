var Utils = {
		formatToCurrency: function(n){
			return n.toLocaleString('en-US', {
				  style: 'currency',
				  currency: 'USD',
				});
		}
}