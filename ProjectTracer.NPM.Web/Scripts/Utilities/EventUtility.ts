angular.module("ProjectTrackerApp").service("EventUtility", class EventUtility {
    allSubscribers: any;

    constructor() {
        this.allSubscribers = {};
    }

    Subscribe(EventName, CallBack) {
        if (!this.allSubscribers[EventName]) {
            this.allSubscribers[EventName] = [];
        }

        this.allSubscribers[EventName].push(CallBack);
    }

    RaiseEvent(EventName, p1, p2, p3, p4, p5) {
        if (this.allSubscribers[EventName]) {
            var subscribers = this.allSubscribers[EventName];
            var i = 0;
            var n = subscribers.length;

            while (i < n) {
                var callBack = subscribers[i];
                callBack(p1, p2, p3, p4, p5);
                i++;
            }
        }
    }
});