let db = new Dexie("PanelKiosk");
db.version(1).stores({
    tracking: "++id, page, timestamp, status, notes"
});

console.log(`Dexie database ready`);
console.log(`DB: `, db);

async function getData() {
  const rows = await db.tracking.toArray();
  console.log("getData");
  console.log(rows);
  var html = "<table>";
  html += "<tr>";
  for (var j in rows[0]) {
    html += "<th>" + j + "</th>";
  }
  html += "</tr>";
  for (var i = 0; i < rows.length; i++) {
    html += "<tr>";
    for (var j in rows[i]) {
      html += "<td>" + rows[i][j] + "</td>";
    }
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("container").innerHTML = html;
}
getData();

function convertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = this.convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + ".csv" || "export.csv";

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

async function download() {
  let headers = {
    page: "Page",
    timestamp: "Timestamp",
    status: "Status",
    notes: "Notes",
    id: "id",
  };

  let itemsNotFormatted = await db.tracking.toArray();

  var itemsFormatted = [];

  // format the data
  itemsNotFormatted.forEach((item) => {
    itemsFormatted.push({
      id: item.id,
      page: item.page,
      timestamp: item.timestamp,
      status: item.status,
      notes: item.notes,
    });
  });

  var fileTitle = "Panel-Kiosk-Tracking"; // or 'my-unique-title'

  exportCSVFile(headers, itemsNotFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
}
