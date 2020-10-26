$('Document').ready(() => {

    // RenderField 
    function RenderDriver(arr) {
        this.fields = arr[0]['Fields'];
        this.currUser;
        this.reqFields = {};
        this.rules = {};
        this.getHTML = () => {
            let i = 0;
            for(const x in this.fields) {
                i++;
                if(i % 2 == 0) {
                    $('#vehicle-form1').append(this.setFields(this.fields[x]));
                } else {
                    $('#vehicle-form2').append(this.setFields(this.fields[x]));
                }
            }
            $('#vehicle-form1').append('<button class="complete-button" id="clear">Clear</button><div style="width:5px;display:inline-block;"/><button class="complete-button" id="save">Save</button>');
        };

        this.validateEntry = (fieldVal) => {
            if(fieldVal) {
                fieldVal = fieldVal.replace(/[^a-zA-Z0-9]/g, '_');
                if(this.rules[fieldVal].split(';')[0] == 'REQUIRED') {
                    this.reqFields[fieldVal] = '';
                }
            }
        }

        this.validateRules = (rule, ruleArr, targVal) => {
            $.modal.defaults = {
                closeExisting: true,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
                escapeClose: false,      // Allows the user to close the modal by pressing `ESC`
                clickClose: false,       // Allows the user to close the modal by clicking the overlay
                closeClass: 'modal-button'
            };
            if(ruleArr) {
                if(ruleArr.length > 0) {
                    for(var j = 0; j < ruleArr.length; j++) {
                        if(ruleArr[j] == 'REQUIRED') {
                            if(targVal === '') {
                                $('#data-validation').modal();
                                $('#modal-content').empty().append(`<p>Required field: ${rule.replace(/_/g, ' ')}`);
                                $('#modal-button').on('click', function() {
                                    $(`#${rule}`).focus();
                                });
                                return;
                            } else {
                                this.reqFields[rule] = targVal;
                            }
                        } else if(ruleArr[j].startsWith('VALID')) {
                            var regExp = ruleArr[j].split("'");
                            var reg = new RegExp(regExp[1], 'g');
                            if(!targVal.match(reg)) {
                                var toDisplay = '';
                                for(var i = 0; i < regExp.length; i++) {
                                    if(regExp[i].includes('INVALID')) {
                                        toDisplay = regExp[i+1];
                                    }
                                }
                                $('#data-validation').modal();
                                $('#modal-content').empty().append(`<p>Invalid Entry: ${toDisplay}`);
                                $('#modal-button').on('click', function() {
                                    $(`#${rule}`).focus();
                                });
                                return;
                            };
                        }
                    }
                } 
            }  
        };

        this.validateDate = (month, day, year) => {
            var today = new Date();
            var age = today.getFullYear() - year;
            var m = today.getMonth() - month;
            if (m < 0 || (m === 0 && today.getDate() < day)) {
                age--;
            }
            return age < 105 && age > 15;
        };

        this.setFields = (obj) => {
            var typeArr = obj['Type'].split('(');
            var type = typeArr[0].replace(/[^A-Z]/g, '');
            var header = `<div class="col-md-5"><label>${obj['Description']}</label></div>`;
            var id = obj['Description'].replace(/[^a-zA-Z0-9]/g, '_');

            if(type == 'VARCHAR') {
                var numChar = typeArr[1].replace(/[^0-9]/g, '');
            }
            var htmlProps = {
                varCharElem : `<div class="col-md-7">
                                <ul class="data-list">
                                <li>
                                    <input id="${id}" name="Zip" class="form-control input-lg" data-model="Location" maxlength="${numChar}">
                                </li>
                                </ul>
                            </div>`,
                dateElem: `<div class="col-md-7"><ul class="data-list">
                            <li>
                            <input type="text" autocomplete="off" id="5903F50A-CE9D-0370-213E-29820CD4DF32" name="AppBirthDate" class="form-control input-lg hasTFDate" data-model="Customer" 
                            data-widget="TFDate" maxlength="10" tabindex="-1" style="width: 100px; position: absolute; opacity: 0; height: 
                            0px; font-size: 14px; z-index: -9999;">
                                <span class="TFDate" style="display: inline-block;">
                                <span class="TFDate-Inner form-inline" style="display: inline-block;"><span class="TFDate-Cell" style="display: 
                                inline-block;">
                                    <input id="${id}_Month" class="TFDate-Month form-control input-lg date-field" maxlength="2" type="tel" placeholder="MM" size="2"></span>
                                <span class="TFDate-Cell" style="display: inline-block;">
                                    <input id="${id}_Day" class="TFDate-Day form-control input-lg date-field" maxlength="2" type="tel" placeholder="DD" size="2"></span>
                                <span class="TFDate-Cell" style="display: inline-block;">
                                    <input id="${id}_Year" class="TFDate-Year form-control input-lg date-field" maxlength="4" type="tel" placeholder="YYYY" size="4"></span></span></span></li></ul></div>`,
                enumElem: `<div class="col-md-7">
                            <ul class="data-list">
                            <li>
                                <select id="${id}" type="tel" autocomplete="off" id="52D8E93A-B5D1-0ADB-519D-1B484BBEB21C" name="Zip" class="form-control input-lg select2-hidden-accessible" data-model="Location" maxlength="5">`
            }
            this.rules[id] = obj['Rules'];
            this.validateEntry(obj['Description']);
            switch(type) {
                case 'VARCHAR':
                    return `<div class="col-md-8 col-md-offset-2">${header}${htmlProps['varCharElem']}</div>`;
                case 'DATE':
                    this.rules[`${id}_Month`] = obj['Rules'];
                    this.rules[`${id}_Year`] = obj['Rules'];
                    this.rules[`${id}_Day`] = obj['Rules'];
                    return `<div class="col-md-8 col-md-offset-2">${header}${htmlProps['dateElem']}</div>`;
                case 'ENUM':
                    var selections = typeArr[1].split(',');
                    for(var i = 0; i < selections.length; i++) {
                        htmlProps['enumElem'] += `<option value="${selections[i].replace(/[^a-zA-Z]/g, '')}">${selections[i].replace(/[^a-zA-Z]/g, '')}</option>`
                    }
                    htmlProps['enumElem'] += '<select></li></ul></div>';
                    return `<div class="col-md-8 col-md-offset-2">${header}${htmlProps['enumElem']}</div>`;
            }
        };

        this.clearFields = (className) => {
            $(`.${className}`).find(':input').each(function() {
                switch(this.type) {
                    case 'password':
                    case 'text':
                    case 'textarea':
                    case 'file':
                    case 'select-one':
                    case 'select-multiple':
                    case 'date':
                    case 'number':
                    case 'tel':
                    case 'email':
                        jQuery(this).val('');
                        break;
                    case 'checkbox':
                    case 'radio':
                        this.checked = false;
                        break;
                }
            });
        };
    }

    //Event Handlers
    var newDriver;
    $('#Driver').on('click', () => {
        $.ajax({
            url: 'http://localhost:400/Models?Name=Driver',
            type: 'GET',
            contentType: 'application/json;charset=utf-8'
        }).done((res) => {
            $('#vehicle-form1').empty();
            $('#vehicle-form2').empty();
            $('#Driver').css({'background': '#00aeef', 'color': '#fff'});
            $('#NonDrivingHousehold').css({'background': '#fff', 'color': '#00aeef'});
            newDriver = new RenderDriver(res[0]['Model']['Driver']);
            newDriver.currUser = 'Driver';
            newDriver.getHTML();
        });
    });

    $('#NonDrivingHousehold').on('click', () => {
        $.ajax({
            url: 'http://localhost:400/Models?Name=NonDrivingHouseHold',
            type: 'GET',
            contentType: 'application/json;charset=utf-8'
        }).done((res) => {
            $('#vehicle-form1').empty();
            $('#vehicle-form2').empty();
            $('#Driver').css({'background': '#fff', 'color': '#00aeef'});
            $('#NonDrivingHousehold').css({'background': '#00aeef', 'color': '#fff'});
            newDriver = new RenderDriver(res[0]['Model']['HouseHoldMember']);
            newDriver.currUser = 'HouseholdMember'
            newDriver.getHTML();
        });
    });

    $('#vehicle-form1').focusout((e) => {
        var rulesList;
        if(newDriver.rules[e.target.id]) {
            rulesList = newDriver.rules[e.target.id].split(';');
        }
        // Handle birthdate exceptions
        if(e.target.id == 'Birthdate_Month' && e.target.value != '' && !isNaN(e.target.value)) {
            $('#Birthdate_Day').focus();
        } else if(e.target.id == 'Birthdate_Day' && e.target.value != '' && !isNaN(e.target.value)) {
            $('#Birthdate_Year').focus();
        } else if(e.target.id == 'Birthdate_Year' && e.target.value != '' && !isNaN(e.target.value)) {
            if(!newDriver.validateDate($('#Birthdate_Month').val(), $('#Birthdate_Day').val(), e.target.value)) {
                newDriver.validateRules(e.target.id, rulesList, e.target.value);
            }
        } else {
            newDriver.validateRules(e.target.id, rulesList, e.target.value);
        }
    });

    $('#vehicle-form2').focusout((e) => {
        var rulesList;
        if(newDriver.rules[e.target.id]) {
            rulesList = newDriver.rules[e.target.id].split(';');
        }
        // Handle birthdate exceptions
        if(e.target.id == 'Birthdate_Month' && e.target.value != '' && !isNaN(e.target.value)) {
            $('#Birthdate_Day').focus();
        } else if(e.target.id == 'Birthdate_Day' && e.target.value != '' && !isNaN(e.target.value)) {
            $('#Birthdate_Year').focus();
        } else if(e.target.id == 'Birthdate_Year' && e.target.value != '' && !isNaN(e.target.value)) {
            if(!newDriver.validateDate($('#Birthdate_Month').val(), $('#Birthdate_Day').val(), e.target.value)) {
                newDriver.validateRules(e.target.id, rulesList, e.target.value);
            }
        } else {
            newDriver.validateRules(e.target.id, rulesList, e.target.value);
        }
    });

    $(document).on('click', '#save', function(){ 
        $.modal.defaults = {
            closeExisting: true,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
            escapeClose: false,      // Allows the user to close the modal by pressing `ESC`
            clickClose: false,       // Allows the user to close the modal by clicking the overlay
            closeClass: 'modal-button'
        };
        $('#modal-content').empty();
        var validEntry = true;
        for(let x in newDriver.reqFields) {
            if(newDriver.reqFields[x] === '') {
                $('#modal-content').append(`<p>Required field: ${x.replace(/_/g, ' ')}`);
                validEntry = false;
            }
        }
        if(!validEntry) {
            $('#data-validation').modal();
        } else {
            $('#total-members').css("visibility", "visible");
            if(newDriver.currUser === 'HouseholdMember') {
                $('#household-list').append(`<p>${newDriver.reqFields['First_name']} ${newDriver.reqFields['Last_name']} - ${newDriver.reqFields['Relation_to_applicant']}`);
                // Reset all values
                newDriver.clearFields('vehicle-form');
                $.ajax({
                    type: 'POST', 
                    url: 'http://localhost:400/HouseHoldMember',
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify(newDriver.reqFields) 
                }).done((res) => {
                    console.log(res);
                });
            } else {
                $('#driver-list').append(`<p>${newDriver.reqFields['First_name']} ${newDriver.reqFields['Last_name']} - ${newDriver.reqFields['Relation_to_applicant']}`);
                // Reset all values
                newDriver.clearFields('vehicle-form');
                $.ajax({
                    type: 'POST', 
                    url: 'http://localhost:400/Driver',
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify(newDriver.reqFields) 
                }).then((res) => {
                    console.log(res);
                });
            }
        }
    });

    $(document).on('click', '#clear', () => {
        newDriver.clearFields('vehicle-form');
    });
});
