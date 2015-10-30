angular.module('starter.controllers', [])
.factory('commonDefine', function() {
  var _server = "";
  var param = {
    serverHost : _server, 
    serverAjax : _server + "",
    nopich : "img/no-pic-h.jpg",
    nopicw : "img/no-pic-w.jpg",
    myAppID : 1};
  return param;
})
.factory('valuePass', function(){
   var param = [];
   return function(item) {
     if(!item){
       return param;
     }
     param = item;
   };
})
.controller('AppCtrl', function($scope, $ionicModal, $http, commonDefine,$interval) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.user = {"nickname":"abc"};
  $scope.friends = [];
  $scope.unreadmsg = false;
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  var userid = readLocalValue("userid");
  $scope.showGenderSelect = function(){
    //选择性别
    var gender = readGender();
    if(gender == undefined || gender == null){
      return true;
    } 
    else{
     //不是第一次登录
     $scope.getUserInfo();
     $scope.getFriendsList();
     $scope.uploadGeoInfo();
     return false;
    }
  }
  
  $scope.getUserInfo = function(){
      //{--------------ajax请求用户信息
    $scope.user = {"userid":10000,"nickname":"用户10000","id":1,"city":"上海","username":"10000"};
     //-----------------} 
  }
  
   $scope.getFriendsList = function(){
   //***获得好友列表
   //{--------------ajax请求好友列表
   
    $scope.unreadmsg=false;
    $scope.friends = [{"id":"2","userid":"10001","nickname":"\u7528\u623710001","city":"\u676d\u5dde\u5e02","gender":"2","age":"24","lng":"120.12","lat":"30.32","dist":"2.9\u5343\u7c73","unreadmsg":"0"},{"id":"3","userid":"10002","nickname":"\u7528\u623710002","city":"\u4e0a\u6d77\u5e02","gender":"1","age":"26","lng":"121.220123","lat":"31.10358","dist":"\u5927\u4e8e3\u5343\u7c73","unreadmsg":"0"},{"id":"4","userid":"10003","nickname":"\u7528\u623710003","city":"\u4e0a\u6d77\u5e02","gender":"2","age":"32","lng":"121.380123","lat":"31.20358","dist":"\u5927\u4e8e3\u5343\u7c73","unreadmsg":"0"}];
    for(var i = 0; i < $scope.friends.length; i++){
      if($scope.friends[i].unreadmsg > 0){
        $scope.unreadmsg=true;
        break;
      }
    }
     //-----------------} 
  }
  
  $scope.uploadGeoInfo = function(){
    //*** 上传地理位置信息
    
  }
//######################################  
  $scope.closeButtonVisible = true;
  //预加载性别选择对话框
  if($scope.showGenderSelect()){
     $ionicModal.fromTemplateUrl('templates/selectgender.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.error = {"msg":"","show":"none"};
        $scope.modal2 = modal;
      }).then(function(){
        $scope.modal2.show();
      });
  }


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    var user = $scope.loginData.username;
    var pwd = $scope.loginData.password;
    if(!user){
      $scope.error={"msg":"用户名不能为空","show":""};
      return;
    }
    if(!pwd){
      $scope.error={"msg":"密码不能为空","show":""};
      return;
    }
    
    //{--------------ajax登录请求
    if($scope.modal2){
      $scope.modal2.hide();
    }
    $scope.closeLogin();
    $scope.user =  {"userid":10000,"nickname":"用户10000","id":1,"city":"上海","username":"10000"};
    var gender = $scope.user.gender == 1 ? "male" : "female";
    saveLocalValue("gender", gender);
    saveLocalValue("userid", $scope.user.userid);
    userid = $scope.user.userid;
    $scope.getFriendsList();
    $scope.uploadGeoInfo();
     //-----------------} 
  };
  
    $scope.selectGender = function(g){
      var strGender = g==1 ? "male" : "female";
      saveLocalValue("gender", strGender);
      saveLocalValue("userid", 10000);
      $scope.user =  {"userid":10000,"nickname":"用户10000","id":1,"city":"上海","username":"10000"};
      $scope.closeLogin();
      $scope.modal2.hide();
      $scope.getFriendsList();
  };
  
    var timer = $interval(function(){
      $scope.getFriendsList();
    },30000);
  
  $scope.$on("$destroy", function() {
      console.log("debug", "AppCtrl destory");
      if(timer){
        $interval.cancel(timer);
      }
  });
})

.controller('GamelistsCtrl', function($scope,$http,commonDefine,valuePass) {
  $scope.gamelists = [[{"id":"1","name":"\u7206\u7092\u4e09\u56fd","images":[{"img":""},{"img":""}]},{"id":"2","name":"\u6ce1\u6ce1\u7cd6","images":[{"img":""},{"img":""}]},{"id":"3","name":"\u6697\u9ed1","images":[{"img":""},{"img":""}]},{"id":"4","name":"\u6d4b\u8bd5\u6e38\u620f4","images":[{"img":""},{"img":""}]},{"id":"5","name":"\u6d4b\u8bd5\u6e38\u620f5","images":[{"img":""},{"img":""}]},{"id":"6","name":"\u6d4b\u8bd5\u6e38\u620f6","images":[{"img":""},{"img":""}]}]];

    $scope.server = commonDefine.serverHost;
    $scope.nopich = commonDefine.nopich;
    $scope.nopicw = commonDefine.nopicw;
    valuePass($scope.gamelists);
})

.controller('GamelistCtrl', function($scope, $stateParams, $http,commonDefine, valuePass, $timeout) {
  $scope.server = commonDefine.serverHost;
  $scope.LBSvisible=false;
  $scope.canStart = false;
  $scope.havePlayer = false;
  $scope.gameid=$stateParams.gamelistId;
  var data = valuePass();
  for(var i = 0; i < data.length; i++){
    if(data[i].id == $stateParams.gamelistId){
      $scope.gametitle = data[i].name;
    }
  }
 var userid = readLocalValue("userid");
 //*** 获取游戏详情
 $scope.title = "\u7206\u7092\u4e09\u56fd";
 $scope.data = {"id":"1","name":"\u7206\u7092\u4e09\u56fd","desc":"\u8fd8\u4e0d\u8ba9\u6211\u4f60\u7a81\u7136\u54ea\u5929\u8ba9\u4f60\u4e00\u5929\u80fd\u4f53\u9a8c\u6a21\u62df\u4f53\u9a8c\u6a21\u62df\u4ed6\u4e5f\u6ca1\u4f60\u592a\u90c1\u95f7\u592a\u90c1\u95f7\u5417","tag":"\u6302\u673a","company":"","website":"","icon":"","screen":[{"imageurl":""}]};
 
 $scope.canStart = true;
 valuePass($scope.data.website);
            
  
  //*** 获取谁在玩

  //*** 上传地理位置信息
 
})
.controller('ChatCtrl', function($scope, $stateParams, $timeout,$interval,$http,commonDefine){
  var chatto = $stateParams.userId;
  var userid = readLocalValue('userid');
  
    //***发送消息
  $scope.sendMsg = function(){
    var msgBox = document.getElementById("txtMyMsg");
    var text = msgBox.value;
    if(text.trim() == "" || text.length<=0){
      return;
    }
    var dateStr = new Date().toLocaleString();
    var item = {"direction":"chatleft", "msg":text, "nickname":"我", "sendtime":dateStr};
    $scope.chathistory.push(item);
    msgBox.value = "";
    
   //{--------------ajax 上传发送的信息
   //-----------------} 
  };
  
  $scope.chathistory=[{"direction":"chatright","msg":"ardhahdahdfasgg豆腐哈带回家啊的金融工具啊当然就更加啊人感觉啊居然感觉啊","nickname":"fahggf","sendtime":"2015-10-14 12:32:01"},{"direction":"chatright","msg":"华盛顿警方介绍","nickname":"fahggf","sendtime":"2015-10-14 12:32:01"},{"direction":"chatleft","msg":"哈德哈的人很多然后就啊今天人家家啊添加剂和陶然亭哈带头人和噶的尴尬对方噶地方噶当嘎但是噶的风格","nickname":"fahggf","sendtime":"2015-10-14 12:32:01"}];

 $timeout(function(){
   resizeChat();
   resizeScrollHeight();
 }, 100);

  
 $scope.watchChat = function(){
   //{--------------ajax查询聊天信息
    
   //-----------------} 
 }
 //***不停的检查新消息
  // var timer = $interval(function(){
  //     $scope.watchChat();
  //   },3000);
  //$scope.watchChat();
  
  // $scope.$on("$destroy", function() {
  //   console.log("debug","ChatCtrl destory")
  //     if (timer) {
  //         $interval.cancel(timer);
  //     }
  // });
 
})

.controller('ProfileCtrl', function($scope,$http,commonDefine,$ionicHistory,$timeout) {
  $scope.buttonState= {"updateuser":""};
  $scope.error = {"msg":"","visible":false}
  $scope.password = {"pwd":"","pwd2":""};
  $scope.closeError = function(){
    $scope.error = {"msg":"","visible":false}
  };
  $scope.updateUser = function(){
    console.log("update user", $scope.user);
    $scope.buttonState= {"updateuser":"disabled"};
    
    var user = $scope.user;
    var password = $scope.password;
    
    if(!user.username){
        showUpdateUserError($timeout,$scope,"请填写用户名!");
        return;
    }
    if(!user.nickname){
        showUpdateUserError($timeout,$scope,"请填写昵称!");
        return;
    }
    
    if(password && password.pwd){
      if(password.pwd != password.pwd2){
        showUpdateUserError($timeout,$scope,"两次输入的密码不一致!");
        return;
      }
    }
     //{--------------ajax更新用户
     $ionicHistory.goBack();
     //-----------------} 
  }
})
.controller('GamePlayCtrl', function($scope, $stateParams,commonDefine, valuePass,$http,$timeout) {
  
})
.controller('WhoIsPlayCtrl', function($scope, $stateParams,commonDefine,$http) {
  var gameid = $stateParams.gameId;
  var userid = readLocalValue('userid'); 
   //{--------------ajax 获取谁在玩
   //-----------------} 
  
});

function showUpdateUserError($timeout, $scope, msg){
  $scope.error = {"msg":msg,"visible":true};
  $timeout(function(){
    $scope.error = {"msg":"","visible":false}
    $scope.buttonState= {"updateuser":""};
  },2000)
}

function resizeChat(){
  //var l = document.getElementsByClassName("chat-left-l");
  var m = document.getElementsByClassName("chat-left-m");
  for(var i = 0; i < m.length; i++){
    var totalWidth = window.innerWidth;
    var textWidth = m[i].clientWidth;
    if(textWidth > totalWidth - 150){
      m[i].style.width = (totalWidth - 150)+"px";
    }
    
    //l[i].style.height = m[i].clientHeight + "px";
  }
}
/*
function showBackbutton(){
  var _btnBack = document.getElementsByClassName("button back-button");
  if(_btnBack){
    $(_btnBack).removeClass("hide");
    $(_btnBack).bind("click",function(){window.location.href="";});
  }
  $(".left-buttons>button").addClass("hide");
}
*/

function readGender(){
  return readLocalValue("gender");
}
function saveLocalValue(key,val){
    localStorage.setItem(key,val);
}
function readLocalValue(key){
    return localStorage.getItem(key);
}

//获取geolocation

// onError Callback receives a PositionError object
//
function onError(error) {
    //alert('code: '    + error.code    + '\n' +
    //      'message: ' + error.message + '\n');
    console.log(error.code, error.message);
}

function resizeGameScene(){
  var g = document.getElementById("gameSceneLayer");
  if(g){
    g.style.height = window.innerHeight+"px";
  }
}
function resizeScrollHeight(){
  var s = document.getElementsByClassName("scroll");
  for(var i = 0; i < s.length; i++){
    if(s[i].localName == "div"){
      var outer = s[i].parentNode.parentNode;
      for(var j = 0; j < outer.attributes.length; j++){
        if(outer.attributes[j].name == "nav-view" && outer.attributes[j].value == "active"){
          s[i].style.height = (window.innerHeight - 76) + "px";
          return;
        }
      }
    }
  }
}
