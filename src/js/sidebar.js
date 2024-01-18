// Default Script to initialize the sidebar
// Feel free to customize or remove as needed

document.addEventListener("DOMContentLoaded", () => {
    const contentContainer = document.getElementById("content-container");
    const sidebarOrder = getSidebarOrder(contentContainer);
    const sidebarElement = createSidebar(sidebarOrder);

    contentContainer.parentElement.appendChild(sidebarElement);
});

function getSidebarOrder(contentContainer) {
    const sidebarOrder = [];

    let currentH1
    let currentH2

    for (const contentElement of contentContainer.children) {
        switch (contentElement.tagName) {
            case "H1":
                currentH1 = {
                    title: contentElement.innerText,
                    id: contentElement.id,
                    children: [],
                };
                sidebarOrder.push(currentH1);
                break;
            case "H2":
                if (!currentH1) throw new Error("H2 without H1");

                currentH2 = {
                    title: contentElement.innerText,
                    id: contentElement.id,
                    children: [],
                };
                currentH1.children.push(currentH2);
                break;
            case "H3":
                if (!currentH1) throw new Error("H3 without H1");

                currentH2.children.push({
                    title: contentElement.innerText,
                    id: contentElement.id,
                    children: [],
                });
                break;
            default:
                break;
        }
    }

    return sidebarOrder;
}

function createSidebar(sidebarOrder) {
    const sidebarElement = document.createElement("nav");
    sidebarElement.id = "sidebar";
    sidebarElement.classList.add("sidebar");

    const logo = createLogo();
    sidebarElement.appendChild(logo);

    for (const sidebarElementData of sidebarOrder) {
        const sidebarListElement = createSidebarElement(sidebarElementData, 0);
        sidebarElement.appendChild(sidebarListElement);
    }

    return sidebarElement;
}

function createLogo() {
    const logoWrapper = document.createElement("div");
    logoWrapper.classList.add("logo");

    const logo = document.createElement("img");
    logo.src = "assets/logo.png";
    logo.alt = "Logo";

    const textLogo = document.createElement("img");
    textLogo.src = "assets/text-logo.png";
    textLogo.alt = "Text Logo";

    logoWrapper.appendChild(logo);
    logoWrapper.appendChild(textLogo);

    return logoWrapper;
}

function createSidebarElement(sidebarElementData, nestedLevel) {
    const sidebarElementLink = document.createElement("a");
    sidebarElementLink.innerText = sidebarElementData.title;
    sidebarElementLink.href = "#" + sidebarElementData.id;
    sidebarElementLink.classList.add("sidebar-element-link");
    sidebarElementLink.classList.add("sidebar-element-link-"+(nestedLevel+1));

    const sidebarElement = document.createElement("div");
    sidebarElement.classList.add("sidebar-element");
    sidebarElement.appendChild(sidebarElementLink);

    if (sidebarElementData.children.length > 0) {
        const sidebarElementChildren = document.createElement("div");
        sidebarElementChildren.classList.add("sidebar-element-children-" + (nestedLevel+1));
        sidebarElementChildren.classList.add("sidebar-element-children");

        for (const sidebarElementChild of sidebarElementData.children) {
            const childElement = createSidebarElement(sidebarElementChild, nestedLevel + 1);
            sidebarElementChildren.appendChild(childElement);
        }

        sidebarElement.appendChild(sidebarElementChildren);
    }

    return sidebarElement;
}
