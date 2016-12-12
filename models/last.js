const mongoose = require('mongoose');
const _ = require('lodash');

var lastSchema = new mongoose.Schema({
        term:{type:String},
        when:{type: Date, default: Date.now}
});


lastSchema.methods.toJSON = function(){
    var last = this;
    var lastObject = last.toObject();

    return _.pick(lastObject,['term','when']);

};

lastSchema.statics.deleteLast =function(){
    var last = this;

  return last.find().sort({when:1}).limit(1).then((doc)=>{
    if(!doc){
        return Promise.reject();
    }
       return last.remove({_id:doc[0]._id}).then((del)=>{
           return del;
        });
    });
}

var Last = mongoose.model('Last',lastSchema);

module.exports = {Last};