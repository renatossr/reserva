angular.module('establishment.detail', ['establishment.detail.initialData'])
  .controller('EstablishmentDetailCtrl', 
      [        'Establishment', 'Position', 'Appointment', '$stateParams', 'initialData', 
      function (Establishment,   Position,   Appointment,   $stateParams,   initialData) {
    
    
    DAY_LABEL_PIXEL_SIZE = 70;
    RESERVATION_PIXEL_SIZE = 22;
    ONE_HOUR = 60*60*1000; //in miliseconds
        
    establishmentDetail = this;
    establishmentDetail.establishment = initialData.establishment;
    establishmentDetail.selectedPositions = [1]; //Initialize to null when position selection method is implemented
    establishmentDetail.position = establishmentDetail.establishment.positions.new();
    establishmentDetail.days = [];
    establishmentDetail.appointments = [];

    //Initialize Controller
    initializeController = function(){
      initializeDates();
    }

    //Initialize Days
    initializeDates = function(){
      currentTime = new Date; //set date to now
      day = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 0,0,0,0);
      for (i=0; i<=9; i++){
        day = new Date(day.getTime() + (24*ONE_HOUR));
        updateDays(day);
      }
    }

    //updateDays
    updateDays = function(day){
      establishmentDetail.days.push(day);
      updateAppointments(day);
    }

    // updateAppointments(day)
    updateAppointments = function(day){
      Appointment.where({position_id: establishmentDetail.selectedPositions, day: day}).then(function(response){
        establishmentDetail.appointments[day] = treatAppointments(response);  
      });
    }

    // treatAppointments
    treatAppointments = function(arr){
      var appointmentArray = [];
      appointmentArray = groupAppointments(arr);
      appointmentArray = renderPrepare(appointmentArray);
      return appointmentArray;
    }

    // groupAppointments(arr)
    groupAppointments = function(arr){
      var grouped = [];
      groupedByKind = groupByKind(arr);
      $.each(groupedByKind, function(key, value){
        grouped.push(mergeAppointments(groupedByKind[key]));
      });
      grouped = flatten(grouped);
      return grouped;
    }

    // groupByKind(arr) -> groups the appointments by kind and returns the grouped object
    groupByKind = function(arr){
      var grouped = {};
      for (i = 0; i < arr.length; i++){
        a = arr[i];
        if (!(a.kind in grouped)){
          grouped[a.kind] = [];
        }
        grouped[a.kind].push(a);
      };
      return grouped;
    }

    // mergeAppointments(arr)
    mergeAppointments = function(arr){
      merged = [];
      mergedLast = {};
      for (i = 0; i < arr.length; i++){
        a = arr[i];
        mergedLast = merged[merged.length - 1] ? merged[merged.length - 1] : {};

        // Push reservation into array every time that the start_time of the record in array is larger than appointment's start_time
        if (merged.length == 0 || (new Date(a.start_time).getTime() > new Date(mergedLast.end_time).getTime())){
          appointment = {};
          appointment.end_time = 0;
          merged.push(appointment);
          // Reservation start_time only only set at the beginning of each group
          merged[merged.length - 1].start_time = a.start_time;
          merged[merged.length - 1].kind = a.kind;
        }
        // Appointment end_time set at the beginning of each group or if end_time of record in array is larger than appointment's end_time
        if ((new Date(a.end_time).getTime()) > (new Date(merged[merged.length - 1].end_time).getTime())){
          merged[merged.length - 1].end_time = a.end_time;
        }
      };
      return merged;
    }

    flatten = function(a){
      var flattened = [];
      if (a.length > 0){
        flattened = a.reduce(function(lhs, rhs){
          return lhs.concat(rhs);
        });
      };
      return flattened;
    }

    // formatDate(day)
    formatDate = function(day){
      return day = Math.round(day.getTime()/1000);
    }
    
    // addAppointmentByClick
    establishmentDetail.addAppointmentByClick = function(day, hour, minute){
      var appointment = {};
      start_time = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute, 0, 0);
      end_time = new Date(start_time.getTime() + (0.5*ONE_HOUR));
      appointment.start_time = start_time;
      appointment.end_time = end_time;
      appointment.kind = "Appointment";
      addAppointment(day, appointment);
    }

    // addAppointment
    addAppointment = function(day, appointmentInfo){
      var arr = [];
      var appointment = Appointment.new();
      appointment.start_time = appointmentInfo.start_time;
      appointment.end_time = appointmentInfo.end_time;
      appointment.kind = appointmentInfo.kind;
      appointment.position_id = 1; // CHANGE LATER TO INCORPORATE SAVING THE APPOINTMENT TO MULTIPLE POSITIONS
      appointment.$save().then(function(response){
        arr[0] = response;
        arr = renderPrepare(arr);
        establishmentDetail.appointments[day].push(arr[0]);
      });
    }

    // Prepares each appointment in array for rendering
    renderPrepare = function(arr){
      for (i=0; i < arr.length; i++){
        arr[i].class = (arr[i].kind).toLowerCase();//S(a.kind).dasherize().chompLeft('-').s;
        arr[i].left_position = appointmentLeftPosition(arr[i]);
        arr[i].duration = appointmentWidth(arr[i]);
      };
      return arr;
    }

    // Calculate the left position of the event
    appointmentLeftPosition = function(a){
      startTime = new Date(a.start_time).getTime();
      beginningOfDay = new Date(a.start_time).setHours(0,0,0,0);
      return DAY_LABEL_PIXEL_SIZE + ( (startTime - (beginningOfDay + 7 * ONE_HOUR) ) / (0.5 * ONE_HOUR) ) * RESERVATION_PIXEL_SIZE;
    }

    appointmentWidth = function(a){
      start = new Date(a.start_time).getTime()
      end = new Date(a.end_time).getTime()
      duration = end - start
      return RESERVATION_PIXEL_SIZE * duration / (0.5 * ONE_HOUR)
    }

    // Adds a position to the current establishment
    establishmentDetail.addPosition = function(data){
      position = establishmentDetail.establishment.positions.new();
      position.name = data.name;
      position.$save().then(function(response){
        position = response;
      });
    };

    // Reset form after save
    Position.after('$save', function() {
      establishmentDetail.position = establishmentDetail.establishment.positions.new();
      establishmentDetail.addPositionForm.$setPristine(); //resets the form for a new input
    });

    initializeController();
  }]);
