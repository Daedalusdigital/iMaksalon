var products = [];

function loadContent() {
  
  var obj = angular.toJson({client_id: 1});
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      products = this.responseText;
      console.log(products);
    }
  };
  xhttp.open("POST", "https://prod-25.southcentralus.logic.azure.com:443/workflows/4e1e81034fd349638c36b7cda5f3540c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g622NdS1IebLamr9YESHvHl4oSMIyjFuuuWyI2AcYbsxmlhttp_info.txt", true);
  xhttp.send(obj);
}

function findProduct (productId) {
  return products[findProductKey(productId)];
};

function findProductKey (productId) {
  for (var key = 0; key < products.length; key++) {
    if (products[key].id == productId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#product-list',
  data: function () {
    return {products: products, searchKey: ''};
  }
});

var Product = Vue.extend({
  template: '#product',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  }
});

var ProductEdit = Vue.extend({
  template: '#product-edit',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    upDateProduct: function () {
      var product = this.$get('product');
      products[findProductKey(product.id)] = {
        id: product.id,
        name: product.name,
        description: product.description,
        details: product.details,
        Date: product.Date
      };
      router.go('/');
    }
  }
});

var ProductDelete = Vue.extend({
  template: '#product-delete',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    deleteProduct: function () {
      products.splice(findProductKey(this.$route.params.product_id), 1);
      router.go('/');
    }
  }
});

var AddProduct = Vue.extend({
  template: '#add-product',
  data: function () {
    return {product: {name: '', description: '',  details: '',Date: ''}
    }
  },
  methods: {
    createProduct: function() {
      var product = this.$get('product');
      products.push({
        id: Math.random().toString().split('.')[1],
        name: product.name,
        description: product.description,
         details: product.details,
        Date: product.Date
      });
      router.go('/');
    }
  }
});

var router = new VueRouter();

router.map({
  '/': {component: List},
  '/product/:product_id': {component: Product, name: 'product'},
  '/add-product': {component: AddProduct},
  '/product/:product_id/edit': {component: ProductEdit, name: 'product-edit'},
  '/product/:product_id/delete': {component: ProductDelete, name: 'product-delete'}
})
  .start(Vue.extend({}), '#app');

