const defaults = {
  strict: true,
}

function cond(pairs, options = defaults) {
  const match = pairs.find(([predicate]) => {
    return options.strict ? predicate === true : predicate
  })

  if (!match) return null

  return typeof match[1] === 'function' ? match[1]() : match[1]
}

module.exports = cond
