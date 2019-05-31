$(document).ready(function () {
    let addressTemplate = $("#address").html();
    let template = Handlebars.compile(addressTemplate);

    let data = {
        city: "London",
        number: "221B",
        street: "Baker Street",
    };

    let html = template(data);

    $(".address-content").html(html);


    data = {
        "description": {
            "escaped": "Using {{}} brackets will result in escaped HTML:",
            "unescaped": "Using {{{}}} will leave the context as it is:"
        },
        "example": "<button> Hello </button>"
    };
    template = Handlebars.compile($("#expressions").html());
    html = template(data);
    $(".expressions").append(html);


    Handlebars.registerHelper('allInLower', function (str) {
        str = str || "";
        return str.toUpperCase();
    });

    Handlebars.registerHelper('blockHelper', function (options) {
        return options.fn(this).charAt(0).toUpperCase() + options.fn(this).slice(1);
    });



    data = {
        people: [
            { firstName: 'Homer', lastName: 'Simpson' },
            { firstName: 'Peter', lastName: 'Griffin' },
            { firstName: 'Eric', lastName: 'Cartman' },
            { firstName: 'Kenny', lastName: 'McCormick' },
            { firstName: 'Bart', lastName: 'Simpson' }
        ]
    };
    template = Handlebars.compile($("#example-1").html());
    html = template(data);
    $(".example-1").html(html);
});