const COLORS = {
    green: "#51CA6B",
    yellow: "#FFC66B",
    grey: "#829491"
};

let cellAttributes = {}
let reservationTableCords = {}

export function getCell(data, cells) {
    for (let idx = 0; idx < cells.length; idx++) {
        if (`${data.room}-${data.arrival_date}` == cells[idx].className) {
            return cells[idx]
        }
    }
    return false
}

function getDiffDays(arrival_date, leaving_date) {
    const oneDay = 24 * 60 * 60 * 1000
    let arrivalDate = arrival_date.split("-")
    let leavingDate = leaving_date.split("-")

    arrivalDate = new Date(arrivalDate[0], arrivalDate[1], arrivalDate[2])
    leavingDate = new Date(leavingDate[0], leavingDate[1], leavingDate[2])

    const diffDays = Math.round(Math.abs((arrivalDate - leavingDate) / oneDay))
    return diffDays
}

// Reserve date string
function dateToString(date) {
    date = date.toLocaleDateString().split(".")
    return [date[2], date[1], date[0]].join("-")
}

// Creates date list
function dateCreator() {
    let date_list = [];

    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();

    let now_date = new Date(year, month, day);
    let future_date = new Date(year, month, day);
    let past_date = new Date(year, month, day);

    past_date.setDate(past_date.getDate() - 14);
    for (let i = 1; i < 14; i++) {
        past_date.setDate(past_date.getDate() + 1);
        date_list.push(dateToString(past_date));
    }

    date_list.push(dateToString(now_date));

    for (let i = 0; i < 180; i++) {
        future_date.setDate(future_date.getDate() + 1);
        date_list.push(dateToString(future_date));
    }

    return date_list;
}

function* listGen(date_list) {
    yield* date_list;
}

// Returns position of element
function getPositionOfElement(el) {
    const rect = el.getBoundingClientRect()
    const distanceToLeft = window.pageYOffset || document.documentElement.scrollLeft
    const distanceToTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
        top: rect.top + distanceToTop,
        left: rect.left + distanceToLeft,
    };
}

function getCellPositionRelativeTable(daysDiff) {
    return cellAttributes.x + daysDiff * cellAttributes.width
}

function setAttributesOfDataBlock(block, blockWidth, data, cell) {
    const yPosition = (getPositionOfElement(cell).top - reservationTableCords.y - 0.2)
    const xPosition = (getCellPositionRelativeTable(getDiffDays(cellAttributes.date, data.arrival_date) + 2) + cellAttributes.width / 2)

    block.setAttribute("style", `
            top: ${yPosition}px;
            left: ${xPosition}px;
            width: ${blockWidth}px;
            height: ${cellAttributes.height}px;`
    )

    const today = dateToString(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))

    if (data.arrival_date <= today && data.leaving_date >= today) {
        block.style.backgroundColor = COLORS.yellow
    } else if (data.leaving_date > today) {
        block.style.backgroundColor = COLORS.green
    } else {
        block.style.backgroundColor = COLORS.grey
    }

    block.textContent = data.accepted === false ? "NOT ACCEPTED" : data.name
}

// Returns side nav with rooms
function roomsNavInit(roomNames) {
    const dateNav = document.createElement("ul");
    roomNames.unshift("Date");
    for (let i = 0; i < roomNames.length; i++) {
        const room = document.createElement("li");
        room.textContent = roomNames[i];
        dateNav.appendChild(room);
    }
    return dateNav;
}

// Initialize table
function tableInit(rows, roomIds) {
    const table = document.createElement("table");

    let date_tr = document.createElement("tr");
    const date_list_tr = dateCreator();
    const dayGen_tr = listGen(date_list_tr);
    for (let i = 0; i < date_list_tr.length; i++) {
        let date = dayGen_tr.next().value;
        let td = document.createElement("td");
        td.classList.add("date-col");
        td.textContent = date;
        date_tr.appendChild(td);
    }
    table.appendChild(date_tr);

    const roomClassGiver = listGen(roomIds);
    for (let i = 0; i < rows; i++) {
        let roomNumber = roomClassGiver.next().value;
        let tr = document.createElement("tr");
        let date_list = dateCreator();
        const dayGen = listGen(date_list);

        for (let j = 0; j < date_list.length; j++) {
            let date = dayGen.next().value;
            let td = document.createElement("td");
            let classValue = `${roomNumber}-${date}`;
            td.classList.add(classValue);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table
}

export function createSingleDataBlock(data, table, sendPropToFormFunction, cell) {
    let dataBlock = document.createElement("div");
    const days = getDiffDays(data.arrival_date, data.leaving_date)
    const blockWidth = cellAttributes.width * days

    dataBlock.classList.add("data-block");
    dataBlock.id = data.id;

    setAttributesOfDataBlock(dataBlock, blockWidth, data, cell)

    dataBlock.onclick = () => sendPropToFormFunction(Object.assign({}, data, { mode: "Edit" }))
    table.appendChild(dataBlock);
}

// Initialize reservation data
export function reservationDataInit(data, cells, table, reservationTable, sendPropToFormFunction) {
    cellAttributes = { width: cells[0].clientWidth, height: cells[0].clientHeight, x: getPositionOfElement(cells[0]).left, y: getPositionOfElement(cells[0]).top, date: cells[0].textContent }
    reservationTableCords = { x: getPositionOfElement(reservationTable).left, y: getPositionOfElement(reservationTable).top }

    for (let idx = 0; idx < data.length; idx++) {
        const cell = getCell(data[idx], cells)
        createSingleDataBlock(data[idx], table, sendPropToFormFunction, cell)
    }
}

export function reservationTableInit(roomNames, roomIds) {
    const tableContainer = document.querySelector(".table-container");
    const navContainer = document.querySelector(".nav-container");
    const table = tableInit(roomIds.length, roomIds)
    tableContainer.appendChild(table)
    navContainer.appendChild(roomsNavInit(roomNames));
}
