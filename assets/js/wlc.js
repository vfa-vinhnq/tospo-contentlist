window.onload = function () {
	onReady()
}
function onReady() {
	setTimeout(function () {
		$('body').removeClass('notReady')
		$('body').addClass('ready')
		if (page == 'top') {
			$("meta[name ='theme-color']").attr('content', '#e51600')
		}
		$('.inviewTarget').on('inview', function (event, isInView) {
			if (isInView) {
				var t = this
				setTimeout(function () {
					$(t).removeClass('inview')
				}, 200)
			}
		})
	}, 1000)

	$('a[href^="#"]').click(function () {
		var href = $(this).attr('href')
		var target = $(href == '#' || href == '' ? 'html' : href)
		var position = target.offset().top
		var speed = 500
		$('html, body').animate(
			{
				scrollTop: position,
			},
			speed,
			'swing'
		)
		return false
	})
}
function openPP() {
	$('#pp').css('display', 'block')
}
function closePP() {
	$('#pp').css('display', 'none')
}

