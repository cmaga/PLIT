(function () {
    angular
        .module('Chrubix')
        .factory('bidService', bidService);

    function bidService($http) {
        var api = {
            addBid: addBid,
            getBids: getBids,
            getSpecificBid: getSpecificBid,
            uploadFile: uploadFile,
            updateBid: updateBid,
            removeBid: removeBid,
            saveFields: saveFields,
            updateBidMeta: updateBidMeta

        };
        return api;

        function updateBidMeta(vendorInfo, bidId) {
            console.log(vendorInfo);
            var url = "/api/update-bid-meta/" + bidId; //TODO where is url coming from wherever you see update-bid as an url it must be changed to include -meta
            return $http.put(url, vendorInfo) // TODO this data will come from the controller. Make sure if bidInfromation appears in the other service file to change the name they might correspond
                .then(function (response) {
                    return response.data;
                });
        }

        function addBid(bidInformation) {
            console.log(bidInformation);
            var url = "/api/add-bid";
            return $http.post(url, bidInformation)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }
        function saveFields(bidInformation, bidId) {
            console.log(bidInformation);
            var url = "/api/save-fields/" + bidId;
            return $http.put(url, bidInformation)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeBid(bidId) {
            var url = "/api/remove-bid/" + bidId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateBid(bidInformation, bidId) {
            console.log(bidInformation);
            var url = "/api/update-bid/" + bidId;
            return $http.put(url, bidInformation)
                .then(function (response) {
                    return response.data;
                });
        }

        function getBids() {
            var url = '/api/bids';
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getSpecificBid(bidId) {
            var url = '/api/bid/' + bidId;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function uploadFile(fileObj) {
            var url = "/api/bid/file";
            console.log(fileObj.file);
            return $http.post(url, fileObj)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
