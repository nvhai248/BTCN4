$('#addCart').click(function (e) {
    e.preventDefault();
    var proID = $("input[name='proSelect']:checked").val();
    $.ajax({
        type: "POST",
        url: "/add/OrderDetails",
        data: proID,
        dataType: "JSON",
        success: function (response) {
            console.log("Success");
        }
    });
});