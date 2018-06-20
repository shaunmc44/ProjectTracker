(function () {
    "use strinct";

    this.Utilities = this.Utilities || {};
    var u = this.Utilities;

    u.FileUtility = u.FileUtility || {};
    var fu = u.FileUtility;

    fu.ConvertJsonToCsv = function (json, fields) {
        var replacer = function (key, value) { return value === null ? '' : value }
        var csv = json.map(function (row) {
            return fields.map(function (fieldName) {
                return JSON.stringify(row[fieldName], replacer);
            }).join(',');
        });
        csv.unshift(fields.join(',')); // add header column

        return csv.join('\r\n');
    }

})();