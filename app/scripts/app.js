'use strict';
/**
 * @ngdoc overview
 * @name xiangmuApp
 * @description
 * # xiangmuApp
 *
 * Main module of the application.
 */
angular
  .module('xiangmuApp', ["ui.router","ngCookies"]).constant("server","http://www.somenote.cn:1510/").controller("tzx",["$scope","$http","server","$state","$cookieStore","$cookies",function($scope,$http,server,$state,$cookieStore,$cookies){
          $scope.cc=function(){
            $http({
              url:server+"users",
              method:'POST',
              data:$scope.obj
            }).success(function(e){
              $cookies.put("username",$scope.obj.username);
               alert("注册成功");
              $state.go("denglu");
            }).error(function(e){
              alert(e.errors.username)
            })
          }
    if($cookies.get('password',$scope.obj)){
    $state.go('shouye')
    }
   var zz=$cookies.get('username',$scope.obj)
   $scope.obj={
    username:zz
   }
    $scope.denglu=function(){
      $http({
      url:server+"users/login",
      method:"POST",
      data:$scope.obj
    }).success(function(e){
      alert("登录成功")
      $cookieStore.put("uid",e.uid)
      // if(username=""&&password=""){
      //    alert("请填写账号和密码")
      // }
      if($scope.check==true){
      var expireDate=new Date();
          expireDate.setDate(expireDate.getDate() + 6);
      $cookieStore.put("username",$scope.obj.username,{'expires': expireDate});
      $cookieStore.put("password",$scope.obj.username,{'expires': expireDate});
      $state.go("shouye");
      }else{
      $http({
      url:server+"users/login",
      method:"POST",
      data:$scope.obj
      }).success(function(){
        alert("登录成功")
        $cookieStore.put("username",$scope.obj);
      $cookieStore.put("password",$scope.obj);
        $state.go("shouye");
      })
    }
    }).error(function(e){
      alert(e.message)
    })
    }
     $scope.back=function(){
      window.history.back();
    }
  }]).config(function($stateProvider,$urlRouterProvider){
       $stateProvider.state("denglu",{
      url:"/denglu",
      templateUrl:"views/denglu.html",
      controller:"tzx"
    }).state("zhuce",{
      url:"/zhuce",
      templateUrl:"views/zhuce.html",
      controller:"tzx"
      }).state("shouye",{
      url:"/shouye",
      templateUrl:"views/shouye.html",
      controller:"contro"
      }).state("add",{
      url:"/add",
      templateUrl:"views/add.html",
      controller:"contro"
      }).state("xiugai",{
      url:"/xiugai?id&title&content",
      templateUrl:"views/xiugai.html",
      controller:"xiu"
      })
    $urlRouterProvider.when("","/denglu")
  })