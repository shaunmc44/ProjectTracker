class DateUtility {
    ToJavaScriptDate(value) {
        if (!value) return null;

        var x;
        if ($.type(value) === "date") {
            x = value;
        }
        else {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            if (results) {
                x = new Date(parseFloat(results[1]));
            }
            else {
                x = new Date(value.toString());
            }
        }

        return x;
    }

    ToShortDateTimeString(value) {
        if (!value) return null;

        var date_format = '12'; /* FORMAT CAN BE 12 hour (12) OR 24 hour (24)*/

        var hour = value.getHours();  /* Returns the hour (from 0-23) */
        var minutes = value.getMinutes();  /* Returns the minutes (from 0-59) */
        var result = hour;
        var ext = '';

        if (date_format == '12') {
            if (hour > 12) {
                ext = 'PM';
                hour = (hour - 12);

                if (hour < 10) {
                    result = "0" + hour;
                } else if (hour == 12) {
                    hour = "00";
                    ext = 'AM';
                }
            }
            else if (hour < 12) {
                result = ((hour < 10) ? "0" + hour : hour);
                ext = 'AM';
            } else if (hour == 12) {
                ext = 'PM';
            }
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        result = result + ":" + minutes + ' ' + ext;

        return (value.getMonth() + 1) + "/" + value.getDate() + "/" + value.getFullYear() + " " + result;
    }

    ToShortDateString(value) {
        if (!value) return null;

        return (value.getMonth() + 1) + "/" + value.getDate() + "/" + value.getFullYear();
    }

    ToJsonDateString(value) {
        if (!value) return null;

        var x = this.ToJavaScriptDate(value);
        var response = x.toISOString();
        return response;
    }
}