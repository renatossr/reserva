angular.module('session', [])
.service('Session', function () {
  this.userId = null;
  this.userName = null;
  this.userRole = 'guest';
  this.freshLoad = true;

  this.create = function (userId, userName, userRole) {
    this.userId = userId;
    this.userName = userName;
    this.userRole = userRole;
    this.freshLoad = false;
  };

  this.destroy = function () {
    this.userId = null;
    this.userName = null;
    this.userRole = 'guest';
    this.freshLoad = true;
  };

  return this;
});
