$("#table-client").on("dblclick", "tr",  function (object) {
    console.log($(this).attr("data"));
});