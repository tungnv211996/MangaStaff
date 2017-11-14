$(function(){
    
    var idStaff; //get id of Staff. Can Use in update information and view task function
    var action = 1; //Use to set #post-infor-button is creatiton or updation
    var t = ""; //use to validate property not empty
    $('.form-staff').hide();

    //VIEW all staffs button function
    $(document).on('click', '#get-button', function() {
        $.ajax({
          url: '/api/viewInfor',
          method: 'GET',
          contentType: 'application/json',
          success: function(res) {
            var data = res.staffs;
            // Clear the tbody
            $('tbody').html('');
            // Loop and append
            data.forEach(function print(staff) {
              viewStaff(staff);
            });
          }
        });
    });

    //VIEW saffs is filtered by position
    $(document).on('click', '#search-button', function(){
        
        var position = $('#key-search').val();
        $.ajax({
            url: '/api/viewInforByPosition/' + position,
            method: 'GET',
            contentType: 'application/json',
            data: JSON.stringify({positionStaff: position}),
            success: function(res) {
              var data = res.staffs;
              // Clear the tbody
              $('tbody').html('');
              // Loop and append
              data.forEach(function print(staff) {
                viewStaff(staff);
              });
            }
          });
    })
    //ADD button function
    $('#add-button').on('click', function(){
        $('.get-all-staff').hide();
        $('.form-staff').show();
        $('.form-detail').hide();
    });

    //INFORMATION button function
    $('#form-infor-button').on('click', function(){
        $('.form-detail').show();
        $('.task').show();
        $('.infor').show();
        $('.task').hide();
    })

    //TASK button function
    $('#form-task-button').on('click', function(){
        $('.form-detail').show();
        $('.task').show();
        $('.infor').show();
        $('.infor').hide();
    })

    //BACK button function
    $('.back-button').on('click', function(){
        $('.form-staff').hide();
        $('.get-all-staff').show();
        $('#get-button').trigger('click');
    })

    $(document).on('click', '#post-infor-button', function() {
        
        // Get the value from form
        var name = $('#nameStaff').val();
        var email = $('#emailStaff').val();
        var phone = $('#phoneStaff').val();
        var position = $('#positionStaff').val();
        var status = $('#statusStaff').val();

        if(!validateName(name)||!validateEmail(email)||!validatePhone(phone)||!validatePosition(position)||!validateStatus(status)){
            Materialize.toast('Please import again', 4000); 
        }
      
        //POST information of staff
        else if(action == 1){
        
            // Post value
            $.ajax({
                url: '/api/saveInfor',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({nameStaff: name, emailStaff:email, phoneStaff: phone, positionStaff: position, statusStaff: status}),
                success: function(response) {

                    //get idStaff
                    var data = response.staffs;
                    data.forEach(function(staff) {
                        idStaff = staff._id
                    })
                    //alert(idStaff);
                    $('#form-task-button').trigger('click');
                    Materialize.toast(response.message, 4000);
                }
            });
        action = 2;
        }
        //UPDATE information of staff
        else{
             // Post value
            $.ajax({
                url: '/api/editInfor/' + idStaff,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({nameStaff: name, emailStaff:email, phoneStaff: phone, positionStaff: position, statusStaff: status}),
                success: function(response) {

                    $('#form-task-button').trigger('click');
                    Materialize.toast(response.message, 4000);
                }
            });
        }
    });

    //POST task of staff function
    $(document).on('click', '#post-task-button', function() {

         // Get the value from form
        var name = $('#nameTask').val();
        var timeStart = $('#timeStartTask').val();
        var timeFinish = $('#timeFinishTask').val();
        var detail = $('#detailTask').val();
       
        if(!validateName(name)||!validateTwoDates()||!validateDetailTask(detail)){
           Materialize.toast('Please import again', 4000); 
        }
        // Post value
        else{
            $.ajax({
                url: '/api/saveTask',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({idStaff: idStaff, nameTask: name, timeStartTask:timeStart, timeFinishTask: timeFinish, detailTask: detail}),
                success: function(response) {
                    Materialize.toast(response.message, 4000);
                    $('#get-button').trigger('click');
                    $('.form-staff').hide();
                    $('.get-all-staff').show();
                }
            });
            action = 1; 
            clearVal();
        }
    });

    
    // Functions to validate property of information. Used in POST infor function
    function validateEmail(email) {
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reg.test(email)) {
            Materialize.toast('Please enter a valid email address', 4000);
            return false;
        } else {
            return true;
        }
    }

    function validateName(name) {
        if( t != name ) {
            return true;
        } else {
            Materialize.toast('Name is empty', 4000);
            return false;
        }
    };

    function validatePhone(phone) {
        if( t != phone ) {
            return true;
        } else {
            Materialize.toast('Phone is empty', 4000);
            return false;
        }
    };

    function validatePosition(position) {
        if( t != position ) {
            return true;
        } else {
            Materialize.toast('Position is empty', 4000);
            return false;
        }
    };

    function validateStatus(status) {
        if( t != status ) {
            return true;
        } else {
            Materialize.toast('Status is empty', 4000);
            return false;
        }
    };

    //Functions to validate property of task. Used in POST task function
    function validateTwoDates() {
        var $dateStartTask = $("#timeStartTask").val();
        var $dateFinishTask = $("#timeFinishTask").val();
        if($dateFinishTask > $dateStartTask){
            return true;
        } else {
            Materialize.toast('Date finish must to be greater date start', 4000);
            return false;
        }
    }

    function validateDetailTask(detail){
        if( t != detail ) {
            return true;
        } else {
            Materialize.toast('Detail is empty', 4000);
            return false;
        }
    }
        
    //Clear value function
    function clearVal(){
        $('#nameStaff').val('');
        $('#emailStaff').val('');
        $('#phoneStaff').val('');
        $('#positionStaff').val('');
        $('#statusStaff').val('');
        $('#nameTask').val('');
        $('#detailTask').val('');
    }

    //View staff function
    function viewStaff(staff){
        $('tbody').append(
            '<tr>' + 
            "<td class='idStaff'>"+staff._id+"</td>"+
            "<td class='nameStaff'>" + staff.nameStaff +"</td>" +
            "<td class='emailStaff'>" + staff.emailStaff + "</td>" +
            "<td class='phoneStaff'>" + staff.phoneStaff + "</td>" + 
            "<td class='positionStaff'>" + staff.positionStaff + "</td>" + 
            "<td class='statusStaff'>" + staff.statusStaff + "</td>" + 
          '</tr>'
        );
    }
})