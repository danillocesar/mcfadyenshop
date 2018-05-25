var ProductView = {
		init: function(){
			var _this = this; 
			_this.getProducts(function(){
				var productList = _this.productList;
				var divList = document.getElementById("productList");
				for(i in productList){
					var productCard = _this.cardTemplate(productList[i]);
					divList.innerHTML += productCard;
				}
			});
		},
		getProducts: function(callback){
			myHttp.get("products", {}, function(data){
					ProductView.productList = data;
					callback();
			});
		},
		addProduct: function(event, id){
			var quantity = event.target.parentElement.getElementsByTagName("input")[0].value;
			myHttp.post("/shoppingcart/items", {"product_id":id, "quantity": quantity}, null, function(response){
				console.log(response);
			});
		},
		productList: [],
		cardTemplate: function(product){
			return '<div class="product-card">' +
						'<img src="'+ product.image +'" alt="Avatar">'+
							'<div class="card-container">'+
								'<h4><b>'+product.name+'</b></h4>'+ 
								'<p>'+Utils.formatToCurrency(product.price)+'</p>'+ 
								'<button type="button" class="btn-primary" onclick="ProductView.addProduct(event, '+product.id+')">Buy Now</button>'+
								'<input class="quantity" value="1" type="number" min="1" max="99"/>'
								'</div>'+
							'</div>';
		} 
}