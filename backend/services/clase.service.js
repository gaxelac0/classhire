var Clase = require("../models/clase.model")

// Saving the context of this module inside the _the variable
_this = this

async function getClases(query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        var Clases = await Clase.paginate(query, options)
        // Return the Clase list that was retured by the mongoose promise
        return Clases;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Clases');
    }
}
exports.getClases = getClases;

exports.addReview = async function (id, type, comment) {

    try {
        var result = await getClases({ _id: id }, 1, 1)

        let clase = result.docs[0];
        clase.comments.push({ type: type, comment: comment })
        clase.reviewCount = clase.reviewCount + 1;

        let cantNeg = clase.reviewNegative;
        let cantPos = clase.reviewPositive;
        if (type === "positive") {
            cantPos = cantPos + 1;
        } else {
            cantNeg = cantNeg + 1;
        }
        clase.reviewPositive = cantPos;
        clase.reviewNegative = cantNeg;

        let percentage = (100 * cantPos) / clase.reviewCount;

        clase.rating = percentage / 20;

        return await clase.save();
    } catch (e) {
        console.log("error services", e)
    }
}