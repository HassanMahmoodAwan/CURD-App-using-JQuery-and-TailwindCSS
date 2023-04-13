// =====SCRIPT USING JQuery=====

$(function(){
    darkMode();
    getRequest();
    AjaxGetRequest();
    handleDelete();
    $("#postBtn").click(handlePost);
    // For Update request
    $("#tBody").on("click", ".updateHandler", handleUpdate);
   
    $("#updateBtn").click(function () {
      var id = $("#idInput").val();
     var title = $("#titleInput").val();
      var body = $("#bodyInput").val();
      $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/" + id,
        data:{
          title, body
        },
        method: "PUT",
        success: (response) => {

          console.log("update successful", response);
          AjaxGetRequest();
        },
      });
    });
});


function handleUpdate(){
  let editBtn = $(this);
  let parent = editBtn.closest(".oneRecipe");
  let upid = parent.attr("data-btn");
  console.log(upid);
  $.get("https://usman-fake-api.herokuapp.com/api/recipes/"+upid,
  function(response){
    $("#idInput").val(response._id);
    $("#titleInput").val(response.title);
    $("#bodyInput").val(response.body);
  });

  

console.log("update Successfully")
};


// Dark Mode 
function darkMode(){
    $("#btn").on('click', function(){
        $('#bodyMode').toggleClass('dark');
        if($("#bodyMode").hasClass('dark')){
        $("#icon").attr("class", "bx bxs-sun")}
        else{
            $("#icon").attr("class", "bx bxs-moon");
        }
    });};



// =====Simple Get request ======
function getRequest(){
    $('#btnGet').on('click', ()=>{
        console.log("AJax request send for txt");
        $.get(
          "https://usman-fake-api.herokuapp.com/api/recipes/6427d670cecf130014ec6df5",
           handleGet
        );
        console.log("AJax request completed");
    });
};

function handleGet(response){
    console.log(response);
    for(let j = 0; j < response.length; j++){
    $('#txt').append(response[j].title);}

};


// Ajax is a genralize form of all methods

function AjaxGetRequest(){
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/recipes/",
      method: "GET",
      success: getFromApi,
    });
};

function handleDelete(){
  $("#tBody").on("click", ".deleteBtn", handledel);
};

function handledel(){
    var btn = $(this);
    var parentDiv = btn.closest(".oneRecipe");
    var id = parentDiv.attr("data-btn");
    console.log(id);
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/recipes/"+id,
      method: "DELETE",
      success: function () {
        AjaxGetRequest();
        },
      error: function(response){
        console.log(response);
      }  

    });
    
    console.log("deleted successfully");
};

function handlePost(){
  var title = $("#titleInput").val();
  var body = $("#bodyInput").val();
  console.log(title, body);

  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/recipes/",
    method: "POST",
    data: {
      title:title, 
      body:body
    },
    success:function(){
      AjaxGetRequest();
      console.log("post request successfull");
    },
    error:(e)=>{
      console.log(`An error occured: ${e}`);
    }
  });
};



function getFromApi(response){
    console.log(response);
    $("#tBody").empty();
    for(let i = 0; i < response.length; i++ ){
      var res = response[i];
    $("#tBody")
      .append(`<tr  class=" border-b dark:bg-gray-900 dark:border-gray-700 oneRecipe"
               data-btn = ${res._id}>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">${response[i].title}</td>
              <td class="px-6 py-4">${response[i].body}</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">
                
              <div class="flex items-center justify-center">
              <a
                  href = "#postForm"
                  class="font-medium  hover:underline mr-1 bg-blue-600  text-white rounded-[3px] p-1 updateHandler">Edit</a>
                  <input type="button" value="delete"
                class="rounded-[5px] p-1 border-2 border-red-800 text-gray-800 hover:text-white hover:bg-red-800 dark:text-white cursor-pointer deleteBtn">
              </div>  
              </td>
            </tr>`);}
};