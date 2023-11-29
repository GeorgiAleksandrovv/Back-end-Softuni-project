const Offer = require("./../models/Offers")

exports.create = (createData) => Offer.create(createData)

exports.getAll = () => Offer.find();

exports.singleOffer = (offerId) => Offer.findById(offerId)

exports.search = async(name , searchType) => {
    let offer = await this.getAll().lean();

    if(name){
        offer = offer.filter(x => x.name.toLocaleLowerCase() == name)
    }

    if(searchType){
        offer = offer.filter(x => x.searchType == searchType)
    }
    return offer
}

exports.update = (offerId, createData) => Offer.findByIdAndUpdate(offerId, createData)

exports.delete = (offerId) => Offer.findByIdAndDelete(offerId)

exports.buy = async (userId, offerId) =>{
    const offer = await Offer.findById(offerId)
    offer.buyers.push(userId)
    return offer.save()
} 