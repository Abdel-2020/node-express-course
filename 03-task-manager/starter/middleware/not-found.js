const notFound = (req, res) => res.status(404).send('404 Error not found');

module.exports = notFound;