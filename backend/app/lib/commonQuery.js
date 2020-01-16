"use strict";
/*
 * commonQuery - commnQuery.js
 * Author: smartData Enterprises
 *
 */

var constant = require("../config/constant");
var mongoose = require("mongoose");
var fs = require("fs");

var path = require("path");
var async = require("async");

var commonQuery = {};

/**
 * Function is use to Fetch Single data
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 22-Jan-2018
 */
commonQuery.fetch_all_salons = function fetch_all_salons(
    model,
    cond = {},
    pageSize,
    page,
    lat,
    long,
    fromTable,
    localFieldVal,
    foreignFieldVal,
    second_fromTable,
    second_localFieldVal,
    second_foreignFieldVal,
    distance,
    name
) {
    console.log(second_fromTable, second_localFieldVal, second_foreignFieldVal);
    return new Promise(function(resolve, reject) {
        let pageSizes = pageSize;
        let currentPage = page;

        let postQuery = model.aggregate([
            { $match: cond },
            {
                $lookup: {
                    from: fromTable,
                    localField: localFieldVal,
                    foreignField: foreignFieldVal,
                    as: "salons"
                }
            },
            { $unwind: "$salons" },
            {
                $match: {
                    "salons.isservicesadded": "true"
                }
            },
            {
                $match: {
                    "salons.location": {
                        $geoWithin: {
                            $centerSphere: [
                                [lat, long], distance / 3963.2
                            ]
                        }
                    }
                }
            },

            {
                $match: {
                    "salons.name": new RegExp(name ? name : " ", "gi")
                }
            },
            {
                $lookup: {
                    from: second_fromTable,
                    localField: second_localFieldVal,
                    foreignField: second_foreignFieldVal,
                    as: "ratings"
                }
            },
            {
                $project: {
                    _id: "$salons._id",
                    name: "$salons.name",
                    location: "$salons.location",
                    address: "$salons.salonaddress",
                    contact: "$salons.contact",
                    image: "$salons.image",
                    avgRatings: { $avg: "$ratings.ratings" }
                }
            }
        ]);

        if (pageSizes && currentPage) {
            postQuery.skip(pageSizes * (currentPage - 1)).limit(pageSizes);
        }
        postQuery
            .then(result => {
                // console.log("999999999999999999999", result);

                resolve(result);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

commonQuery.fetch_near_salons = function fetch_near_salons(
    model,
    pageSize,
    page,
    dynamicQuery,
    distance,
    lat,
    long
) {


    return new Promise(function(resolve, reject) {
        let pageSizes = pageSize;
        let currentPage = page;

        let serviceQuery = [];
        console.log("lenght", dynamicQuery.length);
        // q["$and"].push({ services_id: { $in: dynamicQuery.split(",") } });
        //  if(dynamicQuery.length > 0){
        //   q["$and"].push({ services_id: {$in: dynamicQuery.split(",") }});
        // }
        dynamicQuery.forEach(async function(v) {
            serviceQuery.push(mongoose.Types.ObjectId(v));
            console.log(serviceQuery);
        });

        console.log("qqq", serviceQuery);

        let postQuery = model.aggregate([{
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [long, lat]
                    },
                    spherical: true,
                    distanceField: "dist.calculated",
                    distanceMultiplier: 0.000621371
                }
            },
            {
                $match: {
                    isservicesadded: "true"
                }
            },
            {
                $lookup: {
                    from: "salonservices",
                    localField: "_id",
                    foreignField: "salon_id",
                    as: "serviceArray"
                }
            },

            {
                $match: {
                    "serviceArray.service_id": {
                        $in: serviceQuery
                    }
                }
            },

            {
                $lookup: {
                    from: "services",
                    localField: "serviceArray.service_id",
                    foreignField: "_id",
                    as: "servicesData"
                }
            },
            {
                $lookup: {
                    from: "reviewratings",
                    localField: "serviceArray.salon_id",
                    foreignField: "salon_id",
                    as: "reviewsRatings"
                }
            },

            {
                $project: {
                    name: 1,
                    salonaddress: 1,
                    image: 1,
                    avgRatings: { $avg: "$reviewsRatings.ratings" },
                    distance: "$dist.calculated"
                }
            }
        ]);
        console.log("postQuery", JSON.stringify(postQuery));
        if (pageSizes && currentPage) {
            postQuery.skip(pageSizes * (currentPage - 1)).limit(pageSizes);
        }
        postQuery
            .then(result => {
                // console.log("999999999999999999999", result);
                console.log("RESULT", result);
                resolve(result);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

commonQuery.findoneData = async function findoneData(
    model,
    condition,
    fetchVal
) {
    return new Promise(function(resolve, reject) {
        model.findOne(condition, fetchVal, function(err, data) {
            if (err) {
                console.log("Erroe @ 234", err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

commonQuery.findAll = async function findAll(model, condition, pageSize, page) {
    let user = "_id";
    let pageSizes = pageSize;
    let currentPage = page;
    return new Promise(function(resolve, reject) {
        let postQuery = model.find(condition);

        if (pageSizes && currentPage) {
            postQuery.skip(pageSizes * (currentPage - 1)).limit(pageSizes);
        }
        postQuery.exec(function(err, data) {
            if (err) {
                console.log("err---->>>>>", err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

commonQuery.findoneBySort = function findoneBySort(
    model,
    condition,
    fetchVal,
    sortby
) {
    return new Promise(function(resolve, reject) {
        if (!sortby) {
            sortby = {
                _id: -1
            };
        }
        model
            .findOne(condition, fetchVal)
            .sort(sortby)
            .exec(function(err, data) {
                if (err) {
                    console.log("err---->>>>>", err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};
/**
 * Function is use to Last Inserted id
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 22-Jan-2018
 */
commonQuery.lastInsertedId = function lastInsertedId(model) {
    return new Promise(function(resolve, reject) {
        model
            .findOne()
            .sort({
                id: -1
            })
            .exec(function(err, data) {
                if (err) {
                    resolve(0);
                } else {
                    if (data) {
                        var id = data.id + 1;
                    } else {
                        var id = 1;
                    }
                }
                resolve(id);
            });
    });
};
commonQuery.sortAllData = function sortAllData(model, field_name) {
    return new Promise(function(resolve, reject) {
        model
            .find()
            .sort(field_name)
            .exec(function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};
commonQuery.sortAllDataDesc = function sortAllDataDesc(model, field_name) {
    return new Promise(function(resolve, reject) {
        let to_sort = {};
        to_sort[field_name] = -1;
        model
            .find()
            .sort(to_sort)
            .exec(function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};
commonQuery.lastInsertedIdPermissonId = function lastInsertedId(model) {
    return new Promise(function(resolve, reject) {
        model
            .findOne()
            .sort({
                permission_id: -1
            })
            .exec(function(err, data) {
                if (err) {
                    resolve(0);
                } else {
                    if (data) {
                        var id = data.permission_id + 1;
                    } else {
                        var id = 1;
                    }
                }
                resolve(id);
            });
    });
};

/**
 * Function is use to Insert object into Collections
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 22-Jan-2018
 */
commonQuery.InsertIntoCollection = function InsertIntoCollection(model, obj) {
    return new Promise(function(resolve, reject) {
        new model(obj).save(function(err, insertedData) {
            if (err) {
                console.log("errrrrrrrr", err);
                reject(err);
            } else {
                resolve(insertedData);
            }
        });
    });
};
/**
 * Function is use to Update One Document
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Jan-2018
 */
commonQuery.updateOneDocument = function updateOneDocument(
    model,
    updateCond,
    updateData
) {
    return new Promise(function(resolve, reject) {
        //console.log("Inside",updateCond,updateData);
        model
            .findOneAndUpdate(
                updateCond, {
                    $set: updateData
                }, {
                    new: true
                }
            )
            .lean()
            .exec(function(err, result) {
                //console.log("HHHHHH", err, result);
                if (err) {
                    console.log("errerrerrerrerrerr", err);
                    reject(0);
                } else {
                    //console.log("updatedData", result);
                    resolve(result);
                }
            });
    });
};
commonQuery.updateOne = function updateOne(model, updateCond, updateData) {
    return new Promise(async function(resolve, reject) {
        model
            .updateOne(updateCond, {
                $set: updateData
            })
            .lean()
            .exec(async function(err, result) {
                // console.log("HHHHHH", err, result);
                if (err) {
                    console.log("errerrerrerrerrerr", err);
                    reject(0);
                } else {
                    // console.log("updatedData", result);
                    resolve(result);
                }
            });
    });
};
/**
 * Function is use to Update One Document
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Jan-2018
 */
commonQuery.updateOneDocumentWithOutInserting = (
    model,
    updateCond,
    updateData
) => {
    return new Promise((resolve, reject) => {
        model
            .findOneAndUpdate(updateCond, {
                $set: updateData
            })
            .exec((err, updatedData) => {
                if (err) {
                    console.log(err);
                    return reject(0);
                } else {
                    return resolve(updatedData);
                }
            });
    });
};

/**
 * Function is use to Update All Document
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Jan-2018
 */
commonQuery.updateAllDocument = function updateAllDocument(
    model,
    updateCond,
    userUpdateData
) {
    return new Promise(function(resolve, reject) {
        model
            .update(
                updateCond, {
                    $set: userUpdateData
                }, {
                    multi: true
                }
            )
            .lean()
            .exec(function(err, userInfoData) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(userInfoData);
                }
            });
    });
};
commonQuery.updateMany = function updateMany(
    model,
    updateCond,
    userUpdateData
) {
    return new Promise(function(resolve, reject) {
        model
            .updateMany(updateCond, {
                $set: userUpdateData
            })
            .lean()
            .exec(function(err, userInfoData) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(userInfoData);
                }
            });
    });
};

/**
 * Function is use to Find all Documents
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Jan-2018
 */
commonQuery.fetch_all = function fetch_all(model, cond = {}, fetchd = {}) {
    return new Promise(function(resolve, reject) {
        model.find(cond, fetchd).exec(function(err, userData) {
            // console.log("userData", userData);
            if (err) {
                console.log("errrrrrr", err);
                reject(err);
            } else {
                resolve(userData);
            }
        });
    });
};
commonQuery.fetch_all_by_sort = function fetch_all_by_sort(
    model,
    cond = {},
    fetchd = {}
) {
    return new Promise(function(resolve, reject) {
        model
            .find(cond, fetchd)
            .sort("createdAt")
            .exec(function(err, userData) {
                if (err) {
                    console.log("errrrrrr", err);
                    reject(err);
                } else {
                    resolve(userData);
                }
            });
    });
};
commonQuery.fetch_one = function fetch_one(model, cond = {}, fetchd = {}) {
    return new Promise(function(resolve, reject) {
        model.findOne(cond, fetchd).exec(function(err, userData) {
            if (err) {
                console.log("errrrrrr", err);
                reject(err);
            } else {
                resolve(userData);
            }
        });
    });
};
commonQuery.hard_delete = function hard_delete(model, cond = {}) {
    return new Promise(function(resolve, reject) {
        model.remove(cond).exec(function(err, Data) {
            if (err) {
                console.log("errrrrrr", err);
                reject(err);
            } else {
                console.log("Data", Data);

                resolve(Data);
            }
        });
    });
};
/**
 * Function is use to Find all Distinct value
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2018
 */

commonQuery.fetch_all_distinct = function fetch_all_distinct(
    model,
    ditinctVal,
    cond
) {
    return new Promise(function(resolve, reject) {
        model.distinct(ditinctVal, cond).exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

/**
 * Function is use to Count number of record from a collection
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Jan-2018
 */
commonQuery.countData = function countData(model, cond) {
    return new Promise(function(resolve, reject) {
        model.countDocuments(cond).exec(function(err, userData) {
            if (err) {
                reject(err);
            } else {
                // console.log("userData", userData)
                resolve(userData);
            }
        });
    });
};
/**
 * Function is use to Fetch All data from collection , Also it supports aggregate function
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Jan-2018
 */
commonQuery.fetchAllLimit = function fetchAllLimit(query) {
    return new Promise(function(resolve, reject) {
        query.exec(function(err, userData) {
            if (err) {
                reject(err);
            } else {
                resolve(userData);
            }
        });
    });
};

/**
 * Function is use to Insert object into Collections , Duplication restricted
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 07-Feb-2018
 */

commonQuery.uniqueInsertIntoCollection = function uniqueInsertIntoCollection(
    model,
    obj
) {
    return new Promise(function(resolve, reject) {
        model
            .update(
                obj, {
                    $setOnInsert: obj
                }, {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }
            )
            .exec(function(err, data) {
                if (err) {
                    resolve(0);
                } else {
                    resolve(data);
                }
            });
    });
};

/**
 * Function is use to DeleteOne Query
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 07-Feb-2018
 */
commonQuery.deleteOneDocument = function deleteOneDocument(model, cond) {
    return new Promise(function(resolve, reject) {
        model.deleteOne(cond).exec(function(err, userData) {
            if (err) {
                resolve(0);
            } else {
                resolve(1);
            }
        });
    });
};
/**
 * Function is use to Insert Many object into Collections
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 15-Feb-2018
 */
commonQuery.InsertManyIntoCollection = function InsertManyIntoCollection(
    model,
    obj
) {
    return new Promise(function(resolve, reject) {
        model.insertMany(obj, function(error, inserted) {
            if (error) {
                console.log("---------------------", error);
                resolve(error);
            } else {
                resolve(inserted);
            }
        });
    });
};

/**
 * Function is use to delete Many document from Collection
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 16-Feb-2018
 */
commonQuery.deleteManyfromCollection = function deleteManyfromCollection(
    model,
    obj
) {
    return new Promise(function(resolve, reject) {
        model.deleteMany(obj, function(error, inserted) {
            if (error) {
                console.log("Reject", error);
                resolve(0);
            } else {
                console.log("Resolved");
                reject(1);
            }
        });
    });
};

commonQuery.mongoObjectId = function(data) {
    if (data && data !== null && data !== undefined) {
        return mongoose.Types.ObjectId(data);
    } else {
        return false;
    }
};

/**
 * Function is use to aggregate with match and lookup
 * @access private
 * @return json
 * Created by SmartData
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2018
 */

commonQuery.aggregateFunc = function aggregateFunc(
    model,
    fromTable,
    localFieldVal,
    foreignFieldVal,
    condition
) {
    return new Promise(function(resolve, reject) {
        model
            .aggregate([{
                    $match: condition
                },
                {
                    $lookup: {
                        from: fromTable,
                        localField: localFieldVal,
                        foreignField: foreignFieldVal,
                        as: "docs"
                    }
                }
            ])
            .exec(function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};

commonQuery.salonDetailsFetch = function salonDetailsFetch(
    model,
    fromTable,
    localFieldVal,
    foreignFieldVal,
    condition,
    second_fromTable,
    third_fromTable,
    fourth_fromTable
) {
    console.log(fromTable, localFieldVal, foreignFieldVal, condition);
    return new Promise(function(resolve, reject) {
        model
            .aggregate([{
                    $match: condition
                },

                {
                    $lookup: {
                        from: "reviewratings",
                        localField: "_id",
                        foreignField: "salon_id",
                        as: "ratings"
                    }
                },

                {
                    $lookup: {
                        from: "salonservices",
                        localField: "_id",
                        foreignField: "salon_id",
                        as: "salonserv"
                    }
                },

                {
                    $lookup: {
                        from: "categories",
                        localField: "salonserv.category_id",
                        foreignField: "_id",
                        as: "categoriess"
                    }
                },

                {
                    $unwind: "$categoriess"
                },

                {
                    $lookup: {
                        from: "services",
                        localField: "categoriess.services",
                        foreignField: "_id",
                        as: "servicess"
                    }
                },
                {
                    $lookup: {
                        from: "salonservices",
                        localField: "servicess._id",
                        foreignField: "service_id",
                        as: "pricing"
                    }
                },

                {
                    $group: {
                        _id: "$name",
                        categoryId: { $first: "$categoriess._id" },
                        salonaddress: { $first: "$salonaddress" },
                        contact: { $first: "$contact" },
                        location: { $first: "$location" },
                        avgRating: { $first: { $avg: "$ratings.ratings" } },
                        opentime: { $first: "$opentime" },
                        closetime: { $first: "$closetime" },
                        image: { $first: "$image" },
                        category: {
                            $push: {
                                category: "$categoriess",
                                services: "$servicess",
                                pricing: "$pricing"
                            }
                        }
                    }
                }
            ]).exec(function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    // console.log("FINALDATA",data);
                    let dataToPass = [];
                    let catergoriesTemp = [];
                    let finalArray = [];

                    data.forEach(function(v) {
                        console.log("V", v);
                        v.category.forEach(function(c) {
                            console.log("SSSSSSSSS", c);
                            catergoriesTemp.push({
                                categories: c.category.catname,
                                services: c.services,
                                prices: c.pricing
                            });
                        });
                        console.log("catergoriesTemp", catergoriesTemp);
                        dataToPass.name = v._id;
                        dataToPass.salonaddress = v.salonaddress;
                        dataToPass.location = v.location;
                        dataToPass.image = v.image;
                        dataToPass.opentime = v.opentime;
                        dataToPass.closetime = v.closetime;
                    });

                    //dataToPass.push.apply(catergoriesTemp);
                    console.log("DAAA", dataToPass);
                    finalArray = [].concat(dataToPass, catergoriesTemp);
                    //;tempArray.concat(catergoriesTemp);
                    console.log("FInAL ARRYA", finalArray);
                    //console.log("DATATOPASS", data[0]);
                    resolve(finalArray);
                }
            });
    });
};

commonQuery.doubleLookup = function doubleLookup(
    model,
    fromTable,
    localFieldVal,
    foreignFieldVal,
    condition,
    second_fromTable,
    second_localFieldVal,
    second_foreignFieldVal
) {
    return new Promise(function(resolve, reject) {
        model
            .aggregate([{
                    $match: condition
                },
                {
                    $lookup: {
                        from: fromTable,
                        localField: localFieldVal,
                        foreignField: foreignFieldVal,
                        as: "docs"
                    }
                },
                {
                    $lookup: {
                        from: second_fromTable,
                        localField: second_localFieldVal,
                        foreignField: second_foreignFieldVal,
                        as: "dataa"
                    }
                }
            ])
            .exec(function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};
commonQuery.getNextSequenceValue = function(sequenceName) {
    return new Promise(function(resolve, reject) {
        let query = {
            _id: sequenceName
        };
        counters
            .findOneAndUpdate(
                query, {
                    $inc: {
                        sequence_value: 1
                    }
                }, {
                    new: true
                }
            )
            .lean()
            .exec(function(err, updatedData) {
                if (err) {
                    console.log("errerrerrerrerrerr", err);
                    reject(0);
                } else {
                    console.log("updatedData", updatedData);
                    resolve(updatedData);
                }
            });
    });
};

/**
 * Function is use to Fetch all data
 * @access private
 * @return json
 * @smartData Enterprises (I) Ltd
 * 20-jun-2019e 20-jun-2019
 */
commonQuery.findData = function findData(model, cond, fetchVal) {
    return new Promise(function(resolve, reject) {
        let tempObj = {
            status: false
        };
        model.find(cond, fetchVal, function(err, userData) {
            if (err) {
                tempObj.error = err;
                reject(tempObj);
            } else {
                tempObj.status = true;
                tempObj.data = userData;
                resolve(tempObj);
            }
        });
    });
};

commonQuery.fileUpload = function fileUpload(imagePath, buffer) {
    return new Promise((resolve, reject) => {
        try {
            let tempObj = {
                status: false
            };
            fs.writeFile(imagePath, buffer, function(err) {
                if (err) {
                    tempObj.error = err;
                    reject(err);
                } else {
                    tempObj.status = true;
                    tempObj.message = "uploaded";
                    resolve(tempObj);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

commonQuery.fetch_all_paginated_price = function fetch_all_paginated_price(
    model,
    cond = {},
    pageSize,
    page
) {
    return new Promise(function(resolve, reject) {
        let pageSizes = pageSize;
        let currentPage = page;

        let postQuery = model.find(cond).populate("category_id");

        if (pageSizes && currentPage) {
            postQuery.skip(pageSizes * (currentPage - 1)).limit(pageSizes);
        }
        postQuery
            .then(result => {
                console.log(result);
                resolve(result);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

commonQuery.fetch_all_paginated = function fetch_all_paginated(
    model,
    cond,
    pageSize,
    page
) {
    return new Promise(function(resolve, reject) {
        let pageSizes = pageSize;
        let currentPage = page;
        console.log("pageSizes", cond);

        if (cond) {
            cond = cond;
        } else {
            cond = {};
        }

        let postQuery = model.find(cond);

        // model.countDocuments(cond).exec(async function(err, res) {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log("RES", res);
        //     countNumber = res;
        //     console.log("coun", countNumber);
        //   }
        // });

        if (pageSizes && currentPage) {
            postQuery.skip(pageSizes * (currentPage - 1)).limit(pageSizes);
        }
        postQuery
            .then(result => {
                console.log(result);

                console.log("DATATOPASS", result);
                resolve(result);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

commonQuery.findCount = function findCount(model, condition) {
    return new Promise(function(resolve, reject) {
        model.countDocuments(condition).exec(function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

commonQuery.multiLookup = function multiLookup(
    model,
    fromTable,
    localFieldVal,
    foreignFieldVal,
    condition,
    second_fromTable,
    second_localFieldVal,
    second_foreignFieldVal,
    third_fromTable,
    third_foreignFieldVal
) {
    return new Promise(function(resolve, reject) {
        model
            .aggregate([
                { $match: condition },

                {
                    $lookup: {
                        from: fromTable,
                        localField: localFieldVal,
                        foreignField: foreignFieldVal,
                        as: "ratings"
                    }
                },
                {
                    $lookup: {
                        from: second_fromTable,
                        localField: second_localFieldVal,
                        foreignField: second_foreignFieldVal,
                        as: "categories"
                    }
                },
                {
                    $lookup: {
                        from: third_fromTable,
                        localField: "categories._id",
                        foreignField: third_foreignFieldVal,
                        as: "services"
                    }
                },
                {
                    $group: {
                        _id: 0,

                        $addToSet: {
                            _id: $categories._id,
                            name: "$name",
                            image: "$image",
                            address: "",
                            location: "$location",
                            categories: {
                                $push: { category: "categories.catname", services: $services }
                            }
                        }
                    }
                }
            ])
            // model
            //   .aggregate([
            //     { $match:condition },

        //     {
        //       $lookup: {
        //         from: fromTable,
        //         localField: localFieldVal,
        //         foreignField: foreignFieldVal,
        //         as: "ratings"
        //       }
        //     },
        //     {
        //       $lookup: {
        //         from: second_fromTable,
        //         localField: second_localFieldVal,
        //         foreignField: second_foreignFieldVal,
        //         as: "categories"
        //       }
        //     },
        //     {
        //       $lookup: {
        //         from: third_fromTable,
        //         localField: "categories._id",
        //         foreignField: third_foreignFieldVal,
        //         as: "services"
        //       }
        //     },
        //     {
        //       $project: {
        //         _id: 0,
        //         name: "$name",
        //         image: "$image",
        //         address: "",
        //         location: "$location",
        //         categories: "$categories.catname"
        //       }
        //     }
        //   ])
        .exec(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

commonQuery.getSalonsBasedOnRatings = function getSalonsBasedOnRatings(
    model,
    fromTable,
    localFieldVal,
    foreignFieldVal,
    condition
) {
    return new Promise(function(resolve, reject) {
        model
            .aggregate([{
                    $lookup: {
                        from: fromTable,
                        localField: localFieldVal,
                        foreignField: foreignFieldVal,
                        as: "data"
                    }
                },
                {
                    $unwind: "$data"
                },
                {
                    $group: {
                        _id: "$data.salon_id",
                        avgRatings: { $avg: "$data.ratings" }
                    }
                }
            ])
            .exec(function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};

commonQuery.getSalonOnPrice = function getSalonOnPrice() {
    return new Promise(function(resolve, reject) {
        model.find(cond, fetchd).exec(function(err, userData) {
            // console.log("userData", userData);
            if (err) {
                console.log("errrrrrr", err);
                reject(err);
            } else {
                resolve(userData);
            }
        });
    });
};

commonQuery.fetch_ReviewRatings = function fetch_ReviewRatings(
    model,
    cond,
    pageSize,
    page
) {
    //console.log("inFETCHALLPAGINATED",model,cond,pageSize.page);
    return new Promise(function(resolve, reject) {
        let pageSizes = pageSize;
        let currentPage = page;
        //  console.log("pageSizes",pageSizes);
        // console.log("currentPage",currentPage);
        if (cond) {
            cond = cond;
        } else {
            cond = {};
        }

        let postQuery = model.aggregate([{
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "users"
                }
            },
            { $unwind: "$users" },
            {
                $project: {
                    ratings: "$ratings",
                    comments: "$comments",
                    firstName: "$users.firstName",
                    lastName: "$users.lastName",
                    profilepic: "$users.profilepic",
                    createdAt: "$createdAt"
                }
            }
        ]);
        //console.log(pos)

        if (pageSizes && currentPage) {
            postQuery.skip(pageSizes * (currentPage - 1)).limit(pageSizes);
        }
        postQuery
            .then(result => {
                console.log(result);
                resolve(result);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

commonQuery.addServicesInCategories = function addServicesInCategories(
    model,
    category_id,
    service_id
) {
    return new Promise(function(resolve, reject) {
        model
            .findByIdAndUpdate(
                category_id, { $push: { services: service_id } }, { safe: true, upsert: true }
            )
            .exec(function(err, userData) {
                // console.log("userData", userData);
                if (err) {
                    console.log("errrrrrr", err);
                    reject(err);
                } else {
                    resolve(userData);
                }
            });
    });
};

commonQuery.addEmployeeToSalon = function addEmployeeToSalon(
    model,
    salon_id,
    employee_id
) {
    return new Promise(function(resolve, reject) {
        model
            .findByIdAndUpdate(
                salon_id, { $push: { employees: employee_id } }, { safe: true, upsert: true }
            )
            .exec(function(err, userData) {
                console.log("userData", userData);
                if (err) {
                    console.log("errrrrrr", err);
                    reject(err);
                } else {
                    resolve(userData);
                }
            });
    });
};

commonQuery.removeServicesInCategories = function removeServicesInCategories(
    model,
    category_id,
    service_id
) {
    return new Promise(function(resolve, reject) {
        model
            .findByIdAndUpdate(
                category_id, { $pull: { services: service_id } }, { safe: true, upsert: true }
            )
            .exec(function(err, userData) {
                console.log("userData", userData);
                if (err) {
                    console.log("errrrrrr", err);
                    reject(err);
                } else {
                    resolve(userData);
                }
            });
    });
};

commonQuery.fetch_categories = function fetch_categories(
    model,
    fromTable,
    localFieldVal,
    foreignFieldVal
) {
    return new Promise(function(resolve, reject) {
        model
            .aggregate([{
                $lookup: {
                    from: fromTable,
                    localField: localFieldVal,
                    foreignField: foreignFieldVal,
                    as: "services"
                }
            }])
            .exec(function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};

commonQuery.fetch_salon_services = function fetch_salon_services(
    model,
    condition
) {
    return new Promise(function(resolve, reject) {
        model
            .aggregate([
                { $match: condition },
                {
                    $lookup: {
                        from: "salonservices",
                        localField: "_id",
                        foreignField: "salon_id",
                        as: "salonservices"
                    }
                },
                {
                    $lookup: {
                        from: "services",
                        localField: "salonservices.service_id",
                        foreignField: "_id",
                        as: "services"
                    }
                }
            ])
            .exec(function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};
commonQuery.addServiceToEmployee = function addServiceToEmployee(
    model,
    empId,
    dataToAdd
) {
    console.log("dataToAdd", dataToAdd);
    return new Promise(function(resolve, reject) {
        model
            .update({ _id: empId }, { $addToSet: { salonservices_id: dataToAdd } })
            .exec(function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};

commonQuery.removeServiceToEmp = function removeServiceToEmp(
    model,
    empId,
    dataToRemove
) {
    console.log("dataToRemove", dataToRemove);
    return new Promise(function(resolve, reject) {
        model
            .update({ _id: empId }, { $pull: { salonservices_id: dataToRemove } })
            .exec(function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};

commonQuery.fetchCategories = function fetchCategories(model, condition) {
    return new Promise(function(resolve, reject) {
        model
            .aggregate([{
                    $lookup: {
                        from: "salonservices",
                        localField: "_id",
                        foreignField: "category_id",
                        as: "servvv"
                    }
                },
                {
                    $match: condition
                },

                {
                    $group: {
                        _id: "$catname",
                        id: { $first: "$_id" },
                        services: { $first: "$servvv" }
                    }
                },
                {
                    $project: {
                        name: "$_id",
                        services: "$services",
                        _id: "$id"
                    }
                }
            ])
            .exec(function(err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
};

commonQuery.getSalonDetailsQuery = function getSalonDetailsQuery(
    model,
    condition
) {
    return new Promise(function(resolve, reject) {
        model
            .aggregate([{
                    $match: condition
                },
                {
                    $lookup: {
                        from: "reviewratings",
                        localField: "_id",
                        foreignField: "salon_id",
                        as: "ratings"
                    }
                },
                {
                    $project: {
                        name: 1,
                        salonaddress: 1,
                        location: 1,
                        opentime: 1,
                        closetime: 1,
                        image: 1,
                        contact: 1,
                        avgRatings: { $avg: "$ratings.ratings" }



                    }
                }
            ])
            .exec(function(err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
};

module.exports = commonQuery;