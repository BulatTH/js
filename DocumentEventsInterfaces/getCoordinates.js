function getCoordinates(element) {
    if (element === undefined) return null;

    let box = element.getBoundingClientRect();

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0,
        clientLeft = docEl.clientLeft || body.clientLeft || 0;

    let top = box.top + scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;

    return {
        top: top,
        left: left,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
        boundingClientRect: box
    };
}