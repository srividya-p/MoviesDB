function confirmation(event) {
    event.preventDefault();
    if (event.currentTarget) {
        var urlToRedirect = event.currentTarget.getAttribute('href');
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#7a6fbe",
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger m-l-10',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            window.location.href = urlToRedirect
        }).catch(swal.noop)
    }
}