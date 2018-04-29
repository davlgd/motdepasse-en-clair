let list = document.getElementById("data");
let button = document.getElementById("shower");

document.getElementById("shower").addEventListener("click", initList);
document.getElementById("year").innerText = new Date().getFullYear();

function initList(buttonStatus) {
    switch (list.className) {
        case "datahide":
            list.className = "datashow";
            button.innerText = "Réduire";
            break;

        default:
            list.className = "datahide";
            button.innerText = "Afficher plus";
            break;
    }

    if (!buttonStatus) button.className = "button_hide";
}

function showData(sites) {
    let sitesList = sites.list;
    sitesList.sort((a, b) => parseFloat(b.entry_date) - parseFloat(a.entry_date));

    sitesList.forEach(element => {
        document.getElementById("data").appendChild(dataHtmlFormat(element));
    });

    document.getElementById("site_count").innerText = `${sites.list.length} sites continuent de stocker les mots de passe en clair :`;
    initList(sites.list.length > 3);
}

function dataHtmlFormat(data) {
    let date = new Date(data.entry_date);
    let delay = Date.now() - date;
    let jours = Math.floor(delay / 86400000);

    let text = ` est référencé depuis ${jours} jours. `;

    switch (data.status) {
        case "1":
            text += "Une correction est en cours.";
            break;

        case "2":
            text += "Aucune correction ne semble en cours.";
            break;
    }

    let lien = document.createElement("a");
    lien.href = data.url;
    lien.innerText = data.name;
    lien.target = "_blank";

    let li = document.createElement("li");
    let content = document.createTextNode(text);
    li.appendChild(lien);
    li.appendChild(content);

    return li;
}