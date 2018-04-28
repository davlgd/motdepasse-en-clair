function showData (sites) {
    let sitesList = sites.list
    sitesList.sort((a, b) => parseFloat(b.entry_date) - parseFloat(a.entry_date));

    sitesList.forEach(element => {
        document.getElementById("data").appendChild(dataHtmlFormat(element));
    });

    document.getElementById("site_count").innerText = `${sites.list.length} sites continuent de stocker les mots de passe en clair :`;
}

function dataHtmlFormat(data){
    let date = new Date(parseInt(data.entry_date));
    let text = " a  été ajouté dans notre base le " + date.toLocaleDateString("fr-FR") + ". ";

    switch(data.status)
    {
        case "1":
            text += "Une correction est en cours.";
            break;

        case "2":
            text += "Aucune correction ne semble en cours."  
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