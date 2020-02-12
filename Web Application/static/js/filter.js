function search() {
    let searchInput = document.getElementById("searchInput").value.toUpperCase();
    let table_row = document.querySelectorAll("tr");

    for (var rows = 1; rows < table_row.length; rows++) {
    table_row[rows].style.display = "none";
    let td = table_row[rows].querySelectorAll("td");
        for (var cols = 0; cols < td.length; cols++) {
            var value = table_row[rows].querySelectorAll("td")[cols];
            if (value) {
                if (value.innerHTML.toUpperCase().indexOf(searchInput) > -1) {
                table_row[rows].style.display = "";
                break;
                }
            }
        }
    }
}

