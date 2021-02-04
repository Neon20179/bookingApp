export const handlePhoneNumberKeyBackspaceWrapper = {
    handlePhoneNumberKeyBackspace(event) {
        if (event.keyCode == 8 || event.charCode == 46) {
            this.setState({ is_backspace: true })
        } else {
            this.setState({ is_backspace: false })
        }
    }
}

export const handlePhoneNumberChangeWrapper = {
    handlePhoneNumberChange(event) {
        String.prototype.splice = function (from, num, str) {
            return this.slice(0, from) + str + this.slice(from + Math.abs(num));
        };

        let value = event.target.value.replace(/[^0-9.]/g, '');
        if (!this.state.is_backspace) {
            if (value.length < 12) {
                if (value.length > 1) {
                    value = value.splice(1, 0, ' ')
                    value = value.splice(2, 0, '(')
                    if (value.length > 6) {
                        value = value.splice(6, 0, ')')
                        if (value.length > 7) {
                            value = value.splice(7, 0, ' ')
                            if (value.length > 11) {
                                value = value.splice(11, 0, '-')
                                if (value.length > 14) {
                                    value = value.splice(14, 0, '-')
                                }
                            }
                        }
                    }
                }
                this.setState({ phone_number: value });
            }
        } else {
            this.setState({ phone_number: value });
        }
    }
}

export function objectsAreEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }

    return true;
}