if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configure_store_prod')
} else {
    module.exports = require('./configure_store_dev')
}