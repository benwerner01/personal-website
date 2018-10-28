var btn = document.getElementById("btn");
var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)

var div1 = document.createElement("DIV")
div1.setAttribute("id", "mc_embed_signup")

var form = document.createElement("FORM")
form.setAttribute("action", "https://afinehour.us19.list-manage.com/subscribe/post?u=f28970ba51a3a8d751bd82f6b&amp;id=d427d21bc1")
form.setAttribute("method", "post")
form.setAttribute("id", "mc-embedded-subscribe-form")
form.setAttribute("name", "mc-embedded-subscribe-form")
form.setAttribute("class", "validate" )
form.setAttribute("target", "_blank")
form.setAttribute("novalidate", "")

var input = document.createElement("INPUT")
input.setAttribute("type", "email")
input.setAttribute("value", "")
input.setAttribute("name", "EMAIL")
input.setAttribute("placeholder", "me@example.com")
input.setAttribute("class", "email mce-EMAIL")
input.setAttribute("id", "emailid")

var div2 = document.createElement("DIV")
div2.setAttribute("style", "position: absolute; left: -5000px;")
div2.setAttribute("aria-hidden", "true")

var input2 = document.createElement("input")
input2.setAttribute("type", "text")
input2.setAttribute("name", "b_f28970ba51a3a8d751bd82f6b_d427d21bc1")
input2.setAttribute("tabindex", "-1")
input2.setAttribute("value", "")


var submit = document.createElement("INPUT")
submit.setAttribute("type", "submit")
submit.setAttribute("name", "subscribe")
submit.setAttribute("id", "mc-embedded-subscribe")
submit.setAttribute("class", "submit")
submit.setAttribute("id", "submitid")
submit.setAttribute("value", "Submit")

if (touchsupport){ // browser supports touch
    btn.classList.add("touch") // add class touch to <button>
    submit.classList.add("touch")
}

var x = 0

btn.addEventListener("click", function button_clicked() {
	if (x<1) {
		console.log("button clicked")
		btn.removeChild(btn.firstChild)
		btn.removeChild(btn.firstChild)
		btn.classList.add("input")

		btn.appendChild(div1)
		div1.appendChild(form)
		// form.appendChild(div2)
		form.appendChild(submit)
		// div2.appendChild(input2)
		setTimeout(function(){form.insertBefore(input, form.childNodes[0]); input.focus();}, 200);

		x+=1
	}
})


