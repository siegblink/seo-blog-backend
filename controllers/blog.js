exports.time = function(req, res) {
  res.json({ time: Date().toString() })
}
