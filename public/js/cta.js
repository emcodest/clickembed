var emid = document.getElementById("_cta1__")
var cln = emid.cloneNode(true);
cln.id = "___cta1"

var second = document.getElementById("_cta1__")
second.remove()

document.body.appendChild(cln)
var __close = document.getElementById("_cta1__btn")
__close.addEventListener("click", function () {
    cln.remove()
})

$(document).ready(function () {

    // ONLY ON EDITING INTERFACE
    $("#___cta1").css({
        height: "210px",
        "overflow-y": "scroll"
    })
    $("#____fake-trigger").trigger("click").remove()


    var ___cust_config = ['calltoactionbox', 'call-to-action-btn', 'content-box-panel', 'image-panel']
    __________configurations_cta = [{
            name: "ImagePanel",
            "css": [{
                "display": "none"
            }]
        }, {
            name: "ContentBox",
            "css": [{
                "border": "1px solid #333"
            }, {
                "background": "#fff"
            }, {
                "color": "#333"
            }]
        }, {
            name: "CallToActionBtn",
            "button_link": "http://google.com",
            "button_text": "Buy Now!",
            "css": [{
                "background": "black"
            }, {
                "color": "#fff"
            }]
        }, {
            name: "CallToActionBox",
            "css": [{
                    "background": "black"
                }, {
                    "color": "#fff"
                },
                {
                    "position": "#fff"
                }

            ]
        },
        {
            name: "CloseButton",
            "css": [{
                    "background": "black"
                }, {
                    "color": "#fff"
                },
                {
                    "position": "left"
                }

            ]
        }

    ]
    var _em___root = $("#___cta1")

    // _em___root.css("border", "3px solid orange")
    // _em___root.css("background", "blue")
    // _em___root.css("color", "#fff")

    $("#configure____configure_btn").click(function () {
        $(".cta-body-configure").toggle()

        if (!$(".cta-body-configure").is(":visible")) {



            $("#configure____").css("max-height", "40px")
            $("#configure____").css("max-width", "45px")
            $("#configure____").css("overflow-y", "hidden")

        } else {

            $("#configure____").css("max-height", "400px")
            $("#configure____").css("max-width", "483px")
            $("#configure____").css("overflow-y", "scroll")
            $("#configure____").css("overflow-x", "hidden")

        }
    })

    function hide_cust_cta(activate) {
        for (var ii in ___cust_config) {
            $("[class_='" + ___cust_config[ii] + "']").hide()
        }
        // alert(activate)
        $("[class_='" + activate + "']").show()
    }

    function cta_hide() {

        $(".cta-body-configure").hide()
        $("#configure____").css("max-height", "40px")
        $("#configure____").css("max-width", "45px")
        $("#configure____").css("overflow-y", "hidden")
    }


    function cta_show() {
        $(".cta-body-configure").show()
        $("#configure____").css("max-height", "400px")
        $("#configure____").css("max-width", "483px")
        $("#configure____").css("overflow-y", "scroll")
        $("#configure____").css("overflow-x", "hidden")
    }
    cta_hide()


    //========================================================== SIDE 1
    $("._____ctaside1").hover(function (e) {
        $(this).css("border", "2px dashed green")
        //$(this).css("cursor", "pointer")
        _em___root.css("border", "none")
        $("#______cta_display_").text("Image Box")
        hide_cust_cta("image-panel")
        setTimeout(function () {

            cta_show()

        }, 1000);

        // $("#configure____").appendText.css({
        //     position: 'absolute',
        //     top: e.clientY + 'px',
        //     left: e.clientX + 'px'
        // });
        // e.target.append(appendText);

    }, function () {
        $(this).css("border", "none")
        //cta_hide()

    })
    //============================================================ SIDE 2
    $("._____ctaside2").hover(function () {
        $("#______cta_display_").text("Content Box")
        $(this).css("border", "2px dashed green")
        hide_cust_cta("content-box-panel")
        _em___root.css("border", "none")
        setTimeout(function () {

            cta_show()
        }, 1000);



    }, function () {

        $(this).css("border", "none")
        //cta_hide()


    })
    //==============================================================CALL TO ACTION
    $("._____ctaside2 .cta-btn").hover(function () {
        $("#______cta_display_").text("Call To Action")
        $(this).css("border", "2px dashed green")
        $("._____ctaside2").css("border", "none")
        hide_cust_cta("call-to-action-btn")
        //cta_show()


    }, function () {

        $(this).css("border", "none")
        //cta_hide()

    })
    //============================================================== ROOT
    _em___root.hover(function () {
        $(this).css("border", "2px dashed green")

        $("#______cta_display_").text("Canvas Box")
        hide_cust_cta("calltoactionbox")
    }, function () {
        $(this).css("border", "none")

    })
    //===============================================================SAVE CHANGES
    $("#_____savechanges_cta").click(function () {
       // var content_image = editor_img.container.innerHTML
        //var content_ = editor.container.innerHTML
       // var content_ = editor.container.innerHTML

        var content_f = $("#_____cta_____1editor").find(".ql-editor").html()

        var content_fimg = $("#_____cta_____1editor_img").find(".ql-editor").html()
        
        //alert(content_f)
        //: CONSTRUCT SAVER -- START INDEX - 0 END INDEX 18-("canvas_close_btn_text") if image - save, if content save
        var saver = {}
        var mysaver = Object.keys(___cta_obj)
        for(var iii in mysaver){
            
            if(iii <= 18){

                saver[mysaver[iii]] = ___cta_obj[mysaver[iii]]()
                if(mysaver[iii] == "image"){
                   saver[mysaver[iii]] = content_fimg
                }
                if(mysaver[iii] == "content"){
                    saver[mysaver[iii]] = content_f
                 }
            }
        }
        
        console.log(saver)
         //-----------------------------
        //  editor.setText('')
        //  setTimeout(() => {
        //      console.log(saver.content+"\n")
        //      editor.clipboard.dangerouslyPasteHTML(0, saver.content+"\n")
        //  }, 2000);
         //-----------------------------
         //editor_img.setText('')
         //$("#_____cta_____1editor_img").find(".ql-editor").html("")
        //  setTimeout(() => {
        //      console.log(saver.image+"\n")
        //      editor_img.clipboard.dangerouslyPasteHTML(0, saver.image+"\n")
        //  }, 2000);
         //-----------------------------
        // editor.clipboard.dangerouslyPasteHTML(0, "<p>Bad Guy <b>hello</b></p>\n")

    })

    // =========================================EVENTS
    $(document).on("change", ".____ChangeImgBox", function () {
        var apply_width = $(this).val()

        ___cta_obj.ApplyImageWidth(apply_width)
    })


    // =========== BUTTON TEXT CTA
    // $(document).on("keypress", ".____CTAbtnText", function () {
    //     var apply_text = $(this).val()

    //     ___cta_obj.ApplyButtonText(apply_text)
    // })
    // $(document).on("keyup", ".____CTAbtnLink", function () {
        
    //         var apply_text = $(this).val()

    //     ___cta_obj.ApplyButtonLink(apply_text)
        
        
    // })



})