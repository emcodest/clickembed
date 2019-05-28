var model = require('../models/index')

module.exports = {


    bindRawQuery: (query, bind) => {
        // query: select * from users where status = $status, bind = {status: 'active'}
        return new Promise((resolve, reject) => {

            model.sequelize.query(query, {
                bind: bind
            }).spread((results, metadata) => {


                resolve(results)
            })

        })

    },
    genInsert: function (data, table_name) {
        return new Promise((resolve, reject) => {

            model[table_name].create(data).then(function (newData, created) {

                if (!newData) {

                    resolve(null)

                }

                if (newData) {

                    resolve(newData)

                }

            })
        })



    },
    genUpdate: function (data, table_name, cols) {

        return new Promise((resolve, reject) => {
            model[table_name].update(data, {where: cols})
                .then(res => {
                    
                    if (res) {
    
                        resolve(res)
                    }
                }).catch(err => {
                   reject(err)
                })     
                
            })

    },

    genDelete: function (table_name, cols) {

        return new Promise((resolve, reject) => {

            model[table_name].destroy({where: cols})
            .then(res => {
                
                if (res) {

                    resolve(res)
                }else{
                    reject("Unable to delete record")
                }
            }).catch(err => {
               reject(err)
            })     
            
        })

    },
    Error: (res, m, data = null) => {

        res.json({
            error: true,
            message: m,
            data: data
        })


    },
    Success: (res, m, data = null) => {

        res.json({
            success: true,
            message: m,
            data: data
        })
    },
    isAnEmail: (email) => {

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());

    },
    runCron: function () {
        console.log("Cron started")
        const rcron = "*/1 * * * *" //'* * * * * *'
        var CronJob = require('cron').CronJob
        new CronJob(rcron, function () {


            //
            //! - - - - - - - - - -- - - - - - -CRON TASKS
            // module.exports.deleteUsedExpiredToken()
            // module.exports.deactivateExpiredToken()
            console.log('Cron task every mins')
            //! - - - - - - - - - -- - - - - - -END


        }, null, true, 'Africa/Lagos')
    },
    luxon: () => {
        const {
            DateTime
        } = require("luxon");
        //https://moment.github.io/luxon/docs/manual/install.html
        //https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
        var myDate = DateTime.local();
        return myDate
    },
    dateTime: () => {
        var lux = module.exports.luxon()

        return lux.toFormat('yyyy-MM-dd HH:mm:ss')


    },
    myDateFormat: (hour) => {

        var lux = module.exports.luxon()

        var obj = lux.plus({
            hours: hour
        }) // add hour
        //return obj.toFormat('ff')
        return obj.toFormat('t') + ", " + obj.toFormat('DD') // 3:50 PM, Mar 18, 2019
    },
    addTime: (hour) => {
        var lux = module.exports.luxon()
        var obj = lux.plus({
            hours: hour
        }) // add hour
        return obj.toFormat('yyyy-MM-dd HH:mm:ss')
    },
    fileExists: function (path) {
        var fs = require("fs")
        if (fs.existsSync(path)) {
            return true
        } else {
            return false
        }

    },
    copy: function (old_path, new_path) {
        var fs = require("fs")
        if (fs.existsSync(old_path)) {
            fs.createReadStream(old_path).pipe(fs.createWriteStream(new_path))
        }

    },
    createFile: function (file_name, content) {
        var fs = require("fs")
        fs.writeFile(file_name, content, function (err) {
            if (err) throw err
            return true
        })

    },
    GetDomain: (url) => {
        var parse = require('url-parse')
        var url = parse(url, true)
        return url.hostname
    },
    ip: (req) => {

        return  req.header('x-forwarded-for') || req.connection.remoteAddress
    },
    Download: async (url) => {
        return new Promise((resolve, reject) => {
            var request = require("request");
    
            request({
                    uri: url
                },
                function (error, response, body) {
        
                    resolve(body);
                }
            );
        
         })
       
    },
    rand: (min, max) => {

        return Math.floor((Math.random() * max) + min);
    },
    charRange: () => {
        // return "ab"
        return "1234abcd56789efghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0"
    },
    randomChar: (len) => {
        var frand = ""
        var indexs = []
        var len = len;
        var chars = module.exports.charRange()
        var sp = chars.split("")
        for (var i = 0; i < len; i++) {
            var myrand = module.exports.rand(0, chars.length)
            indexs.push(myrand)
        }
        for (s of indexs) {

            frand += sp[s]
        }
        return frand;
    },
    ShortID: async (_len) => {

        var digit = module.exports.StarterDigit() 
        var chars = module.exports.charRange()
       var len  = chars.length // available chars
        var total_link = await module.exports.bindRawQuery("select id from user_links where status = 'active'", {})        
        var total_possible = 0
        var  _digit = digit // start digit
        for(var i = _digit; i < _len + 1; i++){
            total_possible = total_possible + Math.pow(len, i)
        }   
       
        if(total_link.length >= total_possible){

            // exhausted
            _len = _len + 1
           
           
        }

        
        
        var gen_char = module.exports.randomChar(_len)
        var is_avail = await module.exports.bindRawQuery("select id from user_links where short_link = $gen_char and status = 'active'", {gen_char: gen_char})
        
        if(is_avail.length < 1){

            return gen_char

        }else{

            return await module.exports.ShortID(_len)
        }
    },
    StarterDigit: () => {
        const start  = 2 // 2 chars
        return start
    }



}