var Layout = {
        theme_color: "red", // blue, orange, green, purple, seagreen, custom
        header: {

            logo: "url",
            logo_href: "",
            log_image: false,
            is_search_bar: true,
            action_buttons: [{
                name: "Dashboard",
                icon: "fa fa-home",
                url: ""
            }],
            is_notification: true,
            profile_img: {
                type: "icon"
            },
            profile_elems: [{
                name: "profile",
                url: "",
                icon: "fa fa-user"
            }]
        },
        sidebar: {

            menus: [
                {
                is_active: "active",
                icon: "fa fa-home",
                url: "#",
                name: "Dashboard",
                sub_nav: true,
                sub: [{
                    icon: "fa fa-home",
                    name: "Dashboard",
                    url: ""
                }]

            },
        
            {

                is_active: "",
                icon: "fa fa-home",
                url: "#",
                name: "Dashboard",
                sub_nav: true,
                sub: [{
                    icon: "fa fa-home",
                    name: "Dashboard",
                    url: ""
                }]

            }
        
        
        ]




        },


        footer: {



            menus: {
                name: "&copy 2019 All Right Reserved",
                developed: 'Developed by <a href="https://emcodeweb.com">EmcodeWeb</a>'
            }



        }


    }
    module.exports = Layout
