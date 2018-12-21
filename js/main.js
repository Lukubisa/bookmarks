document.addEventListener("submit", saveUrl);

function saveUrl(e){

var siteName= document.querySelector('#siteName').value;
var siteUrl = document.querySelector('#siteUrl').value;
  if(!formValidation(siteName, siteUrl)){
    return false;
  }
 var bookmark ={
   name: siteName,
   url: siteUrl
 }

//local Storage
if(localStorage.getItem('bookmarks')===null){
  var bookmarks=[];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

}else{
  //get bookmark frm local storage

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
document.getElementById('myForm').requestFullscreen;
 getBookmarks();
 e.preventDefault();
}
//activate delete button
function deleteBookmark(url){
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  for(var i=0; i<bookmarks.length; i++){
    if(bookmarks[i].url ===url){
     bookmarks.splice(i,1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  getBookmarks();
   
}
//getting the bookmarks
 function getBookmarks(){
   var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
   
  var bookResults=document.querySelector('#results');
  bookResults.innerHTML='';

  for(var i= 0; i<bookmarks.length; i++){
     var name =bookmarks[i].name;
     var url = bookmarks[i].url;
     bookResults.innerHTML+= '<div class="well">' +
                              '<h3>'+name +
                              '<a class="btn btn-outline-success" target="_blank" href="'+ url +'">Visit</a>'+
                              '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-outline-danger"  href="#">Delete</a>'
                              '</h3>'+
                              '</div>';
  }
 }

 function formValidation(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Fill in all the boxes');
    return false;
  }
  
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteUrl.match(regex)){
    alert("Type in a  valid url");
    return  false;
  }
  return true;
 }
