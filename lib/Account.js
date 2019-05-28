const handler = require("./Handler")
const  hl = handler
_this = module.exports

_this.LoginUser = async (req, res) => {
    var {email, password} = req.body
    var reseller_id = -1
    if(! email){
        handler.Error(res, "Empty email address")
        return
    }
    var is_email = hl.isAnEmail(email)
    if(! is_email){
        handler.Error(res, "Invalid email address")
        return
    }
    if(! password){
        handler.Error(res, "Invalid password")
        return
    }
    // login the user to db
    var is_user =  await hl.bindRawQuery("select * from users where email = $email and password = $password", {email: email, password: password})
    if(is_user.length > 0){
        //: set session and 
        handler.Success(res, "Login Successful")

    }else{
        handler.Error(res, "Invalid email or password")
        return
    }
   


}
_this.LoginReseller = async (req, res) => {
    var {email, password} = req.body
    var reseller_id = -1
    if(! email){
        handler.Error(res, "Empty email address")
        return
    }
    var is_email = hl.isAnEmail(email)
    if(! is_email){
        handler.Error(res, "Invalid email address")
        return
    }
    if(! password){
        handler.Error(res, "Invalid password")
        return
    }
    // login the user to db
    var is_user =  await hl.bindRawQuery("select * from users where email = $email and password = $password", {email: email, password: password})
    if(is_user.length > 0){
        //: set session and 
        handler.Success(res, "Login Successful")

    }else{
        handler.Error(res, "Invalid email or password")
        return
    }
   


}
_this.ForgotPassword = async (req, res) => {
    var {email} = req.body
    if(! email){
        handler.Error(res, "Empty email address")
        return
    }
    var is_email = hl.isAnEmail(email)
    if(! is_email){
        handler.Error(res, "Invalid email address")
        return
    }
    // check if the email exist
    var is_user =  await hl.bindRawQuery("select * from users where email = $email", {email: email})
    if(is_user.length > 0){
        //: send the password to the email address
        handler.Success(res, "Your password have been sent to your email")

    }else{
        handler.Error(res, "Unable to find record")
        return
    }
   


}
_this.RegisterUser = async (req, res) => {
    var {fname, email, password} = req.body
    var reseller_id = -1
    if(! fname){
        handler.Error(res, "Fullname is empty")
        return
    }
    if(! email){
        handler.Error(res, "Empty email address")
        return
    }
    var is_email = hl.isAnEmail(email)
    if(! is_email){
        handler.Error(res, "Invalid email address")
        return
    }
    if(! password){
        handler.Error(res, "Password is empty")
        return
    }
    // check if email exist
    var is_user =  await hl.bindRawQuery("select id from users where email = $email ", {email: email})
    if(is_user.length > 0){
        handler.Error(res, "Email already exist")
        return
        //: set session and 
        //handler.Success(res, "Login Successful")

    }else{
        var mdata = {user_type: "user", fname, email: email, password, reseller_host_id: reseller_id}
        var is_user = await hl.genInsert(mdata, "users")
        if(is_user){

            handler.Success(res, "Account created")
        }else{
            handler.Error(res, "Try again")
        }
 
    }
   


}
_this.RegisterReseller = async (req, res) => {
    console.log("###", req.body)
    var {sub_domain, fname, email, password, reseller_host_id} = req.body
    var subdomain = sub_domain+"."+hl.GetRootDomain()
    var reseller_id = -1
    if(! sub_domain){
        handler.Error(res, "Subdomain is empty")
        return
    }
    var is_sub =  await hl.bindRawQuery("select id from domains where subdomain = $subdomain ", {subdomain: subdomain})
    if(is_sub.length > 0){
        handler.Error(res, "Subdomain already exist")
        return   
    }

    if(! fname){
        handler.Error(res, "Fullname is empty")
        return
    }
    if(! email){
        handler.Error(res, "Empty email address")
        return
    }
    var is_email = hl.isAnEmail(email)
    if(! is_email){
        handler.Error(res, "Invalid email address")
        return
    }
    if(! password){
        handler.Error(res, "Password is empty")
        return
    }
    // check if email exist
    var is_user =  await hl.bindRawQuery("select id from users where email = $email ", {email: email})
    if(is_user.length > 0){
        handler.Error(res, "Email already exist")
        return
        //: set session and 
        //handler.Success(res, "Login Successful")

    }else{
        var mdata = {user_type: "reseller", fname, email: email, password, reseller_host_id: reseller_host_id}
        var is_user = await hl.genInsert(mdata, "users")
        if(is_user){

            //: SETUP THE DOMAIN OF RESELLER
            await hl.genInsert({reseller_id: is_user.id, reseller_host: reseller_host_id, subdomain: subdomain, status: "active", date: hl.dateTime()}, "domains")

            handler.Success(res, "Account created")

        }else{
            handler.Error(res, "Try again")
        }
 
    }
   


}


_this.ChangePassword = async () => {




}
_this.UpdateProfile = async () => {




}