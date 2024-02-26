$(document).ready(function () {
  $(document).on("click", "#cv-dl", function () {
    const fileName = "jobert_simbre_cv.pdf";

    var url = "files/" + fileName;

    $.ajax({
      url: url,
      cache: false,
      xhr: function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 2) {
            if (xhr.status == 200) {
              xhr.responseType = "blob";
            } else {
              xhr.responseType = "text";
            }
          }
        };
        return xhr;
      },
      success: function (data) {
        //Convert the Byte Data to BLOB object.
        var blob = new Blob([data], { type: "application/octetstream" });

        //Check the Browser type and download the File.
        var isIE = false || !!document.documentMode;
        if (isIE) {
          window.navigator.msSaveBlob(blob, fileName);
        } else {
          var url = window.URL || window.webkitURL;
          link = url.createObjectURL(blob);
          var a = $("<a />");
          a.attr("download", fileName);
          a.attr("href", link);
          $("body").append(a);
          a[0].click();
          $("body").remove(a);
        }
      },
    });

    // $.ajax({
    //   url: "jobert_simbre_cv.pdf", // Replace with your PDF filename
    //   type: "GET",
    //   success: function (response) {
    //     // Once the request is successful, create a link element and trigger the click event to download the PDF
    //     var link = document.createElement("a");
    //     link.href = window.URL.createObjectURL(new Blob([response]));
    //     link.download = "jobert_simbre_cv.pdf"; // Replace with the desired name for the downloaded PDF file
    //     link.click();
    //   },
    //   error: function (xhr) {
    //     // Handle any errors that occur during the AJAX request
    //     console.error("Error occurred: " + xhr.statusText);
    //   },
    // });
  });

});
