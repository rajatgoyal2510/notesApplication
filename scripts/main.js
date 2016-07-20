var notes = [],
	$addNote = $('#add-note'),
	addNoteForm = $addNote.find('form'),
	$notes = $('.notes'),
	notesContainer = $notes.find('.container'),
	note_title = addNoteForm.find('input[name="note_title"]'),
	note_content = addNoteForm.find('textarea[name="note_content"]');
	removeNoteByID = $('.removeNote');


function appendSingleNote(data, id) {
	var content = data.content, title = data.title;

	var html = '<div class="note">' +
					'<button class="removeNote" id="' + (id ? id : 0 ) + '">X</button>' +
                    '<p class="note-title">' + title + '</p>' +
                    '<p class="note-content">' + 
                        content +
                    '</p>' +
                '</div>';

    notesContainer.append(html);
}

//{title: 'adasd', content: 'asda'}
function storeNote(data) {

	notes.push(data);
	window.localStorage.setItem('notes', JSON.stringify(notes));

	appendSingleNote(data, notes.length - 1);
}


function init() {
	if(!!window.localStorage.getItem('notes')) {
		notes = JSON.parse(window.localStorage.getItem('notes'));
	} else {
		notes = [];
	}

	var i;
	for (i = 0; i < notes.length; i++) {
		appendSingleNote(notes[i], i);
	}
}


function removeNote(id) {
	notes.splice(id, 1);
	window.localStorage.setItem('notes', JSON.stringify(notes));
	notesContainer.html('');
	init();
}

addNoteForm.on('submit', function(e){
    e.preventDefault();
	
	var data = {title: note_content.val(), content: note_title.val()};

	storeNote(data);

});

$(document).on('click', '.removeNote', function(e) {
	e.preventDefault();
	removeNote(this.id);
});

init();





