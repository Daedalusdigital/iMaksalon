var products = [
  {id: 1, name: 'Booking', description: 'Booking Accepted.', details: 'your booking was accepted by the Stylist', Date: '2017-11-17'},
  {id: 2, name: 'Report', description: 'Report on Profile.',details: 'The report you sent Has been recicved and we are attending to the issue', Date: '2017-11-17'},
  {id: 3, name: 'Booking', description: 'Booking Declined.', details: 'Your booking was declined by the stylist due to time conflicts',Date: '2017-11-17'},
   {id: 4, name: 'Booking', description: 'Booking Accepted.', details: 'your booking was accepted by the Stylist', Date: '2017-11-17'},
];

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