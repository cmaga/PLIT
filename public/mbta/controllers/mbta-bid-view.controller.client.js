(function () {
    angular
        .module('Chrubix')
        .controller('MBTAbidViewController', MBTAbidViewController);

    function MBTAbidViewController(bidService, $routeParams, currentUser, documentService, $location) {
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
        //store vendor name only so that at the database we can search for this vendor in the array and remove him

        model.removeV = function(V) {
            //var index = Vendors.indexOf(V); //this index is created by angular and we are using it here to determine which vendor in the array to remove.
            var specificVendor = V;

            bidService.removeBidMeta(V, $routeParams.bidNumber)
                .then(function (V) {
                    $location.url('/view-bid/' + $routeParams.bidNumber);
                });
        };
        /////
        /*var Vendor = {
            vName: model.vName,
            receivedBy: model.receivedBy,
            rDate: model.rDate,
            rTime: model.rTime,
        };

        bidService.updateBidMeta(Vendor, $routeParams.bidNumber)
            .then(function (Vendor) {
                $location.url('/view-bid/' + $routeParams.bidNumber);
            });

    };

*/
        ////


        function init() {
            bidService.getSpecificBid($routeParams.bidNumber)
                .then(function (res) {
                    model.bid = res[0];
                    model.Vs = model.bid.Vendor; //Vs is the array of vendor objects and we can use it as an arry af variable within this file

                })
        }

        init();

    }
})();