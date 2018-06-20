(function() {
    this.Utilities = this.Utilities || {};
    var u = this.Utilities;

    u.FormUtility = u.FormUtility || {};
    var fu = u.FormUtility;

    fu.HasInactiveItems = function(form) {
        var controls = document.getElementById(form.$name);

        for (var counter = 0; counter < controls.length; counter++) {
            //If it is a dropdown
            if (controls[counter].type === "select-one") {
                var text = $('#' + controls[counter].name + ' option:selected').text();
                //Check for inactive status 
                if (text.indexOf("Inactive") !== -1) {
                    return true;
                }
            }
        }
        return false;
    };

})();