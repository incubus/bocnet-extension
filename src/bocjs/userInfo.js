var DATE_FORMAT="yyyy/MM/dd";
/**
 * A User class
 */
function User() {
	this._userName = null;
	this._password = null;
	this._confirmPassword = null;
	this._oldPassword = null;
	this._gender = null;
	this._maritalStatus = null;
	this._education = null;
	this._income = null;
	this._phone = null;
	this._phone2 = null;
	this._mobile = null;
	this._email = null;
	this._email2 = null;
	this._zipcode = null;
	this._address = null;
	this._birth = null;
	this._welcome = null;
	this.color = null;
	this.movie = null;
	this.pet = null;
    this._questionOne = null;
    this._questionTwo = null;
    this._questionThree = null;
    this._answerOne = null;
    this._answerTwo = null;
    this._answerThree = null;
}

/**
 * Set the user name object
 */
User.prototype.setUserName = function(userName) {
	this._userName = userName;
}
/**
 * Set the password object
 */
User.prototype.setPassword = function(password) {
	this._password = password;
}
/**
 * Set the password object
 */
User.prototype.setConfirmPassword = function(confirmPassword) {
	this._confirmPassword = confirmPassword;
}
/**
 * Set the oldpassword object
 */
User.prototype.setOldPassword = function(oldPassword) {
	this._oldPassword = oldPassword;
}
/**
 * Set the gender object
 */
User.prototype.setGender = function(gender) {
	this._gender = gender;
}
/**
 * Set the maritalStatus object
 */
User.prototype.setMaritalStatus = function(maritalStatus) {
	this._maritalStatus = maritalStatus;
}

/**
 * Set the education object
 */
User.prototype.setEducation = function(education) {
	this._education = education;
}
/**
 * Set the income object
 */
User.prototype.setIncome = function(income) {
	this._income = income;
}
/**
 * Set the phone object
 */
User.prototype.setPhone = function(phone) {
	this._phone = phone;
}
/**
 * Set the phone2 object
 */
User.prototype.setPhone2 = function(phone2) {
	this._phone2 = phone2;
}
/**
 * Set the mobile object
 */
User.prototype.setMobile = function(mobile) {
	this._mobile = mobile;
}
/**
 * Set the email object
 */
User.prototype.setEmail = function(email) {
	this._email = email;
}
/**
 * Set the email2 object
 */
User.prototype.setEmail2 = function(email2) {
	this._email2 = email2;
}
/**
 * Set the address object
 */
User.prototype.setAddress = function(address) {
	this._address = address;
}
/**
 * Set the zipcode object
 */
User.prototype.setZipcode = function(zipcode) {
	this._zipcode = zipcode;
}
/**
 * Set the birthday object
 */
User.prototype.setBirth = function(birth) {
	this._birth = birth;
}
/**
 * Set the welcome object
 */
User.prototype.setWelcome = function(welcome) {
	this._welcome = welcome;
}
/**
 * Set the movie object
 */
User.prototype.setMovie = function(movie) {
	this._movie = movie;
}
/**
 * Set the color object
 */
User.prototype.setColor = function(color) {
	this._color = color;
}
/**
 * Set the pet object
 */
User.prototype.setPet = function(pet) {
	this._pet = pet;
}
/**
 * Set the QuestionOne
 */
User.prototype.setQuestionOne = function(question) {
  this._questionOne = question;
}
/**
 * Set the QuestionTwo
 */
User.prototype.setQuestionTwo = function(question) {
  this._questionTwo = question;
}
/**
 * Set the QuestionThree
 */
User.prototype.setQuestionThree = function(question) {
  this._questionThree = question;
}

/**
 * Set the AnswerOne
 */
User.prototype.setAnswerOne = function(answer) {
  this._answerOne = answer;
}
/**
 * Set the AnswerTwo
 */
User.prototype.setAnswerTwo = function(answer) {
  this._answerTwo = answer;
}
/**
 * Set the AnswerThree
 */
User.prototype.setAnswerThree = function(answer) {
  this._answerThree = answer;
}

/**
 * Intialize the User properties
 */
User.prototype.init = function() {
	if(this._phone != null) {
		this._phone.value = this._phone.value.trim();
	}
	if(this._phone2 != null) {
		this._phone2.value = this._phone2.value.trim();
	}
	if(this._mobile != null) {
		this._mobile.value = this._mobile.value.trim();
	}
	if(this._email != null) {
		this._email.value = this._email.value.trim();
	}
	if(this._email2 != null) {
		this._email2.value = this._email2.value.trim();
	}
	if(this._zipcode != null) {
		this._zipcode.value = this._zipcode.value.trim();
	}
	if(this._address != null) {
		this._address.value = this._address.value.trim();
	}
	if(this._birth != null) {
		this._birth.value = this._birth.value.trim();
	}
	if(this._welcome != null) {
		this._welcom.value = this._welcome.value.trim();
	}
	if(this._movie != null) {
		this._movie.value = this._movie.value.trim();
	}
	if(this._color != null) {
		this._color.value = this._color.value.trim();
	}
	if(this._pet != null) {
		this._pet.value = this._pet.value.trim();
	}
    if(this._questionOne != null) {
      this._questionOne.value = this._questionOne.value.trim();
    }
    if(this._questionTwo != null) {
      this._questionTwo.value = this._questionTwo.value.trim();
    }
    if(this._questionThree != null) {
      this._questionThree.value = this._questionThree.value.trim();
    }
    if(this._answerOne != null) {
      this._answerOne.value = this._answerOne.value.trim();
    }
    if(this._answerTwo != null) {
      this._answerTwo.value = this._answerTwo.value.trim();
    }
    if(this._answerThree != null) {
      this._answerThree.value = this._answerThree.value.trim();
    }
}
/**
 * Check whether phone is valid
 */
User.prototype.isPhoneValid = function() {
	if(this._phone == null) {
		return true;
	} else {
		var lResult = false;
		this._phone.value = this._phone.value.trim();
		if(this._phone.value.length > 0) {
			lResult = this._phone.value.isPhone();
		} else {
			lResult = false;
			alert(PHONE_IS_EMPTY);
		}
		if(!lResult) {
			this._phone.focus();
		}
		return lResult;
	}
}
/**
 * Check whether phone2 is invalid
 */
User.prototype.isPhone2Valid = function() {
	if(this._phone2 == null) {
		return true;
	} else {
		var lResult = false;
		this._phone2.value = this._phone2.value.trim();
		if(this._phone2.value.length > 0) {
			lResult = this._phone2.value.isPhone(PHONE2_IS_INCORRECT);
		} else {
			lResult = true;
		}
		if(!lResult) {
			this._phone2.focus();
		}
		return lResult;
	}
}
/**
 * Check whether mobile is invalid
 */
User.prototype.isMobileValid = function() {
	if(this._mobile == null) {
		return true;
	} else {
		var lResult = false;
		this._mobile.value = this._mobile.value.trim();
		if(this._mobile.value.length > 0) {
			lResult = this._mobile.value.isMobile();
		} else {
			lResult = true;
		}
		if(!lResult) {
			this._mobile.focus();
		}
		return lResult;
	}
}
/**
 * Check whether email is invalid
 */
User.prototype.isEmailValid = function() {
	if(this._email == null) {
		return true;
	} else {
		var lResult = false;
		this._email.value = this._email.value.trim();
		if(this._email.value.length > 0) {
			lResult = this._email.value.isEmail(EMAIL1_IS_INCORRECT);
		} else {
			lResult = false;
			alert(EMAIL1_IS_EMPTY);
		}
		if(!lResult) {
			this._email.focus();
		}
		return lResult;
	}
}
/**
 * Check whether email2 is invalid
 */
User.prototype.isEmail2Valid = function() {
	if(this._email2 == null) {
		return true;
	} else {
		var lResult = false;
		this._email2.value = this._email2.value.trim();
		if(this._email2.value.length > 0) {
			lResult = this._email2.value.isEmail(EMAIL2_IS_INCORRECT);
		} else {
			lResult = true;
		}
		if(!lResult) {
			this._email2.focus();
		}
		return lResult;
	}
}
/**
 * Check whether zipcode is invalid
 */
User.prototype.isZipcodeValid = function() {
	if(this._zipcode == null) {
		return true;
	} else {
		var lResult = false;
		this._zipcode.value = this._zipcode.value.trim();
		if(this._zipcode.value.length > 0) {
			lResult = this._zipcode.value.isZipcode();
		} else {
			lResult = false;
			alert(ZIPCODE_IS_EMPTY);
		}
		if(!lResult) {
			this._zipcode.focus();
		}
		return lResult;
	}
}
/**
 * Check whether address is invalid
 */
User.prototype.isAddressValid = function() {
	if(this._address == null) {
		return true;
	} else {
		var lResult = false;
		this._address.value = this._address.value.trim();
		if(this._address.value.length > 0) {
			lResult = this._address.value.isUserAddress();
		} else {
			lResult = false;
			alert(ADDRESS_IS_EMPTY);
		}
		if(!lResult) {
			this._address.focus();
		}
		return lResult;
	}
}
/**
 * Check whether userName is invalid
 */
User.prototype.isUserNameValid = function() {
	if(this._userName == null) {
		return true;
	} else {
		var lResult = false;
		if(this._userName.value.length > 0) {
			lResult = this._userName.value.isUserName();
		} else {
			lResult = false;
			alert(USER_NAME_IS_EMPTY);
		}
		if(!lResult) {
			this._userName.focus();
		}
		return lResult;
	}

}
/**
 * Check whether userpassword is invalid
 */
User.prototype.isPasswordValid = function() {
	if(this._password == null) {
		return true;
	} else {
		var lResult = false;
		if(this._password.value.length > 0) {
			lResult = this._password.value.isUserPassword((this._confirmPassword == null)?PASSWORD_IS_INCORRECT:PASSWORD_IS_INCORRECT);
		} else {
			lResult = false;
			alert((this._confirmPassword == null)?PASSWORD_IS_EMPTY:PASSWORD_IS_EMPTY);
		}
		if(!lResult) {
			this._password.focus();
		}
		return lResult;
	}
}
/**
 * Check whether confirm password is invalid
 */
User.prototype.isConfirmPasswordValid = function() {
	if(this._confirmPassword == null) {
		return true;
	} else {
		var lResult = false;
		if(this._confirmPassword.value.length > 0) {
			lResult = (this._confirmPassword.value == this._password.value);
			if(!lResult) {
				alert(CONFIRM_PASSWORD_IS_INCORRECT);
			}
		} else {
			lResult = false;
			alert(CONFIRM_PASSWORD_IS_EMPTY);
		}
		if(!lResult) {
			this._confirmPassword.focus();
		}
		return lResult;
	}

}
/**
 * Check whether old password is invalid
 */
User.prototype.isOldPasswordValid = function() {
	if(this._oldPassword == null) {
		return true;
	} else {
		var lResult = false;
		if(this._oldPassword.value.length > 0) {
			lResult = true;
		} else {
			lResult = false;
			alert(OLD_PASSWORD_IS_EMPTY);
		}
		if(!lResult) {
			this._oldPassword.focus();
		}
		return lResult;
	}

}
User.prototype.isBirthValid = function() {
	if(this._birth == null) {
		return true;
	} else {
		var lResult = false;
		this._birth.value = this._birth.value.trim();
		if(this._birth.value.length > 0) {
			var lDate = new Date();			
			lResult = lDate.parseDate(this._birth.value,DATE_FORMAT);		
			if(!lResult) {
				alert(BIRTHDAY_IS_INCORRECT);
			} else {
				this._birth.value = lDate.format(DATE_FORMAT);
				var lNow = getAppServerDate();
				if(lDate.getFullYear() < lNow.getFullYear()) {
					lResult = true;
				} else if(lDate.getFullYear() > lNow.getFullYear()) {
					lResult = false
				} else 	if(lDate.getMonth() < lNow.getMonth()) {
					lResult = true;
				} else if(lDate.getMonth() > lNow.getMonth()) {
					lResult = false;
				} else if(lDate.getDate() > lNow.getDate()) {
					lResult = false;
				} else {
					lResult = true;
				}
				if(!lResult) {
					alert(BIRTHDAY_MORE_THAN_TODAY);
				}
			}
			
		} else {
			lResult = true;
		}
		if(!lResult) {
			this._birth.focus();
		}
		return lResult;
	}
	
}
/**
 * Check whether welcome is invalid
 */
User.prototype.isWelcomeValid = function() {
	if(this._welcome == null) {
		return true;
	} else {
		var lResult = true;
		if(this._welcome.value.length < 1) {
			lResult = false;
			alert(WELCOME_IS_EMPTY);
		}
		if(!lResult) {
			this._welcome.focus();
		}
		return lResult;
	}

}
/**
 * Check whether color is invalid
 */
User.prototype.isColorValid = function() {
	if(this._color == null) {
		return true;
	} else {
		var lResult = true;
		if(this._color.value.length < 1) {
			lResult = false;
			alert(COLOR_IS_EMPTY);
		}
		if(!lResult) {
			this._color.focus();
		}
		return lResult;
	}

}
/**
 * Check whether movie is invalid
 */
User.prototype.isMovieValid = function() {
	if(this._movie == null) {
		return true;
	} else {
		var lResult = true;
		if(this._movie.value.length < 1) {
			lResult = false;
			alert(MOVIE_IS_EMPTY);
		}
		if(!lResult) {
			this._movie.focus();
		}
		return lResult;
	}

}
/**
 * Check whether pet is invalid
 */
User.prototype.isPetValid = function() {
	if(this._pet == null) {
		return true;
	} else {
		var lResult = true;
		if(this._pet.value.length < 1) {
			lResult = false;
			alert(PET_IS_EMPTY);
		}
		if(!lResult) {
			this._pet.focus();
		}
		return lResult;
	}

}
/**
 * Check whether questionOne is invalid
 */
User.prototype.isQuestionOneValid = function() {
  if(this._questionOne == null) {
    return true;
  } else {
    var lResult = true;
    if(this._questionOne.value.length < 1) {
      lResult = false;
      alert(QUESTIONONE_IS_EMPTY);
    }
    if(!lResult) {
      this._questionOne.focus();
    }
    return lResult;
  }

}

/**
 * Check whether questionTwo is invalid
 */
User.prototype.isQuestionTwoValid = function() {
  if(this._questionTwo == null) {
    return true;
  } else {
    var lResult = true;
    if(this._questionTwo.value.length < 1) {
      lResult = false;
      alert(QUESTIONTWO_IS_EMPTY);
    }
    if(!lResult) {
      this._questionTwo.focus();
    }
    return lResult;
  }

}
/**
 * Check whether questionThree is invalid
 */
User.prototype.isQuestionThreeValid = function() {
  if(this._questionThree == null) {
    return true;
  } else {
    var lResult = true;
    if(this._questionThree.value.length < 1) {
      lResult = false;
      alert(QUESTIONTHREE_IS_EMPTY);
    }
    if(!lResult) {
      this._questionThree.focus();
    }
    return lResult;
  }

}

/**
 * Check whether answerOne is invalid
 */
User.prototype.isAnswerOneValid = function() {
  if(this._answerOne == null) {
    return true;
  } else {
    var lResult = true;
    if(this._answerOne.value.length < 1) {
      lResult = false;
      alert(ANSWERONE_IS_EMPTY);
    }
    if(!lResult) {
      this._answerOne.focus();
    }
    return lResult;
  }

}

/**
 * Check whether AnswerTwo is invalid
 */
User.prototype.isAnswerTwoValid = function() {
  if(this._answerTwo == null) {
    return true;
  } else {
    var lResult = true;
    if(this._answerTwo.value.length < 1) {
      lResult = false;
      alert(ANSWERTWO_IS_EMPTY);
    }
    if(!lResult) {
      this._answerTwo.focus();
    }
    return lResult;
  }

}
/**
 * Check whether answerThree is invalid
 */
User.prototype.isAnswerThreeValid = function() {
  if(this._answerThree == null) {
    return true;
  } else {
    var lResult = true;
    if(this._answerThree.value.length < 1) {
      lResult = false;
      alert(ANSWERTHREE_IS_EMPTY);
    }
    if(!lResult) {
      this._answerThree.focus();
    }
    return lResult;
  }

}


/**
 * Check whether Gender is invalid
 */
User.prototype.isGenderValid = function() {
  if(this._gender == null) {
    return true;
  } else {
    var lResult = true;
    if(!this._gender[0].checked && !this._gender[1].checked) {
      lResult = false;
      alert(GENDER_IS_EMPTY);
    }
    if(!lResult) {
      this._gender[0].focus();
    }
    return lResult;
  }

}



/**
 * Check whether user is invalid
 */
User.prototype.isValid = function() {
	if(!this.isUserNameValid()) {
		return false;
	}
    if(!this.isGenderValid()){
        return false;
    }
	if(!this.isBirthValid()) {
		return false;
	}
	if(!this.isPhoneValid()) {
		return false;
	}
	if(!this.isPhone2Valid()) {
		return false;
	}
	if(!this.isMobileValid()) {
		return false;
	}
	if(!this.isEmail2Valid()) {
		return false;
	}
	if(!this.isZipcodeValid()) {
		return false;
	}
	if(!this.isAddressValid()) {
		return false;
	}
	if(!this.isWelcomeValid()) {
		return false;
	}
    if(!this.isQuestionOneValid()) {
      return false;
    }
    if(!this.isQuestionTwoValid()) {
      return false;
    }
    if(!this.isQuestionThreeValid()) {
      return false;
    }
    if(!this.isAnswerOneValid()) {
      return false;
    }
    if(!this.isAnswerTwoValid()) {
      return false;
    }
    if(!this.isAnswerThreeValid()) {
      return false;
    }
	/*
	if(!this.isColorValid()) {
		return false;
	}
	if(!this.isMovieValid()) {
		return false;
	}
	if(!this.isPetValid()) {
		return false;
	}
	*/
	return true;
}

/**
 * Check whether user is invalid
 */
User.prototype.isValid4ModInfo = function() {
  if(!this.isGenderValid()){
      return false;
  }
  if(!this.isBirthValid()) {
    return false;
  }
  if(!this.isPhoneValid()) {
    return false;
  }
  if(!this.isPhone2Valid()) {
    return false;
  }
  if(!this.isMobileValid()) {
    return false;
  }
  if(!this.isEmail2Valid()) {
    return false;
  }
  if(!this.isZipcodeValid()) {
    return false;
  }
  if(!this.isAddressValid()) {
    return false;
  }

  return true;
}


/**
 * Create a user object
 */
var user = new User();