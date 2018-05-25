var ShoppingCart = {
		show: function(){
			var _this = this;
			_this.getShoppingCart(function(){
				_this.createBody();
				var overlay = document.getElementById('shoppingCart');
				overlay.classList.remove("hidden");
			})
		},
		hide: function(){
			var overlay = document.getElementById('shoppingCart');
			overlay.classList.add("hidden");
		},
		rowTemplate: function(item){
			return '<tr id="item_'+item.id+'">'+
						'<td><image class="thumbnail" src="' + item.product.image + '"/></td>' +
						'<td>' + item.product.name + '</td>' +
						'<td>' + Utils.formatToCurrency(item.product.price) + '</td>' +
						'<td>' + item.quantity + '</td>' +
						'<td>' + Utils.formatToCurrency(item.amount) + '</td>' +
						'<td><button type="button" onclick="ShoppingCart.remove(\''+item.id+'\')">Remove</button></td>' +
					'</tr>';
		},
		getShoppingCart: function(callback){
			var _this = this;
			myHttp.get("shoppingcart", {}, function(data){
				_this.cart = data;
				callback();
			});
		},
		remove: function(id){
			var _this = this;
			myHttp.remove("shoppingcart/item/" + id, {}, function(data){
				console.log("removed");
				_this.getShoppingCart(function(){
					_this.createBody();
				})
			});
		},
		createBody: function(){
			var _this = this; 
			var table = document.querySelector('#products-table tbody');
			table.innerHTML = "";
			for(i in _this.cart.items){
				table.innerHTML += _this.rowTemplate(_this.cart.items[i]);
			}
			document.querySelector("#total").innerHTML =  Utils.formatToCurrency(_this.cart.amount);
		},
		cart: {}
}