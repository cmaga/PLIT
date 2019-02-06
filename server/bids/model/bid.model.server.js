var mongoose = require('mongoose');
var bidSchema = require('./bid.schema.server');
var bidModel = mongoose.model('BidModel', bidSchema);

bidModel.createBid = createBid;
bidModel.getBids = getBids;
bidModel.updateBid = updateBid;
bidModel.removeBid = removeBid;


bidModel.getSpecificBid = getSpecificBid;
bidModel.removeVendor = removeVendor;
bidModel.addVendor = addVendor;
module.exports = bidModel;

function removeVendor(bidId) {
    //find specific bid first
    //remove the vendor from that bid but vendor is an array of objects.
    // TODO not sure about array object selection.
    //var vendorToRemove = "";
    bidModel.update({ _id: diveId }, { "$pull": { "Vendor": { "vName": vendorIdToRemove } }}, { safe: true, multi:true }, //xxx should be user inputed name of the vendor we want to take out.
        function(err, obj) {
        //do something smart
    });
}
function addVendor(bidId) {
    //find specfic bid first
    //add a vendor to the bid
    bidModel.update(
        {"_id": bidId}, //where
        { $push: { scores: 89 } } //what do
    );

    bidModel.update(
        { _id: person._id },
        { $push: { friends: friend } },
        done
    );
}

function createBid(bid) {
    bid.Timeframe = Date.parse(bid.Timeframe);
    console.log("server" + JSON.stringify(bid));

    return bidModel.create(bid);
}

function getBids() {
    return bidModel.find();
}

function getSpecificBid(bidId) {
    return bidModel.find({"_id": bidId});
}

function updateBid(bid, bidId) {
    console.log(bidId);
    console.log("UPDATING " + JSON.stringify(bid))
    return bidModel.updateOne({"_id": bidId}, {$set: bid});
}
function removeBid(bidId) {
    return bidModel.remove({"_id": bidId});
}
