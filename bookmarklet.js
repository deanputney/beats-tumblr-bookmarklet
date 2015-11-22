function getPostInfo() {
	var album = null;
	var site = getSite();
	switch(site) {
		case 'bandcamp':
			album = getBandcampInfo();
			break;
		default:
			album = {};
			break;
	}

	return album;
}

function getSite() {
	if (window.location.href.indexOf('bandcamp') > -1 || 'bandcamp' === $('meta[property="twitter:site"]').attr('content')) {
		return 'bandcamp';
	} 

	return 'unknown';
}

function getBandcampInfo() {
	var album = {};
	album.title = $('#name-section .trackTitle').text().replace(/^[\t\n ]+/, '').replace(/[\t\n ]+$/, '');
	album.artist = $('#name-section h3 span a').text();
	album.artistLink = $('#name-section h3 span a').attr('href');
	album.price = $('li.buyItem h4 .base-text-color').first().text().replace(' ', '') + 
		' ' + $('li.buyItem h4 .buyItemExtra.secondaryText').first().text().replace(' ', '');
	album.payWhatYouWant = false;
	album.tags = [];
	if (album.price.replace(/[\t\n ]/g, '').indexOf('nameyourprice') > -1) {
		album.price = 0;
		album.payWhatYouWant = true;
		album.tags.push('no minimum');
	}
	var tags = $('.tralbum-tags a')
	for (var i = 0; i < tags.length; i++) {
		tag = $(tags[i]).text();
		album.tags.push(tag);
	}
	album.tagString = album.tags.join(',');

	return album;
}

album = getPostInfo();

var tumblrPostURI = 'https://www.tumblr.com/widgets/share/tool?url=' + encodeURIComponent(window.location.href) +
	'&title=' + encodeURIComponent(album.title + ' by ' + album.artist) + 
	'&caption=' + encodeURIComponent(' ') +
	'&tags=' + encodeURIComponent(album.title + ',' + album.artist + ',' + album.tagString);

console.log(tumblrPostURI);

window.open(tumblrPostURI,'1448156228497','width=700,height=500,toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=1,left=0,top=0');


