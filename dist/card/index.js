Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        extra: {
            type: String,
            value: ''
        },
        logo: {
            type: String,
            value: ''
        },
        size: {
            type: String,
            value: 'default' // small, default, large
        },
        shape: {
            type: String,
            value: 'square' // square, circle
        }
    }
});
