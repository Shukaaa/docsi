// Default Script to initialize the sidebar
// Feel free to customize or remove as needed

addEventListener("DOMContentLoaded", () => {
    // get the body element
    const contentContainer = document.getElementById("content-container");

    let sidebarElement = document.createElement("nav");
    sidebarElement.id = "sidebar";
    sidebarElement.classList.add("sidebar");

    for (const sidebarElementSettings of getSidebarOrder(contentContainer)) {
        sidebarElement.appendChild(createSidebarElement(sidebarElementSettings));
    }

    contentContainer.parentElement.appendChild(sidebarElement);
});

function getSidebarOrder(contentContainer) {
    let sidebarOrder = []
    for (const contentElement of contentContainer.children) {
        if (contentElement.tagName === "H1") {
            sidebarOrder.push({
                "title": contentElement.innerText,
                "id": contentElement.id,
                "children": []
            })
        }

        if (contentElement.tagName === "H2") {
            sidebarOrder[sidebarOrder.length - 1].children.push({
                "title": contentElement.innerText,
                "id": contentElement.id,
                "children": []
            })
        }

        if (contentElement.tagName === "H3") {
            sidebarOrder[sidebarOrder.length - 1].children[sidebarOrder[sidebarOrder.length - 1].children.length - 1].children.push({
                "title": contentElement.innerText,
                "id": contentElement.id,
                "children": []
            })
        }
    }
    return sidebarOrder;
}

function createSidebarElement(sidebarElement) {
    // wrap text in a link
    let sidebarElementLink = document.createElement("a");
    sidebarElementLink.innerText = sidebarElement.title;
    sidebarElementLink.href = "#" + sidebarElement.id;

    // create the sidebar element
    let sidebarElementElement = document.createElement("div");
    sidebarElementElement.classList.add("sidebar-element");
    sidebarElementElement.appendChild(sidebarElementLink);

    // create the sidebar element children
    let sidebarElementChildren = document.createElement("div");
    sidebarElementChildren.classList.add("sidebar-element-children");
    for (const sidebarElementChild of sidebarElement.children) {
        sidebarElementChildren.appendChild(createSidebarElement(sidebarElementChild));
    }
    sidebarElementElement.appendChild(sidebarElementChildren);

    return sidebarElementElement;
}