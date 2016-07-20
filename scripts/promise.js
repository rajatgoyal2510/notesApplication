$('.load').on('click', function(e){
	var button = $(this);
	button.addClass('loading');
	var data, container = $('.container');
	$.posts('http://jsonplaceholder.typicode.com/posts/', {title: formdata.title})
		.success(function(posts){

			data = posts;

			for (var i = 0; i < posts.length; i++) {
				container.append('<div>' + posts[i].title + '</div>');
			}

		})
		.error(function(err){
			$('#title').text(err.message);
			$('#modal').show();
		})
		.always(function(){
			button.removeClass('loading');
		});
})
