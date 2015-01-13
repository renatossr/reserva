angular.module('ux.calendar', [])
.directive('uxCalendarHorizontal', ['$compile', function($compile) {
  var htmlText;
  var startHour = 7;
  var endHour = 21;
  var interval = 30;

  // Generates the table head of the day schedule
  generateTableHead = function(){
    var endI = (endHour - startHour);
    var hour, hourOld;

    var tableHead = 
      '<thead>' +

      '<tr class="header">' +
      '<th></th>';
    for (i = 1; i <= endI; i++){
      hour = startHour + i - 1;
      for (j = 1; j <= (60/interval); j++){
        hour = startHour + i - 1;
        tableHead += '<th>' + ((hour == hourOld) ? '' : (hour + 'h')) + '</th>';
        hourOld = hour;
      }
    }
    tableHead += '</tr>';

    /*tableHead += '<tr class="header">' +
      '<th></th>';
      for (i = 1; i <= endI; i++){
      for (j = 1; j <= (60/interval); j++){
      minute = (j-1)*interval;
      tableHead += '<th>' + minute + 'm</th>';
      }
      }
      tableHead += '</tr>';
      */

    tableHead += '<tr class="spacer">' +
      '<th></th>';
    for (i = 1; i <= endI; i++){
      for (j = 1; j <= (60/interval); j++){
        tableHead += '<th></th>';
      }
    }
    tableHead += '</tr>';

    tableHead += '</thead>';
    return tableHead;
  }

  // Generates the table body
  generateTableBody = function(){
    var endI = (endHour - startHour);
    var minute;

    var tableBody = '<tbody>'
    tableBody += '<tr class="time">';
    tableBody += '<td class="row-header">';
    tableBody += '<span ng-no-bindable>{{day | date:"EEE" | filter:formatWeekday}} </span></br><span ng-no-bindable>{{day | date:"d/MM"}}</span>';
    tableBody += '</td>';

    for (i = 1; i <= endI; i++){
      hour = startHour + i - 1;
      for (j = 1; j <= (60/interval); j++){
        minute = (j-1)*interval;
        tableBody += '<td ng-click="onClick({day: day, hour: \'' + ('00' + hour).slice(-2) + '\', minute: ' + '\'' + minute + '\'})"></td>';
      }
    }
    tableBody += '</tr>';

    tableBody += '</tbody>';
    return tableBody;
  }

  var htmlText = '<table>';
  htmlText += generateTableHead();
  htmlText += generateTableBody();
  htmlText += '</table>';

  return {
    restrict: 'E',
    replace: true,
    template: htmlText,
    scope: { 
      day: '=',
      onClick: '&'
    },
    link: function(scope, element, attrs){
      $compile(element.contents())(scope.$new());
    }
  };
}]);

