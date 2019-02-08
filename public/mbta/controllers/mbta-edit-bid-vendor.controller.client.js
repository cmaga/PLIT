(function () {
    angular
        .module('Chrubix')
        .controller('MBTAbidMetaController', MBTAbidMetaController);

    function MBTAbidMetaController($location, bidService, $routeParams) {

        var model = this;
        model.addVendor = function () {
            // set vendor to be these variables
            //these get set by the controller due to use input
            var Vendor = {
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

       /* model.removeBid = function () {
            bidService.removeBid($routeParams.bidNumber)
                .then(function (bid) {
                    $location.url('/list-bids');
                });
        };
        */

       //TODO we get the specific bid information from the database. So this would populate if we wanted to update but we just want to create new array which is fine do the the mongocommand which kind of appends. But its needed for showing/listing.
        function init() {
            bidService.getSpecificBid($routeParams.bidNumber)
                .then(function (res) {
                    model.bid = res[0];
                    model.bidType = model.bid.bidType;
                    model.bidNumber = model.bid.bidNumber;
                    model.bidDesc = model.bid.bidDesc;
                    model.bidDeadline = new Date(model.bid.bidDeadline);
                    model.preBidDate = new Date(model.bid.preBidDate);
                    model.preBidLocation = model.bid.preBidLocation;
                    model.dbeOwner = model.bid.dbeOwner;
                    model.dbePercent = model.bid.dbePercent;
                    model.materialType = model.bid.materialType;
                })
        }

        init();
    }
})();