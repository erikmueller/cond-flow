const defaults = {
  strict: true
}

function cond(pairs, options = defaults) {
  const match = pairs.find(([predicate]) => {
    return options.strict ? predicate === true : predicate
  })

  return match ? match[1] : null
}

module.exports = cond
