const uri = "api/alerts";
let alerts = null;
function getCount(data) {
    const el = $("#counter");
    let name = "alert";
    if (data) {
        if (data > 1) {
            name = "alerts";
        }
        el.text(data + " " + name);
    } else {
        el.text("No " + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#alerts");

            $(tBody).empty();

            getCount(data.length);

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.system))
                    .append($("<td></td>").text(item.group))
                    .append($("<td></td>").text(item.sourceid))
                    .append($("<td></td>").text(item.level))
                    .append($("<td></td>").text(item.message))
                    .append($("<td></td>").text(item.detail))
                    .append($("<td></td>").text(item.timestamp));
                if (item.location !== null) {

                    tr.append($("<td></td>").text(item.location.wkid))
                        .append($("<td></td>").text(item.location.x))
                        .append($("<td></td>").text(item.location.y));
                } else {
                    tr.append($("<td></td>").text(""))
                        .append($("<td></td>").text(""))
                        .append($("<td></td>").text(""));
                }

                    tr.append(
                        $("<td></td>").append(
                            $("<button>Edit</button>").on("click", function () {
                                editItem(item.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Delete</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });

            todos = data;
        }
    });
}

function addItem() {
    const _location = {
        wkid: $("#add-location-wkid").val(),
        x: $("#add-location-x").val(),
        y: $("#add-location-y").val()
    };
    const item = {
        system: $("#add-system").val(),
        group: $("#add-group").val(),
        sourceid: $("#add-sourceid").val(),
        level: $("#add-level").val(),
        message: $("#add-message").val(),
        detail: $("#add-detail").val(),
        timestamp: $("#add-timestamp").val(),
        location: _location
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            getData();
            $("#add-sourceid").val("");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(alerts, function (key, item) {
        if (item.id === id) {
            $("#edit-id").val(item.id);
            $("#edit-system").val(item.system);
            $("#edit-group").val(item.group);
            $("#edit-sourceid").val(item.sourceid);
            $("#edit-level").val(item.level);
            $("#edit-message").val(item.message);
            $("#edit-detail").val(item.detail);
            $("#edit-timestamp").val(item.timestamp);
            $("#edit-location-wkid").val(item.location.wkid);
            $("#edit-location-x").val(item.location.x);
            $("#edit-location-y").val(item.location.y);
            
        }
    });
    $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const _location = {
        wkid: $("#edit-location-wkid").val(),
        x: $("#edit-location-x").val(),
        y: $("#edit-location-y").val()
    };
    const item = {
        system: $("#edit-system").val(),
        group: $("#edit-group").val(),
        sourceid: $("#edit-sourceid").val(),
        level: $("#edit-level").val(),
        message: $("#edit-message").val(),
        detail: $("#edit-detail").val(),
        timestamp: $("#edit-timestamp").val(),
        location: _location
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ display: "none" });
}