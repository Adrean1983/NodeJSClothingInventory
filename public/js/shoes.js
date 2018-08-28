const shoes = {
    template: `
    <button ng-click="$ctrl.getShoes();">Get Shoes</button>
    <form ng-submit="$ctrl.postShoe($ctrl.newShoe);">
      <input type="text" ng-model="$ctrl.newShoe.brand" placeholder="Brand">
      <input type="text" ng-model="$ctrl.newShoe.size" placeholder="Size">
      <input type="text" ng-model="$ctrl.newShoe.color" placeholder="Color">
      <input type="text" ng-model="$ctrl.newShoe.price" placeholder="Price">
      <button>Add Shoe</button>
    </form>
    <p ng-repeat="shoe in $ctrl.shoeList track by $index">{{ shoe }}
      <button ng-click="$ctrl.deleteShoe($index);">X</button>
      <button ng-click="$ctrl.updateShoe[$index].id, $ctrl.newShoe);">Edit</button>
    </p>
    
  `,
    // This is a HTTP angularjs service that communicates with a http server
    controller: function($http) {
        const vm = this;
        // this function gets the clothes stored in the array for clothes
        vm.getShoes = () => {
            // this is a get call to the api for clothes.
            $http({
                url: "/api/shop/shoes",
                method: "GET"
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
        //deletes an object.
        vm.deleteShoe = (index) => {
            $http({
                url: "/api/shop/shoes/" + index,
                method: "DELETE"
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
        //updates clothing that is in the array. PUT updates.
        vm.updateShoe = (index, newShoe) => {
            $http({
                url: "/api/shop/shoes/" + index,
                method: "PUT",
                data: newShoe
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
        //this posts a new object on the ngsubmit click
        vm.postShoe = (newShoe) => {
            $http({
                url: "/api/shop/shoes/",
                method: "POST",
                data: newShoe
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
    }
}

angular
    .module("App")
    .component("shoes", shoes);