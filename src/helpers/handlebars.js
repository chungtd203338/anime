const Handlebars = require('handlebars');

Handlebars.registerHelper('if_exists', function (value, options) {
    if (!value) {
        return options.inverse(this);
    }
    return value.length > 0 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('is_admin', function (value, options) {
    if (value && value == 'halequyen19042001@gmail.com') {
        return options.fn(this);
    }
    return options.inverse(this);
});

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );

        const output = `<a href="${href}">
            <span class="${icon}"></span>
        </a>`;
        return new Handlebars.SafeString(output);
    },
    registerHelper: (name, value) => {
        Handlebars.registerHelper(name, function () {
            return [value];
        });
    },
    unregisterHelper: (name) => {
        Handlebars.unregisterHelper(name);
    },
};
