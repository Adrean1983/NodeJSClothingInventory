"use strict"
const clothes = {
    template: `
    <button ng-click="$ctrl.getClothes();">Get Clothes</button>
    <form ng-submit="$ctrl.postClothing($ctrl.newClothing);">
      <input type="text" ng-model="$ctrl.newClothing.type" placeholder="Type">
      <input type="text" ng-model="$ctrl.newClothing.size" placeholder="Size">
      <input type="text" ng-model="$ctrl.newClothing.gender" placeholder="Gender">
      <input type="text" ng-model="$ctrl.newClothing.color" placeholder="Color">
      <button>Add Clothing</button>
    </form>
    <p ng-repeat="clothing in $ctrl.clothingList track by $index">{{ clothing }}
      <button ng-click="$ctrl.deleteClothing(clothing.id);">X</button>
      <button ng-click="$ctrl.updateClothing($ctrl.clothingList[$index].id, $ctrl.newClothing);">Edit</button>
    </p>
  
  `,
    // This is a HTTP angularjs service that communicates with a http server
    controller: function($http) {
        const vm = this;
        // this function gets the clothes stored in the array for clothes
        vm.getClothes = () => {
            // this is a get call to the api for clothes.
            $http({
                url: "/api/shop/clothes",
                method: "GET"
            }).then((response) => {
                vm.clothingList = response.data;
            });
        };
        //deletes an object.
        vm.deleteClothing = (index) => {
            $http({
                url: "/api/shop/clothes/" + index,
                method: "DELETE"
            }).then((response) => {
                vm.clothingList = response.data;
            });
        };
        //updates clothing that is in the array. PUT updates.
        vm.updateClothing = (index, newClothing) => {
            $http({
                url: "/api/shop/clothes/" + index,
                method: "PUT",
                data: newClothing
            }).then((response) => {
                vm.clothingList = response.data;
            });
        };
        //this posts a new object on the ngsubmit click
        vm.postClothing = (newClothing) => {
            $http({
                url: "/api/shop/clothes/",
                method: "POST",
                data: newClothing
            }).then((response) => {
                vm.clothingList = response.data;
            });
        };
    }
}


angular.module("App").component("clothes", clothes);