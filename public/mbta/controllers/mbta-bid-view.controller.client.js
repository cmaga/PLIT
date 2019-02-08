(function () {
    angular
        .module('Chrubix')
        .controller('MBTAbidViewController', MBTAbidViewController);

    function MBTAbidViewController(bidService, $routeParams, currentUser, documentService) {
        var model = this;
        model.user = currentUser;
        model.getSpecificBid = function () {
            bidService
                .getSpecificBid($routeParams.bidNumber)
                .then(function (bid) {
                    model.bid = bid[0];
                    console.log(model.bid);
                });
        };
        model.getSpecificBid();
        model.generateDocument = function(){
            documentService
                .getDocument(model.bid)
        };
        model.formatDate = function (mongoDate) {
            var date = new Date(mongoDate);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var timeOfDay = "AM";
            if (hours > 12) {
                hours = hours - 12;
                timeOfDay = "PM"
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return month + "/" + day + "/" + year + " " + hours + ":" + minutes + " " + timeOfDay;
        };
        //TODO
        model.removeV = removeV;
        function removeV(V) {
            var index = Vendors.indexOf(V);

        }


        function init() {
            bidService.getSpecificBid($routeParams.bidNumber)
                .then(function (res) {
                    model.bid = res[0];
                    model.Vs = model.bid.Vendor;

                })
        }

        init();

    }
})();