(function () {
  const password = document.querySelector('.password')
  const helperText = {
    charLength: document.querySelector('.helper-text .length'),
    lowercase: document.querySelector('.helper-text .lowercase'),
    uppercase: document.querySelector('.helper-text .uppercase'),
    special: document.querySelector('.helper-text .special')
  }

  password.addEventListener('keyup', function () {
    patternTest(pattern.charLength(), helperText.charLength)
    patternTest(pattern.lowercase(), helperText.lowercase)
    patternTest(pattern.uppercase(), helperText.uppercase)
    patternTest(pattern.special(), helperText.special)

    if (hasClass(helperText.charLength, "valid") &&
      hasClass(helperText.lowercase, "valid") && hasClass(helperText.uppercase) && hasClass(helperText.special, "valid"))
      addClass(password.parentElement, "valid")
    else removeClass(password.parentElement, "valid")
  })

  const pattern = {
    charLength: function () {
      if (password.value.length >= 8) {
        return true
      }
    },
    lowercase: function () {
      const regex = /^(?=.*[a-z]).+$/ // Lowercase character pattern

      if (regex.test(password.value))
        return true
    },
    uppercase: function () {
      const regex = /^(?=.*[A-Z]).+$/ // Uppercase character pattern

      if (regex.test(password.value))
        return true
    },
    special: function () {
      const regex = /^(?=.*[0-9_\W]).+$/ // Special character or number pattern

      if (regex.test(password.value))
        return true
    }
  }

  function hasClass(el, className) {
    if (el.classList) {
      console.log(el.classList)
      return el.classList.contains(className)
    }
    else {
      new RegExp("(^| )" + className + "( |$)", "gi").test(el.className)
    }

  }

  function patternTest(pattern, response) {
    if (pattern)
      addClass(response, "valid")
    else removeClass(response, "valid")
  }

  function addClass(el, className) {
    if (el.classList)
      el.classList.add(className)
    else el.className += " " + className
  }

  function removeClass(el, className) {
    if (el.classList) el.classList.remove(className)
    else
      el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ")
  }

})()

