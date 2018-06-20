(function () {
    this.Utilities = this.Utilities || {};
    var ns = this.Utilities;
    ns.ValidationErrorUtility = ns.ValidationErrorUtility || {};
    var vu = ns.ValidationErrorUtility;
    vu.ValidationErrorArrayToObject = function (ValidationErrorArray) {
        var response = {};
        if (ValidationErrorArray) {
            var i = 0;
            var n = ValidationErrorArray.length;
            while (i < n) {
                response[ValidationErrorArray[i].FieldName] = ValidationErrorArray[i].ErrorMessage;
                i++;
            }
        }
        return response;
    };
})();
//# sourceMappingURL=ValidationErrorUtility.js.map