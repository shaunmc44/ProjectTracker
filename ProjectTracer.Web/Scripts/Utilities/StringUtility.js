(function () {
    this.Utilities = this.Utilities || {};
    var ns = this.Utilities;

    ns.StringUtility = ns.StringUtility || {};
    var su = ns.StringUtility;

    su.GetFullName = function (firstname, lastname) {
        if (firstname != null && lastname != null)
            return firstname + " " + lastname;
        else
            return "";
    }

    su.GetProperName = function (firstname, lastname) {
        if (firstname != null && lastname != null)
            return lastname + ", " + firstname;
        else
            return "";
    }
})();
