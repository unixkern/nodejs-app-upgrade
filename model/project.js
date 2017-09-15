var mongoose = require('../mongoose').mongoose;

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name : { type:String },
    version : { type:String },
    download_path : { type:String },
    is_force : { type:String },
    time : { type:Date, default:Date.now },
    option_people:{ type:String },
    is_delete:{ type:Boolean , default:false },
    file_md5:{ type:String },
    file_size:{ type:Number },
    file_name:{ type:String }
});

var ProjectModel = mongoose.model("project", ProjectSchema);

function add(name,version,download_path,is_force,option_people,file_md5,file_size,file_name,callback) {
    var project = new ProjectModel({ name: name,version:version,download_path:download_path,s_force:is_force,option_people:option_people,file_md5:file_md5,file_size:file_size,file_name:file_name});
    project.save(function (err) {
        if (err){
            return callback(err,null);
        }
        return callback(null,null);
    })
}

function del(id,callback) {
    ProjectModel.findByIdAndUpdate(id, { is_delete: true }, callback);
}

function update(id,name,version,download_path,is_force,option_people,file_md5,file_size,file_name,callback) {
    ProjectModel.findById(id,function (err,info) {
        if(err){
            return callback(err,null);
        }
        var param = {
            name: name || info.name,
            version:version || info.version,
            download_path:download_path || info.download_path,
            s_force:is_force || info.is_force,
            option_people:option_people || info.option_people,
            file_md5:file_md5 || info.file_md5,
            file_size:file_size || info.file_size,
            file_name:file_name || info.file_name,
        };

        ProjectModel.findByIdAndUpdate(id, param, callback);
    });

}

function query(page,size,callback) {
    ProjectModel.find({is_delete:false}).skip( (page-1)*size ).limit(size).sort({time:-1}).exec(function (err, res) {
        if (err) {
            return callback(err,null);
        }
        return callback(null,res);
    })

}

exports.add = add;
exports.del = del;
exports.update = update;
exports.query = query;