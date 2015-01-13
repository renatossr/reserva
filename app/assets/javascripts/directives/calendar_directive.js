angular.module('ux.calendar', [])
.directive('uxCalendar', function() {
  return {
    restrict: 'E',
    compile: function(element, attrs)
    {
      var startHour = attrs.startHour ? attrs.startHour : 7;
      var endHour = attrs.endHour ? attrs.endHour : 21;
      var interval = attrs.intervalMinutes ? attrs.intervalMinutes : 30;
      var tableClass = attrs.class ? ' class="' + attrs.class + '"' : ''

      generateTableHead = function(){
        var shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        tableHead = 
        '<thead>' +
        '<tr>' +
        '<th></th>';
        
        for (i = 0; i < shortDayNames.length; i++){
          tableHead += '<th>' + shortDayNames[i] + '</th>'; 
        }

        tableHead += 
        '</tr>' +
        '</thead>';
        return tableHead;
      }

      generateTableBody = function(startHour, endHour, interval){
        endI = (endHour - startHour) * (60 / interval);
        
        tableBody = '<tbody>'

        for (i = 1; i <= endI; i++){
          hour = startHour + (Math.ceil(i/(60/interval)) - 1);
          console.log(i/(60/interval));
          minute = i * interval - (1+(hour - startHour)*(60/interval))*interval;

          tableBody += '<tr>';
          tableBody += '<td class="time">'+ hour + ':' + ('00' + minute).slice(-2) +'</td>';
          for (j = 1; j <= 7; j++){
            tableBody += '<td class="slot"></td>';
          };
          tableBody += '</tr>';
        };

        tableBody += '</tbody>';
        return tableBody;
      }
      
      var htmlText = '<table' + tableClass + '>';
      htmlText += generateTableHead();
      htmlText += generateTableBody(startHour, endHour, interval);
      htmlText += '</table>';

      element.replaceWith(htmlText);
    }
  }
});
