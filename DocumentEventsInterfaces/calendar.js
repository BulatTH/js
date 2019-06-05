function Calendar({id = "cal", year = new Date().getFullYear(), month = new Date().getMonth() + 1, day = 1, thead: theadCSS = {}, tbody: tbodyCSS = {}} = {}) {
    let date = new Date(year, month - 1, day, 0, 0, 0),
        arr = [],
        weekNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВСК"],
        monthNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
        container = document.getElementById(id),
        self = this;

    emptyContainer();
    fillArray();

    function fillArray() {
        outer:
            for (let week = 0; week < weeksCount(); week += 1) {
                arr[week] = [];
                inner:
                    for (let td = 1; td <= 7; td += 1) {
                        if ((week === 0 && td < dayOfTheWeek(date)) || (date.getMonth() + 1 !== month)) {
                            arr[week][td - 1] = "";
                            continue inner;
                        }
                        arr[week][td - 1] = date.getDate();
                        date.setDate(date.getDate() + 1);
                    }
            }
        build()
    }

    function build() {
        let table = document.createElement("table");

        buildTHEAD(table);
        buildTBODY(table);

        table.style.borderCollapse = "collapse";
        table.style.border = "1px solid #c6c6c6";
        container.appendChild(table);
    }

    function buildTHEAD(table) {
        let theadTR = document.createElement("tr"),
            thead = document.createElement("thead");

        theadHeader(thead);

        for (let weeks = 0; weeks < 7; weeks += 1) {
            let theadTH = document.createElement("th");
            theadTH.textContent = weekNames[weeks];
            theadTH.style.padding = "8px 5px";
            theadTR.appendChild(theadTH);
        }

        thead.appendChild(theadTR);
        theadStyling(thead);
        table.appendChild(thead);
    }

    function theadHeader(thead) {
        let theadTH = document.createElement("th"),
            theadTR = document.createElement("tr");

        theadTH.setAttribute("colspan", "7");
        theadTH.textContent = `${monthNames[month - 1]}, ${year}`;
        theadTH.style.background = "#fff";
        theadTH.style.color = "#000";
        theadTH.style.padding = "8px 2px";

        theadTR.appendChild(theadTH);
        thead.appendChild(theadTR);
    }

    function theadStyling(thead) {
        if (Object.keys(theadCSS).length === 0) return false;
        for (let prop in theadCSS) {
            thead.style[prop] = theadCSS[prop];
        }
        return true;
    }

    function buildTBODY(table) {
        let tbody = document.createElement("tbody");

        arr.forEach((weekArr, weekIndex) => {
            let tr = document.createElement("tr");
            weekArr.forEach((day, dayIndex) => {
                let td = document.createElement("td");
                td.textContent = day;
                td.style.padding = "5px";
                td.style.textAlign = "center";
                td.style.border = "1px solid #c6c6c6";
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        tbodyStyling(tbody);
        table.appendChild(tbody);
    }

    function tbodyStyling(tbody) {
        if (Object.keys(tbodyCSS).length === 0) return false;
        for (let prop in tbodyCSS) {
            tbody.style[prop] = tbodyCSS[prop];
        }
        return true;
    }

    function dayCount() {
        let tmpDate = deepClone(date);
        tmpDate.setMonth(tmpDate.getMonth() + 1);
        tmpDate.setDate(0);
        return tmpDate.getDate();
    }

    function weeksCount() {
        return Math.ceil(dayCount() / 7);
    }

    function dayOfTheWeek(date) {
        return (date.getDay() === 0) ? 7 : date.getDay();
    }

    function deepClone(obj, hash = new WeakMap()) {
        if (Object(obj) !== obj) return obj; // primitives
        if (obj instanceof Set) return new Set(obj); // See note about this!
        if (hash.has(obj)) return hash.get(obj); // cyclic reference
        const result = obj instanceof Date ? new Date(obj)
            : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
                : obj.constructor ? new obj.constructor()
                    : Object.create(null);
        hash.set(obj, result);
        if (obj instanceof Map)
            Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)));
        return Object.assign(result, ...Object.keys(obj).map(
            key => ({[key]: deepClone(obj[key], hash)})));
    }

    function emptyContainer() {
        try {
            container.innerHTML = "";
        } catch (e) {
            while (container.lastChild) {
                container.removeChild(container.lastChild);
            }
        }
    }
}