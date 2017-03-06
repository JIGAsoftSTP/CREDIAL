if(window.parent.location.pathname.indexOf('Reports') === -1 && window.parent.location.pathname.indexOf('Admin') === -1){
	 location.replace("abc.html");
}
if(sessionStorage.getItem('readTime') != "done"){
	sessionStorage.setItem('readTime','done');
	location.reload(true);
} else{
	sessionStorage.setItem('readTime','undone');
}
